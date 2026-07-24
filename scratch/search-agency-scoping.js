const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      searchDir(filePath);
    } else if (stat.isFile() && file.endsWith('.js')) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('prisma.')) {
        // Find prisma.xxx.find or similar and check if agency_id is passed
        const regex = /prisma\.\w+\.\w+\(/g;
        let match;
        const matches = [];
        while ((match = regex.exec(content)) !== null) {
          matches.push(match[0]);
        }
        if (matches.length > 0) {
          console.log(`File: ${filePath} contains queries: ${matches.join(', ')}`);
        }
      }
    }
  }
}

const srcDir = 'c:\\Users\\nisha\\OneDrive\\Pictures\\KiyaanProject\\legal_case\\Pilbagen_legal_case_backend\\src';
searchDir(srcDir);
