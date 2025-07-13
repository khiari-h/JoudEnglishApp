const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Fonction pour extraire les mots d'un fichier JS
function extractWordsFromFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Regex pour extraire le tableau words
    const wordsArrayMatch = fileContent.match(/words:\s*\[([\s\S]*?)\]\s*}/);
    
    if (!wordsArrayMatch) {
      console.error(`Impossible de trouver le tableau "words" dans le fichier ${filePath}`);
      return { path: filePath, content: fileContent, wordsData: [] };
    }
    
    // Extraire tous les objets de mots du fichier
    // Cette regex capture l'objet complet avec ses propriétés
    const wordObjects = [];

    const wordsArrayContent = wordsArrayMatch[1];
    
    // Regex pour capturer chaque objet de mot complet
    const regex = /\{\s*word:\s*"([^"]+)"[^}]*\}/g;
    let match;
    
    while ((match = regex.exec(wordsArrayContent)) !== null) {
      // Capturer l'objet entier et le terme du mot
      const fullObject = match[0];
      const wordValue = match[1];
      
      // Extraire la position dans le fichier original
      const position = wordsArrayMatch.index + wordsArrayMatch[0].indexOf('[') + 1 + match.index;
      
      wordObjects.push({
        term: wordValue.toLowerCase().trim(),
        originalWord: wordValue,
        fullObject: fullObject,
        position: position
      });
    }
    
    return { 
      path: filePath, 
      content: fileContent, 
      wordsData: wordObjects 
    };
  } catch (error) {
    console.error(`Erreur lors de la lecture du fichier ${filePath}:`, error.message);
    return { path: filePath, content: "", wordsData: [] };
  }
}

// Fonction pour obtenir tous les fichiers JS par niveau
function getAllVocabularyFiles() {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const allFiles = [];
  
  for (const level of levels) {
    const categoryDir = path.join(__dirname, 'src', 'data', 'vocabulary', level, 'categories');
    
    if (!fs.existsSync(categoryDir)) {
      console.log(`Le dossier ${categoryDir} n'existe pas, niveau ${level} ignoré.`);
      continue;
    }
    
    const files = fs.readdirSync(categoryDir)
      .filter(file => file.endsWith('.js'))
      .map(file => ({
        path: path.join(categoryDir, file),
        level,
        category: file
      }));
    
    allFiles.push(...files);
  }
  
  return allFiles;
}

// Fonction pour créer un index global de tous les mots existants
async function createGlobalWordIndex() {
  const files = getAllVocabularyFiles();
  const globalIndex = new Map(); // word -> [{level, category, filePath, fullObject}]
  const allFileData = [];
  
  console.log(`Analyse de ${files.length} fichiers de vocabulaire...`);
  
  for (const fileInfo of files) {
    const fileData = extractWordsFromFile(fileInfo.path);
    fileData.level = fileInfo.level;
    fileData.category = fileInfo.category;
    allFileData.push(fileData);
    
    // Indexer chaque mot
    for (const wordData of fileData.wordsData) {
      const lowercaseWord = wordData.term;
      
      if (!globalIndex.has(lowercaseWord)) {
        globalIndex.set(lowercaseWord, []);
      }
      
      globalIndex.get(lowercaseWord).push({
        level: fileInfo.level,
        category: fileInfo.category,
        filePath: fileInfo.path,
        originalWord: wordData.originalWord,
        fullObject: wordData.fullObject,
        position: wordData.position
      });
    }
  }
  
  return { globalIndex, allFileData };
}

