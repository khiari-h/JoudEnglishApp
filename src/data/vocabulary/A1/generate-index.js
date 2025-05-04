const fs = require('fs');
const path = require('path');

const categoriesDir = path.join(__dirname, 'categories');
const files = fs.readdirSync(categoriesDir)
  .filter(f => f.endsWith('.js'))
  .sort();

let imports = '';
let names = [];

files.forEach(file => {
  const base = file.replace('.js', '');
  const varName = base;
  imports += `import ${varName} from "./categories/${base}.js";\n`;
  names.push(varName);
});

const content =
  imports +
  '\nexport default {\n  exercises: [\n    ' +
  names.join(',\n    ') +
  '\n  ],\n};\n';

fs.writeFileSync(path.join(__dirname, 'index.js'), content, 'utf8');
console.log('index.js généré avec', files.length, 'fichiers.');