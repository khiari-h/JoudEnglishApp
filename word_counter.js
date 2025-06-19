const fs = require('fs');
const path = require('path');

// Fonction pour extraire les mots d'un fichier JS
async function processFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Regex pour extraire le tableau words
    const wordsArrayMatch = fileContent.match(/words:\s*\[([\s\S]*?)\]\s*}/);
    
    if (!wordsArrayMatch) {
      console.error(`Impossible de trouver le tableau "words" dans le fichier ${filePath}`);
      return { count: 0 };
    }

    // Extraire tous les mots du fichier
    const wordMatches = wordsArrayMatch[1].match(/word:\s*"([^"]+)"/g);
    
    if (!wordMatches) {
      return { count: 0 };
    }

    // Retourner simplement le nombre de mots
    return { count: wordMatches.length };
  } catch (error) {
    console.error(`Erreur lors de la lecture du fichier ${filePath}:`, error.message);
    return { count: 0 };
  }
}

// Fonction pour analyser un niveau
async function countLevelWords(level) {
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
    const result = await processFile(filePath);
    totalWords += result.count;
    
    fileStats.push({
      fileName: file,
      wordCount: result.count
    });
  }

  return {
    level,
    totalWords,
    files: fileStats.sort((a, b) => a.fileName.localeCompare(b.fileName))
  };
}

// Fonction pour afficher le rapport dans la console
function displayLevelReport(levelStats) {
  console.log(`\n${levelStats.level} - Total: ${levelStats.totalWords} mots`);
  console.log('-'.repeat(80));
  
  for (const file of levelStats.files) {
    console.log(`${file.fileName.padEnd(50, ' ')} : ${file.wordCount} mots`);
  }
}

// Fonction pour analyser tous les niveaux
async function countAllVocabulary() {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const results = [];
  let grandTotal = 0;
  let totalFiles = 0;
  
  console.log('='.repeat(80));
  console.log('COMPTAGE DU VOCABULAIRE PAR NIVEAU');
  console.log('='.repeat(80));

  for (const level of levels) {
    console.log(`\nAnalyse du niveau ${level}...`);
    const levelStats = await countLevelWords(level);
    results.push(levelStats);
    grandTotal += levelStats.totalWords;
    totalFiles += levelStats.files.length;
    
    // Afficher le détail du niveau
    displayLevelReport(levelStats);
  }
  
  // Afficher le récapitulatif
  console.log('\nRÉSUMÉ PAR NIVEAU:');
  console.log('-'.repeat(80));
  for (const result of results) {
    console.log(`${result.level.padEnd(5, ' ')} : ${result.totalWords} mots (${result.files.length} fichiers)`);
  }

  console.log('\n' + '='.repeat(80));
  console.log(`TOTAL GÉNÉRAL: ${grandTotal} mots dans ${totalFiles} fichiers`);
  console.log('='.repeat(80));

  // Distribution par niveau en pourcentage
  console.log('\nDistribution du vocabulaire:');
  console.log('-'.repeat(80));
  for (const result of results) {
    const percentage = ((result.totalWords / grandTotal) * 100).toFixed(1);
    const bar = '█'.repeat(Math.floor(percentage / 2)); // Représentation visuelle
    console.log(`${result.level.padEnd(5, ' ')} : ${result.totalWords.toString().padEnd(5, ' ')} mots (${percentage}%) ${bar}`);
  }
  
  return {
    results,
    grandTotal,
    totalFiles
  };
}

// Interface CLI
async function main() {
  const args = process.argv.slice(2);
  let level = null;
  
  // Analyser les arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--level' || args[i] === '-l') {
      level = args[i + 1];
      i++;
    }
  }
  
  if (level) {
    // Analyser un niveau spécifique
    const validLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    if (!validLevels.includes(level)) {
      console.error(`Niveau invalide: ${level}. Utilisez un des niveaux suivants: ${validLevels.join(', ')}`);
      return;
    }
    
    console.log(`Comptage du vocabulaire du niveau ${level}...`);
    const levelStats = await countLevelWords(level);
    displayLevelReport(levelStats);
    
    console.log('\nRÉCAPITULATIF:');
    console.log('-'.repeat(80));
    console.log(`Nombre total de mots: ${levelStats.totalWords} mots`);
    console.log(`Nombre total de fichiers: ${levelStats.files.length} fichiers`);
    console.log(`Moyenne de mots par fichier: ${Math.round(levelStats.totalWords / levelStats.files.length)} mots`);
  } else {
    // Analyser tous les niveaux
    await countAllVocabulary();
  }
}

// Point d'entrée principal
if (require.main === module) {
  main().catch(error => {
    console.error('Erreur:', error);
  });
}

// Exporter les fonctions pour pouvoir les utiliser dans d'autres scripts
module.exports = {
  countLevelWords,
  countAllVocabulary
};