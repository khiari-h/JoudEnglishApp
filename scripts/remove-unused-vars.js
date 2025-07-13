// Script Node pour supprimer automatiquement les imports/variables non utilisées (cas simples)
// Usage : node scripts/remove-unused-vars.js
import fs from 'fs';

const reportPath = './eslint-report.json';
const outputPath = './unused-vars-report.txt';

if (!fs.existsSync(reportPath)) {
  console.error('Le fichier eslint-report.json est introuvable.');
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));

const unusedVars = [];
const autoFixed = [];

for (const file of report) {
  if (!file.messages) continue;
  let fileContent = null;
  let fileChanged = false;
  for (const msg of file.messages) {
    if (msg.ruleId === 'no-unused-vars') {
      // Cas simple : import ou déclaration isolée sur une ligne
      const isImport = msg.message.includes('is defined but never used') && msg.line <= 10;
      const isSimpleAssign = msg.message.includes('is assigned a value but never used');
      if ((isImport || isSimpleAssign) && fs.existsSync(file.filePath)) {
        if (!fileContent) fileContent = fs.readFileSync(file.filePath, 'utf-8').split('\n');
        // Supprime la ligne concernée si elle ne contient qu'un import ou une déclaration simple
        const lineIdx = msg.line - 1;
        const line = fileContent[lineIdx];
        if (line && (line.trim().startsWith('import') || line.trim().match(/^(const|let|var) [^=]+=/))) {
          fileContent[lineIdx] = '';
          fileChanged = true;
          autoFixed.push({ file: file.filePath, line: msg.line, message: msg.message });
          continue;
        }
      }
      // Sinon, on garde pour le rapport manuel
      unusedVars.push({
        file: file.filePath,
        line: msg.line,
        column: msg.column,
        message: msg.message,
      });
    }
  }
  if (fileChanged && fileContent) {
    fs.writeFileSync(file.filePath, fileContent.join('\n'));
  }
}

// Rapport des cas restants
if (unusedVars.length === 0) {
  fs.writeFileSync(outputPath, 'Aucune variable non utilisée trouvée !\n');
  console.log('Aucune variable non utilisée trouvée !');
} else {
  const output = unusedVars.map(
    v => `${v.file}: ligne ${v.line}, colonne ${v.column} : ${v.message}`
  ).join('\n');
  fs.writeFileSync(outputPath, output + '\n');
  console.log(`Rapport généré : ${outputPath}`);
}

// Rapport des suppressions auto
if (autoFixed.length > 0) {
  const autoOutput = autoFixed.map(
    v => `${v.file}: ligne ${v.line} : ${v.message}`
  ).join('\n');
  fs.writeFileSync('./auto-fixed-unused-vars.txt', autoOutput + '\n');
  console.log('Suppressions automatiques enregistrées dans auto-fixed-unused-vars.txt');
} 