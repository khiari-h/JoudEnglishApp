#!/usr/bin/env node

/**
 * Script pour nettoyer et corriger définitivement les imports PropTypes
 * Usage: node cleanup-proptypes.js
 */

const fs = require('fs');

// Fichiers à nettoyer
const FILES_TO_CLEAN = [
  'src/contexts/ProgressContext.js',
  'src/contexts/ThemeContext.js',
  'src/contexts/SettingContext.js',
  'src/contexts/AppProvider.js'
];

function cleanupPropTypesImport(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Nettoyer l'import mal placé
    content = content.replace(/import PropTypes from 'prop-types';?\n?/g, '');
    
    // Trouver la ligne des imports et ajouter PropTypes proprement
    const lines = content.split('\n');
    let importEndIndex = -1;
    
    // Trouver la fin des imports
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('import') && !lines[i].includes('PropTypes')) {
        importEndIndex = i;
      } else if (lines[i].trim() === '' && importEndIndex !== -1) {
        // Ligne vide après les imports
        break;
      }
    }
    
    if (importEndIndex !== -1) {
      // Insérer PropTypes après le dernier import
      lines.splice(importEndIndex + 1, 0, "import PropTypes from 'prop-types';");
      content = lines.join('\n');
    }
    
    // Sauvegarder
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${filePath} - Import PropTypes nettoyé et corrigé`);
    return true;
    
  } catch (err) {
    console.error(`❌ Erreur avec ${filePath}:`, err.message);
    return false;
  }
}

function main() {
  console.log('🧹 Nettoyage et correction finale des imports PropTypes...\n');
  
  let successCount = 0;
  
  for (const filePath of FILES_TO_CLEAN) {
    if (fs.existsSync(filePath)) {
      if (cleanupPropTypesImport(filePath)) {
        successCount++;
      }
    }
  }
  
  console.log(`\n✅ ${successCount} fichiers nettoyés`);
  console.log('\n🎯 Maintenant on peut tester !');
}

if (require.main === module) {
  main();
}
