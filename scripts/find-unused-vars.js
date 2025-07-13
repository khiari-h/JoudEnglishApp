// Script Node pour détecter toutes les variables non utilisées avec l'API ESLint v9+
// Usage : node scripts/find-unused-vars.js

import { ESLint } from 'eslint';
import fs from 'fs';

const outputPath = './unused-vars-detected.txt';

(async function main() {
  const eslint = new ESLint(); // plus d'options ici

  // Analyse tous les fichiers JS/TS du projet
  const results = await eslint.lintFiles(['**/*.{js,jsx,ts,tsx}']);

  let report = '';
  for (const result of results) {
    const unused = result.messages.filter(
      m => m.ruleId === 'no-unused-vars'
    );
    if (unused.length > 0) {
      report += `\n${result.filePath}\n`;
      for (const msg of unused) {
        report += `  ligne ${msg.line}, colonne ${msg.column} : ${msg.message}\n`;
      }
    }
  }

  if (report) {
    fs.writeFileSync(outputPath, report.trim(), 'utf-8');
    console.log(`Rapport généré : ${outputPath}`);
  } else {
    console.log('Aucune variable non utilisée détectée !');
  }
})(); 