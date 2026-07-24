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
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (line.includes('agency_id') || line.includes('agencyId')) {
          console.log(`${filePath}:${index + 1}: ${line.trim()}`);
        }
      });
    }
  }
}

const srcDir = 'c:\\Users\\nisha\\OneDrive\\Pictures\\KiyaanProject\\legal_case\\Pilbagen_legal_case_backend\\src\\modules';
searchDir(srcDir);
