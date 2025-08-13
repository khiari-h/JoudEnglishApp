#!/usr/bin/env node

/**
 * Script pour corriger les imports PropTypes mal placés
 * Usage: node fix-proptypes-imports.js
 */

const fs = require('fs');

// Fichiers à corriger
const FILES_TO_FIX = [
  'src/contexts/ProgressContext.js',
  'src/contexts/ThemeContext.js',
  'src/contexts/SettingContext.js',
  'src/contexts/AppProvider.js'
];

function fixPropTypesImport(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Supprimer l'import mal placé
    content = content.replace(/import PropTypes from 'prop-types';?\n?/g, '');
    
    // Ajouter l'import au bon endroit (après les autres imports)
    const importMatch = content.match(/(import\s+.*?from\s+['"][^'"]+['"];?\n?)/g);
    if (importMatch) {
      const lastImport = importMatch[importMatch.length - 1];
      const propTypesImport = "import PropTypes from 'prop-types';\n";
      content = content.replace(lastImport, lastImport + propTypesImport);
    }
    
    // Sauvegarder
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${filePath} - Import PropTypes corrigé`);
    return true;
    
  } catch (err) {
    console.error(`❌ Erreur avec ${filePath}:`, err.message);
    return false;
  }
}

function main() {
  console.log('🔧 Correction des imports PropTypes mal placés...\n');
  
  let successCount = 0;
  
  for (const filePath of FILES_TO_FIX) {
    if (fs.existsSync(filePath)) {
      if (fixPropTypesImport(filePath)) {
        successCount++;
      }
    }
  }
  
  console.log(`\n✅ ${successCount} fichiers corrigés`);
}

if (require.main === module) {
  main();
}
