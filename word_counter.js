const fs = require('fs');
const path = require('path');

// Fonction pour compter les mots dans un fichier JS
async function countWordsInFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Regex pour extraire le tableau words
    const wordsArrayMatch = fileContent.match(/words:\s*\[([\s\S]*?)\]\s*}/);
    
    if (!wordsArrayMatch) {
      console.error(`Impossible de trouver le tableau "words" dans le fichier ${filePath}`);
      return 0;
    }

    // Compter les occurrences de "word:"
    const wordEntries = (wordsArrayMatch[1].match(/word:/g) || []).length;
    return wordEntries;
  } catch (error) {
    console.error(`Erreur lors de la lecture du fichier ${filePath}:`, error.message);
    return 0;
  }
}

// Fonction pour analyser un niveau
async function analyzeLevelVocabulary(level) {
  const categoryDir = path.join(__dirname, 'src', 'data', 'vocabulary', level, 'categories');
  
  if (!fs.existsSync(categoryDir)) {
    console.log(`Le dossier ${categoryDir} n'existe pas.`);
    return { level, totalWords: 0, files: [] };
  }

  const files = fs.readdirSync(categoryDir).filter(file => file.endsWith('.js'));
  const fileStats = [];
  let totalWords = 0;

  for (const file of files) {
    const filePath = path.join(categoryDir, file);
    const wordCount = await countWordsInFile(filePath);
    totalWords += wordCount;
    
    fileStats.push({
      fileName: file,
      wordCount
    });
  }

  return {
    level,
    totalWords,
    files: fileStats
  };
}

// Fonction principale
async function analyzeAllVocabulary() {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const results = [];
  let grandTotal = 0;
  let totalFiles = 0;

  console.log('='.repeat(80));
  console.log('ANALYSE DU VOCABULAIRE PAR NIVEAU');
  console.log('='.repeat(80));

  for (const level of levels) {
    const levelStats = await analyzeLevelVocabulary(level);
    results.push(levelStats);
    grandTotal += levelStats.totalWords;
    totalFiles += levelStats.files.length;
    
    console.log(`\n${level} - Total: ${levelStats.totalWords} mots`);
    console.log('-'.repeat(80));
    
    // Trier les fichiers par ordre alphabétique
    levelStats.files.sort((a, b) => a.fileName.localeCompare(b.fileName));
    
    for (const file of levelStats.files) {
      console.log(`${file.fileName.padEnd(50, ' ')} : ${file.wordCount} mots`);
    }
  }

  console.log('\nRÉSUMÉ PAR NIVEAU:');
  console.log('-'.repeat(80));
  for (const result of results) {
    console.log(`${result.level.padEnd(5, ' ')} : ${result.totalWords} mots (${result.files.length} fichiers)`);
  }

  // Déplacer le total général après le résumé par niveau
  console.log('\n' + '='.repeat(80));
  console.log(`TOTAL GÉNÉRAL: ${grandTotal} mots`);
  console.log('='.repeat(80));

  // Ajout d'un récapitulatif final plus détaillé
  console.log('\nRÉCAPITULATIF FINAL');
  console.log('-'.repeat(80));
  console.log(`Nombre total de mots: ${grandTotal} mots`);
  console.log(`Nombre total de fichiers: ${totalFiles} fichiers`);
  console.log(`Moyenne de mots par niveau: ${Math.round(grandTotal / levels.length)} mots`);
  console.log(`Moyenne de mots par fichier: ${Math.round(grandTotal / totalFiles)} mots`);
  
  // Distribution par niveau en pourcentage
  console.log('\nDistribution du vocabulaire:');
  console.log('-'.repeat(80));
  for (const result of results) {
    const percentage = ((result.totalWords / grandTotal) * 100).toFixed(1);
    const bar = '█'.repeat(Math.floor(percentage / 2)); // Représentation visuelle
    console.log(`${result.level.padEnd(5, ' ')} : ${result.totalWords.toString().padEnd(5, ' ')} mots (${percentage}%) ${bar}`);
  }
}

// Exécuter l'analyse
analyzeAllVocabulary().catch(error => {
  console.error('Erreur lors de l\'analyse:', error);
});