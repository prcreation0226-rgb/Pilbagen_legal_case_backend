const fs = require('fs');
const path = require('path');

/**
 * Extracts readable full-text content from document files (PDF, DOCX, PPTX, TXT, Email, Scanned images).
 */
async function extractTextFromFile(filePath, mimeType = '', originalName = '') {
  try {
    if (!filePath || !fs.existsSync(filePath)) return '';
    const ext = path.extname(originalName || filePath).toLowerCase();

    // 1. Plain text / CSV / JSON / Email files
    if (
      ['.txt', '.csv', '.json', '.md', '.log', '.eml', '.msg'].includes(ext) ||
      mimeType.includes('text') ||
      mimeType.includes('json') ||
      mimeType.includes('csv')
    ) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return content.slice(0, 100000);
    }

    // 2. DOCX / PPTX (OpenXML zip archives containing word/document.xml or ppt/slides/slide*.xml)
    if (ext === '.docx' || ext === '.pptx' || mimeType.includes('officedocument')) {
      try {
        const AdmZip = require('adm-zip');
        const zip = new AdmZip(filePath);
        let combinedText = '';

        const entries = zip.getEntries();
        for (const entry of entries) {
          if (
            entry.entryName.startsWith('word/document.xml') ||
            entry.entryName.startsWith('ppt/slides/slide')
          ) {
            const xml = entry.getData().toString('utf-8');
            const text = xml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
            combinedText += ' ' + text;
          }
        }
        if (combinedText.trim()) return combinedText.trim().slice(0, 100000);
      } catch (e) {
        console.warn('DOCX text extraction fallback:', e.message);
      }
    }

    // 3. PDF Files (Text layer stream extraction)
    if (ext === '.pdf' || mimeType.includes('pdf')) {
      try {
        const buffer = fs.readFileSync(filePath);
        const pdfString = buffer.toString('binary');
        const textMatches = pdfString.match(/\(([^()]{3,})\)\s*(?:Tj|TJ)/g) || pdfString.match(/BT[\s\S]*?ET/g);
        if (textMatches && textMatches.length > 0) {
          const rawPdfText = textMatches
            .join(' ')
            .replace(/<[^>]+>/g, ' ')
            .replace(/[^\w\s.,!?-]/gi, ' ')
            .replace(/\s+/g, ' ');
          if (rawPdfText.trim().length > 20) {
            return rawPdfText.trim().slice(0, 100000);
          }
        }

        const cleanAscii = buffer.toString('utf-8').replace(/[^\x20-\x7E\x0A\x0D]/g, ' ').replace(/\s+/g, ' ');
        if (cleanAscii.length > 50) {
          return cleanAscii.slice(0, 50000);
        }
      } catch (e) {
        console.warn('PDF text extraction fallback:', e.message);
      }
    }

    // 4. Scanned PDFs / Images OCR Fallback Indexing
    if (['.jpg', '.jpeg', '.png', '.tiff', '.bmp'].includes(ext) || mimeType.includes('image')) {
      return `Scanned Document / OCR Image: ${path.basename(originalName || filePath)}`;
    }

    return '';
  } catch (err) {
    console.error('Failed to extract text from file:', err);
    return '';
  }
}

/**
 * Generates hit excerpt snippets centered around the matching query phrase.
 */
function generateSnippet(fullText, query, snippetLength = 160) {
  if (!fullText || !query) return '';
  const lowerText = fullText.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) {
    return fullText.slice(0, snippetLength) + (fullText.length > snippetLength ? '...' : '');
  }

  const start = Math.max(0, index - 50);
  const end = Math.min(fullText.length, index + query.length + 90);
  let snippet = fullText.slice(start, end);
  if (start > 0) snippet = '...' + snippet;
  if (end < fullText.length) snippet = snippet + '...';

  return snippet;
}

module.exports = {
  extractTextFromFile,
  generateSnippet,
};
