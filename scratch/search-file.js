const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\nisha\\OneDrive\\Pictures\\KiyaanProject\\legal_case\\pilbagen-case-frontend\\src\\pages\\AdminPages.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const query = process.argv[2] || 'add-user';
console.log(`Searching for "${query}" in AdminPages.jsx...`);

lines.forEach((line, index) => {
  if (line.toLowerCase().includes(query.toLowerCase())) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
