#!/usr/bin/env node

/**
 * Script pour ajouter automatiquement les PropTypes aux composants React
 * Usage: node add-proptypes-automatically.js
 */

const fs = require('fs');
const path = require('path');

// Liste des 24 composants identifiés
const COMPONENTS_TO_FIX = [
  'src/contexts/ProgressContext.js',
  'src/contexts/ThemeContext.js',
  'src/screens/VocabularyRevision/components/ResultScreen.js',
  'src/screens/VocabularyRevision/components/QuizContent.js',
  'src/screens/Lock/LockScreen.js',
  'src/contexts/SettingContext.js',
  'src/screens/VocabularyRevision/components/EmptyState.js',
  'src/screens/VocabularyRevision/components/QuizScreen.js',
  'src/screens/Lock/ForgotPinScreen.js',
  'src/contexts/LockContext.js',
  'src/screens/Lock/EmergencyResetScreen.js',
  'src/screens/VocabularyRevision/components/QuizHeader.js',
  'src/components/ui/Modal/ModalHeader.js',
  'src/components/ui/Button/ButtonIcon.js',
  'src/contexts/AppProvider.js',
  'src/contexts/CurrentLevelContext.js',
  'src/components/ui/Modal/ModalBody.js',
  'src/components/ui/Button/BasePressable.js',
  'src/components/ui/Button/ButtonLabel.js',
  'src/components/ui/Modal/ModalBackdrop.js',
  'src/components/ui/ProgressBar/ProgressFill.js',
  'src/components/ui/Modal/ModalFooter.js',
  'src/components/ui/Button/ButtonSpinner.js',
  'src/components/ui/ProgressBar/ProgressTrack.js'
];

// Patterns pour détecter les props
const PROPS_PATTERN = /const\s+\w+\s*=\s*\(\s*\{([^}]+)\}/;
const DESTRUCTURING_PATTERN = /\{([^}]+)\}/g;

// Types de PropTypes basiques
const BASIC_PROP_TYPES = {
  'string': 'PropTypes.string',
  'number': 'PropTypes.number',
  'boolean': 'PropTypes.bool',
  'function': 'PropTypes.func',
  'object': 'PropTypes.object',
  'array': 'PropTypes.array',
  'node': 'PropTypes.node',
  'element': 'PropTypes.element'
};

function detectProps(content) {
  const props = [];
  
  // Chercher la destructuration des props
  const propsMatch = content.match(PROPS_PATTERN);
  if (propsMatch) {
    const propsString = propsMatch[1];
    
    // Extraire chaque prop
    const propMatches = propsString.match(/(\w+)(?:\s*=\s*([^,]+))?/g);
    if (propMatches) {
      propMatches.forEach(propMatch => {
        const cleanProp = propMatch.trim();
        if (cleanProp && !cleanProp.includes('...')) {
          const [propName, defaultValue] = cleanProp.split('=').map(s => s.trim());
          if (propName && propName !== '') {
            props.push({
              name: propName,
              defaultValue: defaultValue,
              required: !defaultValue || defaultValue === 'undefined'
            });
          }
        }
      });
    }
  }
  
  return props;
}

