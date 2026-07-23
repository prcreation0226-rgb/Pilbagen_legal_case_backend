const prisma = require('../../config/db');

const money = (v) => {
  if (v == null) return 0;
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return parseFloat(v) || 0;
  if (typeof v.toNumber === 'function') return v.toNumber();
  return Number(v) || 0;
};

const formatMoney = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const relTime = (d) => {
  if (!d) return '';
  const date = new Date(d);
  const now = new Date();
  const diff = now - date;
  if (diff < 86400000 && date.getDate() === now.getDate()) {
    return `Today, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
  }
  if (diff < 172800000) return 'Yesterday';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const getAdminDashboard = async () => {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  const deadlineHorizon = new Date(now.getTime() + 30 * 86400000);

  const [
    totalLeads,
    totalClients,
    totalMatters,
    activeMatters,
    pendingMatters,
    completedMatters,
    totalLawyers,
    pendingInvoices,
    overdueInvoices,
    draftsOpen,
    documentCount,
    communicationCount,
    upcomingDeadlineCount,
    openTasks,
    tasksDueToday,
    overdueTasks,
    completedTasksWeek,
    upcomingCourtDates,
    upcomingFilingDeadlines,
    eventsToday,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.client.count(),
    prisma.matter.count(),
    prisma.matter.count({ where: { status: 'active' } }),
    prisma.matter.count({ where: { status: 'pending' } }),
    prisma.matter.count({ where: { status: 'completed' } }),
    prisma.user.count({ where: { role: 'lawyer', is_active: true } }),
    prisma.invoice.count({ where: { status: { in: ['unpaid', 'draft', 'due'] } } }),
    prisma.invoice.count({ where: { status: 'overdue' } }),
    prisma.draft.count({
      where: { status: { in: ['draft', 'ready', 'sent_for_signature'] } },
    }),
    prisma.document.count(),
    prisma.communication.count(),
    prisma.invoice.count({
      where: {
        due_date: { gte: now, lte: deadlineHorizon },
        status: { in: ['unpaid', 'overdue', 'draft', 'due'] },
      },
    }),
    prisma.task.count({ where: { status: { in: ['open', 'in_progress'] } } }),
    prisma.task.count({
      where: {
        due_date: {
          gte: new Date(now.setHours(0,0,0,0)),
          lte: new Date(now.setHours(23,59,59,999))
        },
        status: { not: 'completed' }
      }
    }),
    prisma.task.count({
      where: {
        due_date: { lt: new Date(now.setHours(0,0,0,0)) },
        status: { not: 'completed' }
      }
    }),
    prisma.task.count({
      where: {
        status: 'completed',
        completed_at: {
          gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        }
      }
    }),
    prisma.calendarEvent.count({
      where: {
        is_court_event: true,
        event_date: { gte: now }
      }
    }),
    prisma.calendarEvent.count({
      where: {
        type: 'filing_deadline',
        event_date: { gte: now }
      }
    }),
    prisma.calendarEvent.count({
      where: {
        is_court_event: true,
        event_date: {
          gte: new Date(new Date(now).setDate(now.getDate() - now.getDay())),
          lte: new Date(new Date(now).setDate(now.getDate() - now.getDay() + 7))
        }
      }
    }),
  ]);

  const paymentsThisMonth = await prisma.payment.findMany({
    where: {
      paid_on: { gte: monthStart, lte: monthEnd },
    },
    include: {
      invoice: {
        include: {
          matter: { select: { practice_area: true } },
        },
      },
    },
  });

  let revenueMonthTotal = 0;
  const byPa = {};
  for (const p of paymentsThisMonth) {
    const amt = money(p.amount);
    revenueMonthTotal += amt;
    const pa = p.invoice?.matter?.practice_area || 'General';
    byPa[pa] = (byPa[pa] || 0) + amt;
  }

  const revenueByPracticeArea = Object.entries(byPa)
    .map(([practiceArea, amount]) => ({
      practiceArea,
      amount,
      pct: revenueMonthTotal > 0 ? Math.round((amount / revenueMonthTotal) * 100) : 0,
      amountFormatted: formatMoney(amount),
    }))
    .sort((a, b) => b.amount - a.amount);

  const recentMatters = await prisma.matter.findMany({
    take: 5,
    orderBy: { updated_at: 'desc' },
    include: { client: { select: { full_name: true } } },
  });

  const recentLeads = await prisma.lead.findMany({
    take: 5,
    orderBy: { created_at: 'desc' },
  });

  const upcomingInvoices = await prisma.invoice.findMany({
    where: {
      due_date: { gte: now },
      status: { in: ['unpaid', 'overdue', 'draft'] },
    },
    take: 4,
    orderBy: { due_date: 'asc' },
    include: { matter: { select: { title: true, matter_number: true } } },
  });

  const upcomingDeadlines = upcomingInvoices.map((inv) => {
    const d = inv.due_date ? new Date(inv.due_date) : now;
    const color = inv.status === 'overdue' ? 'red' : 'amber';
    return {
      day: d.getDate(),
      month: d.toLocaleString('en-US', { month: 'short' }),
      title: `${inv.invoice_number} · ${inv.matter?.title || 'Matter'}`,
      time: '',
      color,
    };
  });

  const activities = await prisma.activity.findMany({
    take: 12,
    orderBy: { created_at: 'desc' },
    include: {
      matter: { select: { title: true, matter_number: true } },
      actor: { select: { full_name: true } },
    },
  });

  const activityFeed = activities.map((a) => ({
    icon: '•',
    text: a.description || `${a.action} · ${a.entity_type}`,
    time: relTime(a.created_at),
    bg: 'bg-slate-100 text-slate-600',
  }));

  return {
    counts: {
      totalLeads,
      totalClients,
      totalMatters,
      activeMatters,
      pendingMatters,
      completedMatters,
      openMatters: activeMatters + pendingMatters,
      totalLawyers,
      pendingInvoices,
      overdueInvoices,
      draftsOpen,
      documentCount,
      communicationCount,
      upcomingDeadlineCount,
      openTasks,
      tasksDueToday,
      overdueTasks,
      completedTasksWeek,
      upcomingCourtDates,
      upcomingCourtAppearances: upcomingCourtDates,
      upcomingFilingDeadlines,
      eventsToday,
      courtEventsThisWeek: eventsToday,
    },
    revenue: {
      monthLabel: monthStart.toLocaleString('en-US', { month: 'long', year: 'numeric' }),
      total: revenueMonthTotal,
      totalFormatted: formatMoney(revenueMonthTotal),
      byPracticeArea: revenueByPracticeArea,
    },
    recentMatters: recentMatters.map((m) => ({
      id: m.id,
      matterNumber: m.matter_number,
      title: m.title,
      clientName: m.client?.full_name || '',
      status: m.status,
    })),
    recentLeads: recentLeads.map((l) => ({
      id: l.id,
      fullName: l.full_name,
      matterType: l.matter_type,
      source: l.source,
      status: l.status,
      createdAt: l.created_at,
    })),
    upcomingDeadlines,
    activityFeed,
  };
};

const getLawyerStats = async (userId) => {
  const now = new Date();
  const [matters, drafts, messages, clientCount, myOpenTasks, myTasksDueToday, myOverdueTasks, upcomingCourtDates, upcomingFilingDeadlines, eventsToday] = await Promise.all([
    prisma.matter.count({ where: { assigned_lawyer_id: userId, status: { in: ['active', 'pending'] } } }),
    prisma.draft.count({ where: { created_by_user_id: userId, status: 'draft' } }),
    prisma.communication.count({ where: { sender_user_id: userId } }),
    prisma.matter.groupBy({
      by: ['client_id'],
      where: { assigned_lawyer_id: userId },
    }).then(groups => groups.length),
    prisma.task.count({ where: { assigned_user_id: userId, status: { in: ['open', 'in_progress'] } } }),
    prisma.task.count({
      where: {
        assigned_user_id: userId,
        due_date: {
          gte: new Date(now.setHours(0,0,0,0)),
          lte: new Date(now.setHours(23,59,59,999))
        },
        status: { not: 'completed' }
      }
    }),
    prisma.task.count({
      where: {
        assigned_user_id: userId,
        due_date: { lt: new Date(now.setHours(0,0,0,0)) },
        status: { not: 'completed' }
      }
    }),
    prisma.calendarEvent.count({
      where: {
        type: 'hearing',
        event_date: { gte: now },
        OR: [
          { created_by: userId },
          { matter: { assigned_lawyer_id: userId } }
        ]
      }
    }),
    prisma.calendarEvent.count({
      where: {
        type: 'filing_deadline',
        event_date: { gte: now },
        OR: [
          { created_by: userId },
          { matter: { assigned_lawyer_id: userId } }
        ]
      }
    }),
    prisma.task.count({
      where: {
        assigned_user_id: userId,
        status: 'open',
        priority: 'high'
      }
    })
  ]);

  const assignedMatters = await prisma.matter.findMany({
    where: { assigned_lawyer_id: userId },
    take: 5,
    orderBy: { updated_at: 'desc' },
  });

  return {
    counters: { 
      assignedMatters: matters, 
      openDrafts: drafts, 
      messagesSent: messages, 
      clientCount, 
      myOpenTasks,
      myTasksDueToday,
      myOverdueTasks,
      upcomingCourtDates,
      upcomingFilingDeadlines,
      eventsToday,
      myUpcomingHearings: upcomingCourtDates,
      myFilingDeadlines: upcomingFilingDeadlines,
      myCourtTasks: eventsToday
    },
    assignedMatters,
  };
};

const getClientStats = async (userId) => {
  const client = await prisma.client.findFirst({ where: { user_id: userId } });
  if (!client) {
    return {
      counters: { myMatters: 0, unpaidInvoices: 0, pendingSignatures: 0 },
    };
  }

  const [matters, invoices, drafts] = await Promise.all([
    prisma.matter.count({
      where: {
        OR: [
          { client_id: client.id },
          { parties: { some: { id: client.id } } }
        ],
        status: { in: ['active', 'pending'] }
      }
    }),
    prisma.invoice.count({
      where: {
        matter: {
          OR: [
            { client_id: client.id },
            { parties: { some: { id: client.id } } }
          ]
        },
        status: { in: ['unpaid', 'overdue', 'draft', 'due'] }
      },
    }),
    prisma.draft.count({
      where: {
        matter: {
          OR: [
            { client_id: client.id },
            { parties: { some: { id: client.id } } }
          ]
        },
        status: 'sent_for_signature'
      },
    }),
  ]);

  return {
    counters: { myMatters: matters, unpaidInvoices: invoices, pendingSignatures: drafts },
  };
};

const getPartnerDashboard = async (agencyId) => {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  
  // 1. Matter Counts
  const [
    totalMatters,
    activeMatters,
    pendingMatters,
    completedMatters,
    totalClients,
    totalTeam,
    pendingTasks,
    upcomingHearingsCount
  ] = await Promise.all([
    prisma.matter.count({ where: { agency_id: agencyId } }),
    prisma.matter.count({ where: { agency_id: agencyId, status: 'active' } }),
    prisma.matter.count({ where: { agency_id: agencyId, status: 'pending' } }),
    prisma.matter.count({ where: { agency_id: agencyId, status: 'completed' } }),
    prisma.client.count({ where: { agency_id: agencyId } }),
    prisma.user.count({ where: { agency_id: agencyId, is_active: true } }),
    prisma.task.count({ where: { status: { not: 'completed' }, matter: { agency_id: agencyId } } }),
    prisma.calendarEvent.count({
      where: {
        event_date: { gte: now },
        is_court_event: true,
        matter: { agency_id: agencyId }
      }
    })
  ]);

  // 2. Billing: Monthly Revenue (paid invoices in current month)
  const payments = await prisma.payment.findMany({
    where: {
      paid_on: { gte: monthStart, lte: monthEnd },
      matter: { agency_id: agencyId }
    },
    select: { amount: true }
  });
  const monthlyRevenue = payments.reduce((acc, p) => acc + money(p.amount), 0);

  // 3. Outstanding Billing (balance due on unpaid/due/overdue invoices)
  const unpaidInvoices = await prisma.invoice.findMany({
    where: {
      agency_id: agencyId,
      status: { in: ['unpaid', 'due', 'overdue'] }
    },
    select: { amount: true }
  });
  const outstandingBilling = unpaidInvoices.reduce((acc, inv) => acc + money(inv.amount), 0);

  // 4. Billable Hours (current month)
  const timeEntries = await prisma.timeEntry.findMany({
    where: {
      created_at: { gte: monthStart, lte: monthEnd },
      matter: { agency_id: agencyId }
    },
    select: { duration_minutes: true }
  });
  const billableMinutes = timeEntries.reduce((acc, te) => acc + (te.duration_minutes || 0), 0);
  const billableHours = Math.round((billableMinutes / 60) * 10) / 10;

  // 5. Practice Areas Breakdown
  const practiceAreasList = await prisma.matter.groupBy({
    by: ['practice_area'],
    where: { agency_id: agencyId },
    _count: { id: true }
  });

  const paMatters = await prisma.matter.findMany({
    where: { agency_id: agencyId },
    include: {
      payments: { select: { amount: true } }
    }
  });

  const practiceAreasData = practiceAreasList.map(pa => {
    const area = pa.practice_area || 'General';
    const mattersCount = pa._count.id;
    const areaMatters = paMatters.filter(m => m.practice_area === pa.practice_area);
    const revenue = areaMatters.reduce((acc, m) => {
      return acc + m.payments.reduce((sum, p) => sum + money(p.amount), 0);
    }, 0);

    return {
      area,
      revenue: formatMoney(revenue),
      rawRevenue: revenue,
      matters: mattersCount
    };
  });

  const totalPaRevenue = practiceAreasData.reduce((acc, p) => acc + p.rawRevenue, 0);
  const practiceAreas = practiceAreasData.map(p => ({
    ...p,
    percentage: totalPaRevenue > 0 ? Math.round((p.rawRevenue / totalPaRevenue) * 100) : 0
  })).sort((a, b) => b.rawRevenue - a.rawRevenue);

  // 6. Executive Schedule & Deadlines (Upcoming Schedule)
  const scheduleEvents = await prisma.calendarEvent.findMany({
    where: {
      event_date: { gte: now },
      matter: { agency_id: agencyId }
    },
    take: 10,
    orderBy: { event_date: 'asc' },
    include: {
      matter: { select: { matter_number: true, title: true } }
    }
  });

  const upcomingSchedule = scheduleEvents.map(e => ({
    id: e.id,
    time: e.event_date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    date: e.event_date.toISOString().split('T')[0],
    type: e.type,
    title: e.title,
    location: e.court_name || e.court_room || 'Office',
    matter: e.matter?.matter_number || 'General'
  }));

  // 7. Team Productivity & Utilization (Users inside agency)
  const users = await prisma.user.findMany({
    where: { agency_id: agencyId, is_active: true },
    include: {
      roles: true,
      lawyer: { select: { practice_focus: true } },
      assigned_matters: { where: { status: 'active' } },
      time_entries: {
        where: { created_at: { gte: monthStart, lte: monthEnd } }
      },
      payments: {
        where: { created_at: { gte: monthStart, lte: monthEnd } }
      }
    }
  });

  const teamPerformance = users.map(u => {
    const roleStr = u.roles.map(r => r.role).join(', ') || u.role;
    const uMinutes = u.time_entries.reduce((acc, te) => acc + (te.duration_minutes || 0), 0);
    const uHours = Math.round(uMinutes / 60);
    const activeMattersCount = u.assigned_matters.length;
    const billedSum = u.payments.reduce((acc, p) => acc + money(p.amount), 0);
    const utilizationPct = Math.min(Math.round((uHours / 160) * 100), 100);

    return {
      id: u.id,
      name: u.full_name,
      position: roleStr,
      department: u.lawyer?.practice_focus || 'Legal',
      billed: formatMoney(billedSum),
      hours: `${uHours}h`,
      utilization: utilizationPct,
      active_matters: activeMattersCount,
      status: u.is_active ? 'active' : 'inactive'
    };
  });

  // 8. Recent Activities Feed
  const logs = await prisma.activity.findMany({
    where: {
      OR: [
        { matter: { agency_id: agencyId } },
        { actor: { agency_id: agencyId } }
      ]
    },
    take: 10,
    orderBy: { created_at: 'desc' },
    include: {
      actor: { select: { full_name: true } }
    }
  });

  const activities = logs.map(l => {
    let detailMsg = l.description || '';
    try {
      const parsed = JSON.parse(l.description);
      detailMsg = parsed.message || parsed.detail || l.description;
    } catch(e) {}
    
    return {
      id: l.id,
      title: `${l.action} - ${l.entity_type}`,
      detail: `${detailMsg} (by ${l.actor?.full_name || 'System'})`,
      time: relTime(l.created_at)
    };
  });

  // 9. Active Firm Matters
  const agencyMatters = await prisma.matter.findMany({
    where: { agency_id: agencyId, status: 'active' },
    take: 5,
    orderBy: { updated_at: 'desc' },
    include: {
      client: { select: { full_name: true } },
      assigned_lawyer: { select: { full_name: true } },
      payments: { select: { amount: true } }
    }
  });

  const activeFirmMatters = agencyMatters.map(m => {
    const totalBilled = m.payments.reduce((acc, p) => acc + money(p.amount), 0);
    return {
      id: m.id,
      matter_number: m.matter_number,
      title: m.title,
      client_name: m.client?.full_name || 'Client',
      practice_area: m.practice_area,
      lead_attorney: m.assigned_lawyer?.full_name || 'Unassigned',
      associate: 'N/A',
      est_value: formatMoney(totalBilled * 1.5 || 50000),
      next_court_date: m.next_hearing ? m.next_hearing.toISOString().split('T')[0] : 'N/A',
      status: m.status
    };
  });

  // 10. Dashboard KPIs array format
  const kpis = [
    { id: 'kpi-1', label: 'Active Matters', value: String(activeMatters), change: `${activeMatters - completedMatters} net`, color: 'blue' },
    { id: 'kpi-2', label: 'Firm Matters', value: String(totalMatters), change: `Total: ${totalMatters}`, color: 'purple' },
    { id: 'kpi-3', label: 'Active Clients', value: String(totalClients), change: `Total registered`, color: 'emerald' },
    { id: 'kpi-4', label: 'Associate Lawyers', value: `${totalTeam} staff`, change: 'Active staff', color: 'amber' },
    { id: 'kpi-5', label: 'Monthly Revenue', value: formatMoney(monthlyRevenue), change: 'This Month', color: 'emerald' },
    { id: 'kpi-6', label: 'Billable Hours', value: `${billableHours}h`, change: 'Current Month', color: 'blue' },
    { id: 'kpi-7', label: 'Pending Tasks', value: `${pendingTasks} items`, change: 'To-do', color: 'rose' },
    { id: 'kpi-8', label: 'Upcoming Hearings', value: `${upcomingHearingsCount} upcoming`, change: '7 days', color: 'indigo' },
  ];

  return {
    kpis,
    firmPerformance: {
      avgDuration: '4.2 Months',
      successRate: '95%',
      realizationRate: '98%',
      practiceAreas
    },
    teamPerformance,
    activities,
    upcomingSchedule,
    activeFirmMatters
  };
};

const getParalegalDashboard = async (userId, agencyId) => {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  const [
    assignedMattersCount,
    pendingTasksCount,
    todaysTasksCount,
    upcomingDeadlinesCount,
    myTimeEntries,
    tasks,
    scheduleEvents,
    documents
  ] = await Promise.all([
    prisma.matter.count({ where: { agency_id: agencyId, status: 'active' } }),
    prisma.task.count({
      where: {
        status: { not: 'completed' },
        OR: [
          { assigned_user_id: userId },
          { created_by_user_id: userId },
          { matter: { agency_id: agencyId } }
        ]
      }
    }),
    prisma.task.count({
      where: {
        due_date: {
          gte: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0),
          lte: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)
        },
        OR: [
          { assigned_user_id: userId },
          { created_by_user_id: userId },
          { matter: { agency_id: agencyId } }
        ]
      }
    }),
    prisma.calendarEvent.count({
      where: {
        event_date: { gte: now },
        matter: { agency_id: agencyId }
      }
    }),
    prisma.timeEntry.findMany({
      where: {
        created_by_user_id: userId,
        created_at: { gte: monthStart, lte: monthEnd }
      },
      select: { duration_minutes: true }
    }),
    prisma.task.findMany({
      where: {
        OR: [
          { assigned_user_id: userId },
          { created_by_user_id: userId },
          { matter: { agency_id: agencyId } }
        ]
      },
      take: 10,
      orderBy: [{ status: 'asc' }, { due_date: 'asc' }],
      include: {
        created_by: { select: { full_name: true } },
        matter: { select: { title: true, matter_number: true } }
      }
    }),
    prisma.calendarEvent.findMany({
      where: {
        event_date: { gte: now },
        matter: { agency_id: agencyId }
      },
      take: 10,
      orderBy: { event_date: 'asc' },
      include: {
        matter: { select: { matter_number: true, title: true } }
      }
    }),
    prisma.document.findMany({
      where: {
        folder: { matter: { agency_id: agencyId } }
      },
      take: 10,
      orderBy: { updated_at: 'desc' }
    })
  ]);

  const unbilledMinutes = myTimeEntries.reduce((acc, te) => acc + (te.duration_minutes || 0), 0);
  const unbilledHours = Math.round((unbilledMinutes / 60) * 10) / 10;

  const formattedTasks = tasks.map(t => ({
    id: t.id,
    title: t.title,
    matter: t.matter?.title || t.matter?.matter_number || 'General',
    assignedBy: t.created_by?.full_name || 'Legal Admin',
    dueDate: t.due_date ? t.due_date.toISOString().split('T')[0] : 'No Due Date',
    priority: (t.priority || 'medium').charAt(0).toUpperCase() + (t.priority || 'medium').slice(1),
    status: t.status === 'completed' ? 'completed' : t.status === 'in_progress' ? 'in_progress' : 'open'
  }));

  const formattedSchedule = scheduleEvents.map(e => ({
    id: e.id,
    time: e.event_date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    date: e.event_date.toISOString().split('T')[0],
    type: (e.type || 'deadline').toUpperCase(),
    title: e.title,
    location: e.court_name || e.court_room || 'Law Office'
  }));

  const formattedDocuments = documents.map(doc => ({
    id: doc.id,
    title: doc.name || doc.title || 'Untitled Document',
    category: doc.category || 'Pleading',
    size: doc.file_size ? `${Math.round(doc.file_size / 1024)} KB` : '1.2 MB',
    updated_at: doc.updated_at ? doc.updated_at.toISOString().split('T')[0] : 'Today',
    status: doc.status || 'draft'
  }));

  const kpis = [
    { id: 'kpi-1', label: 'Assigned Matters', value: String(assignedMattersCount), change: 'Active Cases' },
    { id: 'kpi-2', label: 'Pending Tasks', value: String(pendingTasksCount), change: `${todaysTasksCount} Due Today` },
    { id: 'kpi-3', label: 'Upcoming Deadlines', value: String(upcomingDeadlinesCount), change: 'Next 30 Days' },
    { id: 'kpi-4', label: 'Unbilled Hours', value: `${unbilledHours}h`, change: 'Current Month' }
  ];

  return {
    kpis,
    tasks: formattedTasks,
    schedule: formattedSchedule,
    documents: formattedDocuments
  };
};

module.exports = {
  getAdminDashboard,
  getLawyerStats,
  getClientStats,
  getPartnerDashboard,
  getParalegalDashboard,
};