// Fonction pour supprimer les doublons dans les fichiers
async function removeDuplicates() {
  console.log('Création de l\'index global des mots...');
  const { globalIndex, allFileData } = await createGlobalWordIndex();
  
  console.log(`Index créé. ${globalIndex.size} mots uniques trouvés.`);
  
  // Trouver les doublons
  const duplicates = [];
  
  globalIndex.forEach((occurrences, word) => {
    if (occurrences.length > 1) {
      duplicates.push({
        word,
        occurrences
      });
    }
  });
  
  console.log(`${duplicates.length} mots en double trouvés.`);
  
  if (duplicates.length === 0) {
    console.log('Aucun doublon à supprimer.');
    return;
  }
  
  // Organiser les doublons par fichier pour les supprimer
  const duplicatesByFile = new Map(); // filePath -> [{word, originalWord, fullObject, keepIn}]
  
  for (const dup of duplicates) {
    // Garder la première occurrence, supprimer les suivantes
    const toKeep = dup.occurrences[0];
    const toRemove = dup.occurrences.slice(1);
    
    for (const occurrence of toRemove) {
      if (!duplicatesByFile.has(occurrence.filePath)) {
        duplicatesByFile.set(occurrence.filePath, []);
      }
      
      duplicatesByFile.get(occurrence.filePath).push({
        word: dup.word,
        originalWord: occurrence.originalWord,
        fullObject: occurrence.fullObject,
        keepIn: `${toKeep.level}/${toKeep.category}`
      });
    }
  }
  
  // Compter les occurrences totales
  let totalDuplicateOccurrences = 0;
  duplicatesByFile.forEach(dups => {
    totalDuplicateOccurrences += dups.length;
  });
  
  // Créer un rapport de ce qui va être supprimé
  let report = '='.repeat(80) + '\n';
  report += 'RAPPORT DE SUPPRESSION DES DOUBLONS\n';
  report += '='.repeat(80) + '\n\n';
  
  duplicatesByFile.forEach((dupsToRemove, filePath) => {
    const relativePath = filePath.split('vocabulary')[1];
    report += `${relativePath} : ${dupsToRemove.length} doublons à supprimer\n`;
    
    dupsToRemove.forEach(dup => {
      report += `  - "${dup.originalWord}" (conservé dans ${dup.keepIn})\n`;
    });
    
    report += '\n';
  });
  
  report += `Total: ${duplicates.length} mots en double, ${totalDuplicateOccurrences} occurrences à supprimer.\n`;
  
  // Afficher le rapport et demander confirmation
  console.log(report);
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const proceed = await new Promise(resolve => {
    rl.question('Voulez-vous procéder à la suppression des doublons ? (oui/non): ', answer => {
      resolve(answer.toLowerCase() === 'oui' || answer.toLowerCase() === 'o' || answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
  
  if (!proceed) {
    console.log('Opération annulée.');
    rl.close();
    return;
  }
  
  // Procéder à la suppression
  console.log('Suppression des doublons en cours...');
  
  // Créer un dossier de backup
  const backupDir = path.join(__dirname, 'backup', `backup_${new Date().toISOString().replace(/:/g, '-')}`);
  fs.mkdirSync(backupDir, { recursive: true });
  
  // Pour chaque fichier contenant des doublons
  for (const filePath of duplicatesByFile.keys()) {
    // Récupérer les données du fichier
    const fileData = allFileData.find(data => data.path === filePath);
    
    if (!fileData) {
      console.error(`Erreur: données du fichier ${filePath} introuvables.`);
      continue;
    }
    
    // Faire une sauvegarde du fichier original

    const backupPath = path.join(backupDir, `${fileData.level}_${fileData.category}`);
    fs.writeFileSync(backupPath, fileData.content);
    
    // Récupérer les doublons à supprimer
    const dupsToRemove = duplicatesByFile.get(filePath);
    
    // Créer un nouveau contenu de fichier en supprimant chaque objet doublon
    let newContent = fileData.content;
    
    // Débutons par le deuxième élément (index 1) et descendons pour éviter des problèmes de décalage
    const sortedDups = dupsToRemove
      .map(dup => ({
        ...dup,
        match: newContent.indexOf(dup.fullObject)
      }))
      .filter(dup => dup.match !== -1)
      .sort((a, b) => b.match - a.match); // Trier par position décroissante
    
    for (const dup of sortedDups) {
      // Trouver la position de l'objet entier, y compris la virgule séparatrice le cas échéant
      const startPos = dup.match;
      let endPos = startPos + dup.fullObject.length;
      
      // Vérifier si l'objet est suivi d'une virgule
      const afterObject = newContent.substring(endPos, endPos + 2);
      if (afterObject.trim().startsWith(',')) {
        endPos += 1; // Inclure la virgule dans la suppression
      } 
      // Si c'est le dernier élément et qu'il y a une virgule avant
      else {
        const beforeObject = newContent.substring(Math.max(0, startPos - 2), startPos);
        if (beforeObject.trim().endsWith(',')) {
          // Ajuster la position de début pour inclure la virgule précédente
          const commaPos = newContent.lastIndexOf(',', startPos);
          if (commaPos !== -1 && commaPos > startPos - 10) { // Raisonnable pour une virgule proche
            startPos = commaPos;
          }
        }
      }
      
      // Supprimer l'objet du contenu
      newContent = newContent.substring(0, startPos) + newContent.substring(endPos);
    }
    
    // Nettoyer les potentielles virgules consécutives ou isolées
    newContent = newContent.replace(/,\s*,/g, ','); // Virgules consécutives
    newContent = newContent.replace(/\[\s*,/g, '['); // Virgule après ouverture de tableau
    newContent = newContent.replace(/,\s*\]/g, ']'); // Virgule avant fermeture de tableau
    
    // Écrire le fichier mis à jour
    fs.writeFileSync(filePath, newContent);
    
    console.log(`Fichier mis à jour: ${fileData.level}/${fileData.category} (${sortedDups.length} doublons supprimés)`);
  }
  
  // Enregistrer le rapport
  const reportPath = path.join(backupDir, 'rapport_suppression.txt');
  fs.writeFileSync(reportPath, report);
  
  console.log('\nSuppression des doublons terminée!');
  console.log(`Un rapport a été enregistré dans ${reportPath}`);
  console.log(`Les fichiers originaux ont été sauvegardés dans ${backupDir}`);
  
  rl.close();
}

// Fonction pour vérifier si un mot existe déjà dans le vocabulaire
async function checkWordExists(word) {
  const { globalIndex } = await createGlobalWordIndex();
  const lowercaseWord = word.toLowerCase().trim();
  
  if (globalIndex.has(lowercaseWord)) {
    const occurrences = globalIndex.get(lowercaseWord);
    console.log(`\n⚠️ Le mot "${word}" existe déjà dans:`);
    
    // Regrouper par niveau pour une meilleure lisibilité
    const byLevel = {};
    
    occurrences.forEach(occ => {
      if (!byLevel[occ.level]) {
        byLevel[occ.level] = [];
      }
      byLevel[occ.level].push(occ.category);
    });
    
    // Afficher les occurrences organisées par niveau
    Object.keys(byLevel).sort().forEach(level => {
      console.log(`  Niveau ${level}:`);
      byLevel[level].sort().forEach(category => {
        console.log(`    - ${category}`);
      });
    });
    
    return {
      exists: true,
      occurrences: occurrences
    };
  }
  
  console.log(`\n✅ Le mot "${word}" n'existe pas encore dans le vocabulaire.`);
  return {
    exists: false,
    occurrences: []
  };
}

// Fonction pour ajouter un nouveau mot
async function addNewWord(word, translation, level, category, example = "") {
  // Vérifier si le mot existe déjà
  const result = await checkWordExists(word);
  
  if (result.exists) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const proceed = await new Promise(resolve => {
      rl.question('Le mot existe déjà. Voulez-vous quand même l\'ajouter ? (oui/non): ', answer => {
        resolve(answer.toLowerCase() === 'oui' || answer.toLowerCase() === 'o' || answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
      });
    });
    
    rl.close();
    
    if (!proceed) {
      console.log('Ajout annulé.');
      return false;
    }
  }
  
  // Vérifier que le niveau et la catégorie existent
  const categoryDir = path.join(__dirname, 'src', 'data', 'vocabulary', level, 'categories');
  
  if (!fs.existsSync(categoryDir)) {
    console.error(`Le dossier ${categoryDir} n'existe pas.`);
    return false;
  }
  
  const categoryFile = path.join(categoryDir, `${category}.js`);
  
  if (!fs.existsSync(categoryFile)) {
    console.error(`Le fichier ${categoryFile} n'existe pas.`);
    return false;
  }
  
  // Lire le fichier de la catégorie
  const fileContent = fs.readFileSync(categoryFile, 'utf8');
  
  // Trouver où insérer le nouveau mot
  const wordsArrayMatch = fileContent.match(/words:\s*\[([\s\S]*?)\]\s*}/);
  
  if (!wordsArrayMatch) {
    console.error(`Impossible de trouver le tableau "words" dans le fichier ${categoryFile}`);
    return false;
  }
  
  // Créer l'entrée du nouveau mot
  let newWordEntry;
  if (example) {
    newWordEntry = `\n    { word: "${word}", translation: "${translation}", example: "${example}" },`;
  } else {
    newWordEntry = `\n    { word: "${word}", translation: "${translation}" },`;
  }
  
  // Insérer le nouveau mot
  let newContent = fileContent;
  const insertPosition = wordsArrayMatch.index + wordsArrayMatch[0].indexOf('[') + 1;
  
  newContent = newContent.slice(0, insertPosition) + newWordEntry + newContent.slice(insertPosition);
  
  // Écrire le fichier mis à jour
  fs.writeFileSync(categoryFile, newContent);
  
  console.log(`✅ Le mot "${word}" a été ajouté avec succès dans ${level}/${category}.js`);
  
  return true;
}

// Fonction pour afficher des exemples de doublons
async function showDuplicateExamples() {
  console.log('Analyse en cours pour identifier des exemples de doublons...');
  
  const { globalIndex } = await createGlobalWordIndex();
  
  // Trouver des exemples de doublons
  const internalDups = [];    // Doublons dans un même fichier
  const sameLevelDups = [];   // Doublons entre fichiers d'un même niveau
  const crossLevelDups = [];  // Doublons entre niveaux
  
  globalIndex.forEach((occurrences, word) => {
    if (occurrences.length <= 1) return;
    
    // Regrouper par fichier et niveau
    const byFile = {};
    const byLevel = {};
    
    occurrences.forEach(occ => {
      const fileKey = `${occ.level}/${occ.category}`;
      
      if (!byFile[fileKey]) byFile[fileKey] = 0;
      byFile[fileKey]++;
      
      if (!byLevel[occ.level]) byLevel[occ.level] = new Set();
      byLevel[occ.level].add(occ.category);
    });
    
    // Vérifier les doublons internes (même fichier)
    Object.entries(byFile).forEach(([fileKey, count]) => {
      if (count > 1) {
        internalDups.push({
          word,
          file: fileKey,
          count
        });
      }
    });
    
    // Vérifier les doublons entre fichiers d'un même niveau
    Object.entries(byLevel).forEach(([level, categories]) => {
      if (categories.size > 1) {
        sameLevelDups.push({
          word,
          level,
          files: Array.from(categories).sort()
        });
      }
    });
    
    // Vérifier les doublons entre niveaux
    if (Object.keys(byLevel).length > 1) {
      crossLevelDups.push({
        word,
        levels: Object.keys(byLevel).sort()
      });
    }
  });
  
  // Trier et limiter le nombre d'exemples
  const limit = 10;
  
  internalDups.sort((a, b) => a.word.localeCompare(b.word));
  sameLevelDups.sort((a, b) => a.word.localeCompare(b.word));
  crossLevelDups.sort((a, b) => {
    if (b.levels.length !== a.levels.length) {
      return b.levels.length - a.levels.length;
    }
    return a.word.localeCompare(b.word);
  });
  
  // Afficher les exemples
  console.log('\n='.repeat(80));
  console.log('EXEMPLES DE DOUBLONS');
  console.log('='.repeat(80));
  
  console.log('\n1. DOUBLONS INTERNES AUX FICHIERS');
  console.log('-'.repeat(80));
  if (internalDups.length === 0) {
    console.log('Aucun doublon interne trouvé.');
  } else {
    internalDups.slice(0, limit).forEach(dup => {
      console.log(`"${dup.word}" apparaît ${dup.count} fois dans le fichier ${dup.file}`);
    });
    
    if (internalDups.length > limit) {
      console.log(`... et ${internalDups.length - limit} autres exemples.`);
    }
  }
  
  console.log('\n2. DOUBLONS ENTRE FICHIERS D\'UN MÊME NIVEAU');
  console.log('-'.repeat(80));
  if (sameLevelDups.length === 0) {
    console.log('Aucun doublon entre fichiers d\'un même niveau trouvé.');
  } else {
    sameLevelDups.slice(0, limit).forEach(dup => {
      console.log(`"${dup.word}" apparaît dans plusieurs fichiers du niveau ${dup.level}:`);
      dup.files.forEach(file => console.log(`  - ${file}`));
    });
    
    if (sameLevelDups.length > limit) {
      console.log(`... et ${sameLevelDups.length - limit} autres exemples.`);
    }
  }
  
  console.log('\n3. DOUBLONS ENTRE DIFFÉRENTS NIVEAUX');
  console.log('-'.repeat(80));
  if (crossLevelDups.length === 0) {
    console.log('Aucun doublon entre niveaux trouvé.');
  } else {
    crossLevelDups.slice(0, limit).forEach(dup => {
      console.log(`"${dup.word}" apparaît dans ${dup.levels.length} niveaux: ${dup.levels.join(', ')}`);
    });
    
    if (crossLevelDups.length > limit) {
      console.log(`... et ${crossLevelDups.length - limit} autres exemples.`);
    }
  }
  
  return {
    internalDups,
    sameLevelDups,
    crossLevelDups
  };
}

// Fonction pour calculer les statistiques des doublons
async function calculateDuplicateStats() {
  console.log('Analyse des doublons en cours...');
  const { globalIndex, allFileData } = await createGlobalWordIndex();
  
  // Compter les doublons par type
  const stats = {
    totalUniqueWords: globalIndex.size,
    internalDuplicates: 0,           // Doublons internes aux fichiers
    sameLevelDuplicates: 0,          // Mots dupliqués entre fichiers d'un même niveau
    crossLevelDuplicates: 0,         // Mots apparaissant dans plusieurs niveaux
    totalDuplicateInstances: 0       // Nombre total d'instances de doublons à supprimer
  };
  
  // Structure pour suivre les doublons par niveau et les fichiers
  const duplicatesByLevel = {};
  const levelCategories = {};
  
  // Initialiser les compteurs par niveau
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  levels.forEach(level => {
    duplicatesByLevel[level] = {
      internal: 0,        // Doublons internes
      betweenFiles: 0     // Doublons entre fichiers
    };
    levelCategories[level] = new Set();
  });
  
  // Compter d'abord tous les fichiers par niveau indépendamment des doublons
  allFileData.forEach(fileData => {
    if (fileData.level && levels.includes(fileData.level)) {
      levelCategories[fileData.level].add(fileData.category);
    }
  });
  
  // Analyser chaque mot et ses occurrences
  globalIndex.forEach((occurrences, word) => {
    // Compter le nombre total d'occurrences à supprimer
    if (occurrences.length > 1) {
      stats.totalDuplicateInstances += occurrences.length - 1;
      
      // Regrouper par niveau et fichier
      const byLevel = {};
      const byFile = {};
      
      occurrences.forEach(occ => {
        // Pour le suivi par niveau
        if (!byLevel[occ.level]) {
          byLevel[occ.level] = [];
        }
        byLevel[occ.level].push(occ);
        
        // Pour le suivi par fichier
        const fileKey = `${occ.level}/${occ.category}`;
        if (!byFile[fileKey]) {
          byFile[fileKey] = 0;
        }
        byFile[fileKey]++;
      });
      
      // Vérifier les doublons internes aux fichiers
      Object.values(byFile).forEach(count => {
        if (count > 1) {
          stats.internalDuplicates += count - 1;
          
          // Ajouter au niveau correspondant
          Object.keys(byLevel).forEach(level => {
            const filesInLevel = byLevel[level].map(o => o.category);
            const uniqueFiles = new Set(filesInLevel);
            
            // Si moins de fichiers uniques que d'occurrences, il y a des doublons internes
            if (uniqueFiles.size < filesInLevel.length) {
              duplicatesByLevel[level].internal += filesInLevel.length - uniqueFiles.size;
            }
          });
        }
      });
      
      // Vérifier les doublons entre fichiers du même niveau
      Object.keys(byLevel).forEach(level => {
        const filesWithOccurrence = byLevel[level].map(o => o.category);
        const uniqueFiles = new Set(filesWithOccurrence);
        
        // S'il y a plusieurs fichiers différents avec ce mot dans le même niveau
        if (uniqueFiles.size > 1) {
          duplicatesByLevel[level].betweenFiles += 1; // Compter le mot, pas les occurrences
          stats.sameLevelDuplicates += 1;
        }
      });
      
      // Vérifier les doublons entre niveaux
      if (Object.keys(byLevel).length > 1) {
        stats.crossLevelDuplicates += 1; // Compter le mot, pas les occurrences
      }
    }
  });
  
  return {
    stats,
    duplicatesByLevel,
    levelCategories,
    levels
  };
}

// Fonction pour afficher les statistiques
async function displayDuplicateStats() {
  const { stats, duplicatesByLevel, levelCategories, levels } = await calculateDuplicateStats();
  
  // Afficher les résultats
  console.log('\n='.repeat(80));
  console.log('STATISTIQUES DES DOUBLONS');
  console.log('='.repeat(80));
  console.log(`\nNombre total de mots uniques: ${stats.totalUniqueWords}`);
  console.log(`Nombre total d'occurrences de doublons: ${stats.totalDuplicateInstances}`);
  console.log("\nRépartition des doublons:");
  console.log(`- Doublons internes aux fichiers: ${stats.internalDuplicates}`);
  console.log(`- Doublons entre fichiers d'un même niveau: ${stats.sameLevelDuplicates}`);
  console.log(`- Mots apparaissant dans plusieurs niveaux: ${stats.crossLevelDuplicates}`);
  
  console.log('\nDétail par niveau:');
  console.log('-'.repeat(80));
  
  let totalCategories = 0;
  
  levels.forEach(level => {
    const categoryCount = levelCategories[level].size;
    totalCategories += categoryCount;
    
    console.log(`${level.padEnd(5, ' ')}: ${duplicatesByLevel[level].internal} doublons internes, ${duplicatesByLevel[level].betweenFiles} doublons entre fichiers (${categoryCount} fichiers)`);
  });
  
  console.log('\nNombre total de fichiers de vocabulaire: ' + totalCategories);
  
  return stats;
}

// Interface CLI
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (command === 'clean' || command === 'clean-duplicates') {
    // Supprimer les doublons
    await removeDuplicates();
  } else if (command === 'check') {
    // Vérifier si un mot existe
    if (args.length < 2) {
      console.log('Usage: node vocabulary_manager.js check "word"');
      return;
    }
    
    const word = args[1];
    await checkWordExists(word);
  } else if (command === 'add') {
    // Ajouter un nouveau mot
    if (args.length < 5) {
      console.log('Usage: node vocabulary_manager.js add "word" "translation" level category [example]');
      console.log('Exemple: node vocabulary_manager.js add "hello" "bonjour" A1 01_basics "Hello, how are you?"');
      return;
    }
    
    const word = args[1];
    const translation = args[2];
    const level = args[3];
    const category = args[4];
    const example = args.length > 5 ? args[5] : "";
    
    await addNewWord(word, translation, level, category, example);
  } else if (command === 'stats') {
    // Afficher les statistiques sur les doublons
    await displayDuplicateStats();
  } else if (command === 'examples' || command === 'show-duplicates') {
    // Afficher des exemples de doublons
    await showDuplicateExamples();
  } else {
    // Afficher l'aide
    console.log('GESTIONNAIRE DE VOCABULAIRE');
    console.log('='.repeat(40));
    console.log('\nCommandes disponibles:');
    console.log('  clean              - Supprimer tous les doublons');
    console.log('  check "word"       - Vérifier si un mot existe déjà');
    console.log('  stats              - Afficher les statistiques des doublons');
    console.log('  examples           - Afficher des exemples de doublons');
    console.log('  add "word" "translation" level category [example] - Ajouter un nouveau mot');
    console.log('\nExemples:');
    console.log('  node vocabulary_manager.js clean');
    console.log('  node vocabulary_manager.js check "hello"');
    console.log('  node vocabulary_manager.js stats');
    console.log('  node vocabulary_manager.js examples');
    console.log('  node vocabulary_manager.js add "hello" "bonjour" A1 01_basics "Hello, how are you?"');
  }
}

// Lancer le programme
if (require.main === module) {
  main().catch(error => {
    console.error('Erreur:', error);
  });
}

module.exports = {
  checkWordExists,
  addNewWord,
  removeDuplicates,
  displayDuplicateStats
};