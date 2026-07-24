const prisma = require('../../config/db');
const fs = require('fs');
const { extractTextFromFile, generateSnippet } = require('../../services/documentTextExtractor');

const searchAll = async (q, user) => {
  if (!q || q.trim().length < 2) return [];
  const query = q.trim();

  const userRoles = (user?.roles || []).map(r => String(r.role || r).toLowerCase());
  const isSuperAdmin = userRoles.includes('super_admin') || String(user?.role || '').toLowerCase() === 'super_admin';
  const agencyId = (!isSuperAdmin && user?.agency_id) ? parseInt(user.agency_id, 10) : null;

  const results = [];

  // 1. Search Matters
  const matterWhere = {
    OR: [
      { title: { contains: query } },
      { matter_number: { contains: query } },
      { description: { contains: query } },
    ]
  };
  if (agencyId) matterWhere.agency_id = agencyId;
  if (user.role === 'lawyer') matterWhere.assigned_lawyer_id = user.id;
  if (user.role === 'client') {
    matterWhere.OR = [
      { client: { user_id: user.id } },
      { parties: { some: { user_id: user.id } } }
    ];
  }

  const matters = await prisma.matter.findMany({
    where: matterWhere,
    take: 5,
    select: { id: true, title: true, matter_number: true }
  });
  matters.forEach(m => results.push({
    type: 'Matter',
    id: m.id,
    title: m.title,
    subtitle: m.matter_number,
    url: user.role === 'admin' ? `/admin/matters/${m.id}` : (user.role === 'lawyer' ? `/lawyer/matters/${m.id}` : `/client/matters/${m.id}`)
  }));

  // 2. Search Clients (Admin/Lawyer only)
  if (user.role !== 'client') {
    const clientWhere = {
      OR: [
        { full_name: { contains: query } },
        { email: { contains: query } },
        { phone: { contains: query } },
      ]
    };
    if (agencyId) clientWhere.agency_id = agencyId;

    const clients = await prisma.client.findMany({
      where: clientWhere,
      take: 5,
      select: { id: true, full_name: true, email: true }
    });
    clients.forEach(c => results.push({
      type: 'Client',
      id: c.id,
      title: c.full_name,
      subtitle: c.email,
      url: user.role === 'admin' ? `/admin/clients/${c.id}` : `/lawyer/clients/${c.id}`
    }));
  }

  // 3. Search Leads (Admin/Lawyer only)
  if (user.role !== 'client') {
    const leadWhere = {
      OR: [
        { full_name: { contains: query } },
        { email: { contains: query } },
        { phone: { contains: query } },
      ]
    };
    if (agencyId) leadWhere.agency_id = agencyId;

    const leads = await prisma.lead.findMany({
      where: leadWhere,
      take: 5,
      select: { id: true, full_name: true, email: true }
    });
    leads.forEach(l => results.push({
      type: 'Lead',
      id: l.id,
      title: l.full_name,
      subtitle: l.email,
      url: user.role === 'admin' ? `/admin/intake/${l.id}` : `/lawyer/intake/${l.id}`
    }));
  }

  // 4. Search Documents (Full-Text Content + Filenames + Excerpt Highlighting)
  const docWhere = {
    OR: [
      { file_name: { contains: query } },
      { original_name: { contains: query } },
      { category: { contains: query } },
      { folder_path: { contains: query } },
      { extracted_text: { contains: query } },
    ]
  };
  if (agencyId) docWhere.agency_id = agencyId;
  if (user.role === 'lawyer') docWhere.matter = { assigned_lawyer_id: user.id };
  if (user.role === 'client') {
    docWhere.matter = {
      OR: [
        { client: { user_id: user.id } },
        { parties: { some: { user_id: user.id } } }
      ]
    };
    docWhere.visibility = { in: ['client_shared', 'client_visible'] };
  }

  const docs = await prisma.document.findMany({
    where: docWhere,
    take: 10,
    select: {
      id: true,
      original_name: true,
      category: true,
      matter_id: true,
      extracted_text: true,
      file_path: true,
      mime_type: true,
      matter: { select: { title: true, matter_number: true } }
    }
  });

  for (const d of docs) {
    let fullText = d.extracted_text;
    if (!fullText && d.file_path && fs.existsSync(d.file_path)) {
      fullText = await extractTextFromFile(d.file_path, d.mime_type || '', d.original_name || '');
      if (fullText) {
        prisma.document.update({ where: { id: d.id }, data: { extracted_text: fullText } }).catch(() => {});
      }
    }

    const excerpt = generateSnippet(fullText, query);

    results.push({
      type: 'Document',
      id: d.id,
      title: d.original_name,
      subtitle: d.matter ? `${d.matter.matter_number} · ${d.matter.title}` : (d.category || 'Legal Document'),
      excerpt: excerpt,
      url: user.role === 'admin' ? `/admin/matters/${d.matter_id}` : (user.role === 'lawyer' ? `/lawyer/matters/${d.matter_id}` : `/client/matters/${d.matter_id}`)
    });
  }

  return results;
};

module.exports = {
  searchAll
};
