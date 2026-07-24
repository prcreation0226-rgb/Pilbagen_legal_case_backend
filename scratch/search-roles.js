const fs = require('fs');
const path = require('path');

function searchDir(dir, query) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      searchDir(filePath, query);
    } else if (stat.isFile() && (file.endsWith('.js') || file.endsWith('.jsx'))) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.toLowerCase().includes(query.toLowerCase())) {
        console.log(`Found in file: ${filePath}`);
      }
    }
  }
}

const srcDir = 'c:\\Users\\nisha\\OneDrive\\Pictures\\KiyaanProject\\legal_case\\pilbagen-case-frontend\\src';
console.log('Searching for role_admin...');
searchDir(srcDir, 'role_admin');
console.log('Searching for role_client...');
searchDir(srcDir, 'role_client');
