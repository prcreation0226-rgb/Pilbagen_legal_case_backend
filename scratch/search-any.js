const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];
const query = process.argv[3];
console.log(`Searching for "${query}" in ${filePath}...`);

const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

lines.forEach((line, index) => {
  if (line.toLowerCase().includes(query.toLowerCase())) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
