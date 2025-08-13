#!/usr/bin/env node

/**
 * Script pour identifier les composants React sans PropTypes
 * Usage: node find-missing-proptypes.js
 */

const fs = require('fs');
const path = require('path');

// Dossiers à scanner
const SCAN_DIRS = [
  'src/components',
  'src/screens',
  'src/contexts'
];

// Extensions de fichiers à scanner
const JS_EXTENSIONS = ['.js', '.jsx'];

// Fichiers à ignorer
const IGNORE_FILES = [
  'index.js',
  'style.js',
  'use*.js',
  '*.test.js',
  '*.spec.js'
];

// Patterns pour détecter les composants React
const REACT_PATTERNS = [
  /import\s+React/,
  /export\s+default/,
  /function\s+\w+\(/,
  /const\s+\w+\s*=\s*\(/,
  /class\s+\w+\s+extends\s+React/
];

// Patterns pour détecter les PropTypes
const PROPTYPES_PATTERNS = [
  /PropTypes/,
  /\.propTypes\s*=/,
  /import.*PropTypes/
];

function shouldIgnoreFile(filename) {
  return IGNORE_FILES.some(pattern => {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace('*', '.*'));
      return regex.test(filename);
    }
    return filename === pattern;
  });
}

function isReactComponent(content) {
  return REACT_PATTERNS.some(pattern => pattern.test(content));
}

function hasPropTypes(content) {
  return PROPTYPES_PATTERNS.some(pattern => pattern.test(content));
}

function scanDirectory(dirPath, results = []) {
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath, results);
      } else if (stat.isFile()) {
        const ext = path.extname(item);
        if (JS_EXTENSIONS.includes(ext) && !shouldIgnoreFile(item)) {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');
            
            if (isReactComponent(content) && !hasPropTypes(content)) {
              results.push({
                file: fullPath,
                relativePath: path.relative(process.cwd(), fullPath),
                size: stat.size,
                lines: content.split('\n').length
              });
            }
          } catch (err) {
            console.warn(`⚠️  Erreur lecture ${fullPath}:`, err.message);
          }
        }
      }
    }
  } catch (err) {
    console.warn(`⚠️  Erreur accès ${dirPath}:`, err.message);
  }
  
  return results;
}

function main() {
  console.log('🔍 Recherche des composants React sans PropTypes...\n');
  
  const missingPropTypes = [];
  
  for (const dir of SCAN_DIRS) {
    if (fs.existsSync(dir)) {
      console.log(`📁 Scan de ${dir}...`);
      scanDirectory(dir, missingPropTypes);
    } else {
      console.log(`⚠️  Dossier non trouvé: ${dir}`);
    }
  }
  
  console.log('\n📊 RÉSULTATS:');
  console.log('='.repeat(60));
  
  if (missingPropTypes.length === 0) {
    console.log('✅ Tous les composants ont des PropTypes !');
  } else {
    console.log(`❌ ${missingPropTypes.length} composants sans PropTypes trouvés:\n`);
    
    // Tri par taille de fichier (plus gros d'abord)
    missingPropTypes.sort((a, b) => b.size - a.size);
    
    missingPropTypes.forEach((item, index) => {
      console.log(`${index + 1}. ${item.relativePath}`);
      console.log(`   📏 ${item.lines} lignes, ${Math.round(item.size / 1024)} KB`);
    });
    
    console.log('\n📈 STATISTIQUES:');
    console.log(`   Total: ${missingPropTypes.length} fichiers`);
    console.log(`   Lignes totales: ${missingPropTypes.reduce((sum, item) => sum + item.lines, 0)}`);
    console.log(`   Taille totale: ${Math.round(missingPropTypes.reduce((sum, item) => sum + item.size, 0) / 1024)} KB`);
    
    // Sauvegarder la liste dans un fichier
    const outputFile = 'missing-proptypes-list.txt';
    const content = missingPropTypes.map(item => 
      `${item.relativePath} (${item.lines} lignes, ${Math.round(item.size / 1024)} KB)`
    ).join('\n');
    
    fs.writeFileSync(outputFile, content);
    console.log(`\n💾 Liste sauvegardée dans: ${outputFile}`);
  }
}

if (require.main === module) {
  main();
}

module.exports = { scanDirectory, isReactComponent, hasPropTypes };