function generatePropTypes(props) {
  if (props.length === 0) {
    return '  // Aucune prop détectée automatiquement';
  }
  
  return props.map(prop => {
    let propType = 'PropTypes.any'; // Type par défaut
    
    // Essayer de deviner le type basé sur le nom ou la valeur par défaut
    if (prop.defaultValue) {
      if (prop.defaultValue === '[]') propType = 'PropTypes.array';
      else if (prop.defaultValue === '{}') propType = 'PropTypes.object';
      else if (prop.defaultValue === 'true' || prop.defaultValue === 'false') propType = 'PropTypes.bool';
      else if (prop.defaultValue === '0' || prop.defaultValue === '1') propType = 'PropTypes.number';
      else if (prop.defaultValue.startsWith('"') || prop.defaultValue.startsWith("'")) propType = 'PropTypes.string';
      else if (prop.defaultValue.includes('()')) propType = 'PropTypes.func';
    }
    
    // Deviner basé sur le nom de la prop
    if (prop.name.includes('on') || prop.name.includes('handle')) propType = 'PropTypes.func';
    else if (prop.name.includes('is') || prop.name.includes('has') || prop.name.includes('show')) propType = 'PropTypes.bool';
    else if (prop.name.includes('count') || prop.name.includes('index') || prop.name.includes('id')) propType = 'PropTypes.number';
    else if (prop.name.includes('text') || prop.name.includes('title') || prop.name.includes('name')) propType = 'PropTypes.string';
    else if (prop.name.includes('items') || prop.name.includes('list') || prop.name.includes('array')) propType = 'PropTypes.array';
    
    const required = prop.required ? '.isRequired' : '';
    return `  ${prop.name}: ${propType}${required},`;
  }).join('\n');
}

function addPropTypesToFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Vérifier si PropTypes est déjà présent
    if (content.includes('PropTypes')) {
      console.log(`⚠️  ${filePath} a déjà des PropTypes, ignoré`);
      return false;
    }
    
    // Détecter les props
    const props = detectProps(content);
    
    // Ajouter l'import PropTypes
    if (!content.includes('import PropTypes')) {
      const importMatch = content.match(/(import\s+.*?from\s+['"][^'"]+['"];?\n?)/g);
      if (importMatch) {
        const lastImport = importMatch[importMatch.length - 1];
        const propTypesImport = "import PropTypes from 'prop-types';\n";
        content = content.replace(lastImport, lastImport + propTypesImport);
      }
    }
    
    // Trouver le nom du composant
    const componentMatch = content.match(/(?:const|function)\s+(\w+)\s*=/);
    if (!componentMatch) {
      console.log(`⚠️  Impossible de trouver le nom du composant dans ${filePath}`);
      return false;
    }
    
    const componentName = componentMatch[1];
    
    // Générer les PropTypes
    const propTypesCode = generatePropTypes(props);
    
    // Trouver l'export pour insérer les PropTypes avant
    const exportMatch = content.match(/(export\s+default\s+.*?;?\n?)/);
    if (exportMatch) {
      const exportStatement = exportMatch[1];
      const propTypesBlock = `\n${componentName}.propTypes = {\n${propTypesCode}\n};\n\n`;
      content = content.replace(exportStatement, propTypesBlock + exportStatement);
    } else {
      console.log(`⚠️  Impossible de trouver l'export dans ${filePath}`);
      return false;
    }
    
    // Sauvegarder le fichier
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${filePath} - PropTypes ajoutés (${props.length} props détectées)`);
    return true;
    
  } catch (err) {
    console.error(`❌ Erreur avec ${filePath}:`, err.message);
    return false;
  }
}

function main() {
  console.log('🚀 Ajout automatique des PropTypes aux 24 composants...\n');
  
  let successCount = 0;
  let totalCount = COMPONENTS_TO_FIX.length;
  
  for (const filePath of COMPONENTS_TO_FIX) {
    if (fs.existsSync(filePath)) {
      if (addPropTypesToFile(filePath)) {
        successCount++;
      }
    } else {
      console.log(`⚠️  Fichier non trouvé: ${filePath}`);
    }
  }
  
  console.log('\n📊 RÉSULTATS:');
  console.log('='.repeat(50));
  console.log(`✅ Succès: ${successCount}/${totalCount} composants`);
  console.log(`❌ Échecs: ${totalCount - successCount}/${totalCount} composants`);
  
  if (successCount > 0) {
    console.log('\n🎯 Prochaines étapes:');
    console.log('1. Vérifier que les PropTypes sont corrects');
    console.log('2. Lancer les tests pour s\'assurer que rien ne casse');
    console.log('3. Relancer l\'analyse SonarQube pour voir l\'amélioration');
  }
}

if (require.main === module) {
  main();
}

module.exports = { addPropTypesToFile, detectProps, generatePropTypes };
