const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Fonction pour extraire tous les mots d'un niveau
async function extractLevelVocabulary(level) {
  const categoryDir = path.join(__dirname, 'src', 'data', 'vocabulary', level, 'categories');
  
  if (!fs.existsSync(categoryDir)) {
    console.error(`Le dossier ${categoryDir} n'existe pas.`);
    return { words: [], categories: [] };
  }

  const files = fs.readdirSync(categoryDir).filter(file => file.endsWith('.js'));
  const allWords = [];
  const categories = {};
  
  // Parcourir chaque fichier
  for (const file of files) {
    const filePath = path.join(categoryDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Regex pour extraire le tableau words
    const wordsArrayMatch = fileContent.match(/words:\s*\[([\s\S]*?)\]\s*}/);
    
    if (!wordsArrayMatch) {
      console.error(`Impossible de trouver le tableau "words" dans le fichier ${filePath}`);
      continue;
    }

    // Extraire tous les mots et leurs traductions
    const wordRegex = /{\s*word:\s*"([^"]+)"(?:,\s*translation:\s*"([^"]+)")?(?:,\s*example:\s*"([^"]+)")?[^}]*}/g;
    let wordMatch;
    const wordsInFile = [];
    
    while ((wordMatch = wordRegex.exec(wordsArrayMatch[1])) !== null) {
      const word = wordMatch[1];
      const translation = wordMatch[2] || '';
      const example = wordMatch[3] || '';
      
      allWords.push({
        word,
        translation,
        example,
        category: file.replace('.js', '')
      });
      
      wordsInFile.push(word);
    }
    
    // Stocker les mots par catégorie
    const categoryName = file.replace('.js', '');
    categories[categoryName] = wordsInFile;
  }
  
  return { 
    words: allWords, 
    categories 
  };
}

// Fonction pour analyser la distribution du vocabulaire par catégorie
async function analyzeVocabularyDistribution(level) {
  console.log(`Analyse de la distribution du vocabulaire pour le niveau ${level}...`);
  
  const { words, categories } = await extractLevelVocabulary(level);
  
  if (words.length === 0) {
    console.error(`Aucun mot trouvé pour le niveau ${level}.`);
    return;
  }
  
  // Afficher le résumé
  console.log('\n='.repeat(80));
  console.log(`DISTRIBUTION DU VOCABULAIRE - NIVEAU ${level}`);
  console.log('='.repeat(80));
  console.log(`\nNombre total de mots: ${words.length}`);
  console.log(`Nombre de catégories: ${Object.keys(categories).length}`);
  
  // Afficher la distribution par catégorie
  console.log('\nDistribution par catégorie:');
  console.log('-'.repeat(80));
  
  // Trier les catégories par nombre de mots décroissant
  const sortedCategories = Object.entries(categories)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([category, words]) => ({ 
      category, 
      count: words.length,
      percentage: (words.length / words.length * 100).toFixed(1)
    }));
  
  // Calculer la moyenne de mots par catégorie
  const averageWordsPerCategory = words.length / Object.keys(categories).length;
  
  // Afficher les catégories avec leur nombre de mots
  sortedCategories.forEach(cat => {
    const percentage = (cat.count / words.length * 100).toFixed(1);
    const indicator = cat.count < averageWordsPerCategory * 0.7 ? '⚠️' : 
                     cat.count > averageWordsPerCategory * 1.3 ? '💪' : '✓';
    const bar = '█'.repeat(Math.floor(percentage / 2));
    
    console.log(`${cat.category.padEnd(30, ' ')} : ${cat.count.toString().padEnd(3, ' ')} mots (${percentage}%) ${bar} ${indicator}`);
  });
  
  // Identifier les catégories qui ont besoin d'être complétées
  const categoriesToComplete = sortedCategories
    .filter(cat => cat.count < averageWordsPerCategory * 0.7)
    .map(cat => cat.category);
  
  if (categoriesToComplete.length > 0) {
    console.log('\nCatégories à compléter en priorité:');
    console.log('-'.repeat(80));
    categoriesToComplete.forEach(category => {
      console.log(`- ${category}`);
    });
  }
  
  return {
    level,
    totalWords: words.length,
    categories: sortedCategories,
    categoriesToComplete
  };
}

// Fonction pour comparer avec les références CECR
async function compareWithCEFRStandards(level) {
  // Références approximatives du nombre de mots par niveau CECR
  const cefrStandards = {
    'A1': 1000,
    'A2': 2000,
    'B1': 3000,
    'B2': 4500,
    'C1': 8000,
    'C2': 16000
  };
  
  // Thèmes standards attendus par niveau
  const expectedThemes = {
    'A1': [
      'identité', 'famille', 'nombres', 'temps', 'maison', 'nourriture',
      'vêtements', 'activités quotidiennes', 'lieux', 'transports'
    ],
    'A2': [
      'loisirs', 'achats', 'météo', 'voyages', 'travail', 'santé', 
      'école', 'animaux', 'services', 'communication'
    ],
    'B1': [
      'médias', 'environnement', 'technologie', 'sentiments', 'émotions',
      'professions', 'éducation', 'opinions', 'culture', 'sports'
    ],
    'B2': [
      'politique', 'économie', 'société', 'arts', 'sciences',
      'littérature', 'histoire', 'débats', 'problèmes sociaux', 'monde du travail'
    ],
    'C1': [
      'abstractions', 'discussions académiques', 'nuances linguistiques',
      'humour', 'expressions idiomatiques', 'droits', 'éthique', 'philosophie',
      'recherche', 'systèmes'
    ],
    'C2': [
      'spécialisations professionnelles', 'théories complexes',
      'subtilités culturelles', 'discours spécialisés', 'légal', 'médical',
      'scientifique', 'littérature avancée', 'analyse critique'
    ]
  };
  
  const { words, categories } = await extractLevelVocabulary(level);
  
  // Standard pour ce niveau
  const standardWordCount = cefrStandards[level] || 0;
  const expectedThemesForLevel = expectedThemes[level] || [];
  
  // Calcul du pourcentage de complétion
  const completionPercentage = (words.length / standardWordCount * 100).toFixed(1);
  
  // Vérifier les thèmes manquants
  const existingThemes = Object.keys(categories).map(cat => {
    // Convertir la catégorie au format du fichier (01_identite.js) en thème (identité)
    const themeName = cat.replace(/^\d+_/, '').replace(/_/g, ' ');
    return themeName;
  });
  
  const missingThemes = expectedThemesForLevel.filter(theme => 
    !existingThemes.some(existing => 
      existing.includes(theme) || theme.includes(existing)
    )
  );
  
  // Afficher les résultats
  console.log('\n='.repeat(80));
  console.log(`COMPARAISON AVEC LES STANDARDS CECR - NIVEAU ${level}`);
  console.log('='.repeat(80));
  
  console.log(`\nObjectif CECR pour ${level}: environ ${standardWordCount} mots`);
  console.log(`Vocabulaire actuel: ${words.length} mots (${completionPercentage}% de l'objectif)`);
  console.log(`Mots restants à ajouter: ${Math.max(0, standardWordCount - words.length)}`);
  
  if (missingThemes.length > 0) {
    console.log('\nThèmes potentiellement manquants:');
    console.log('-'.repeat(80));
    missingThemes.forEach(theme => {
      console.log(`- ${theme}`);
    });
    console.log('\nNote: Cette détection est approximative, vérifiez si ces thèmes sont couverts sous d\'autres noms.');
  }
  
  return {
    level,
    standardWordCount,
    currentWordCount: words.length,
    completionPercentage,
    wordsToAdd: Math.max(0, standardWordCount - words.length),
    missingThemes
  };
}

// Fonction pour suggérer des mots à ajouter
async function suggestWordsToAdd(level, category) {
  // Dans une version plus avancée, cette fonction pourrait:
  // 1. Consulter une base de données de fréquence des mots en anglais
  // 2. Récupérer les mots déjà présents dans le niveau
  // 3. Suggérer des mots fréquents qui ne sont pas encore présents, adaptés au niveau
  
  console.log('\n='.repeat(80));
  console.log(`SUGGESTIONS DE MOTS À AJOUTER - NIVEAU ${level}, CATÉGORIE ${category}`);
  console.log('='.repeat(80));
  
  console.log('\nPour générer des suggestions pertinentes, nous aurions besoin:');
  console.log('1. D\'une base de données de fréquence des mots anglais');
  console.log('2. D\'une liste de vocabulaire standard par niveau CECR');
  console.log('3. Des thèmes précis couverts par chaque catégorie');
  
  console.log('\nDémarche recommandée:');
  console.log('1. Analyser les mots manquants avec un linguiste ou enseignant');
  console.log('2. Consulter des ressources de vocabulaire par niveau CECR (Cambridge, Oxford, etc.)');
  console.log('3. Utiliser la commande suivante pour ajouter des mots sans créer de doublons:');
  console.log(`   node vocabulary_manager.js add "nouveau mot" "traduction" ${level} ${category} "exemple d'utilisation"`);
  
  // Pseudo-exemple de suggestion (à remplacer par une vraie analyse)
  console.log('\nExemples de mots qui pourraient être ajoutés (selon le niveau et la catégorie):');
  
  // Simuler quelques suggestions selon le niveau
  const suggestions = [];
  if (level === 'A1') {
    suggestions.push(
      { word: "apple", translation: "pomme" },
      { word: "pen", translation: "stylo" },
      { word: "friend", translation: "ami" }
    );
  } else if (level === 'B1') {
    suggestions.push(
      { word: "environment", translation: "environnement" },
      { word: "opinion", translation: "opinion" },
      { word: "achievement", translation: "réussite" }
    );
  } else if (level === 'C1') {
    suggestions.push(
      { word: "endeavor", translation: "entreprise, tentative" },
      { word: "paradigm", translation: "paradigme" },
      { word: "subsequent", translation: "ultérieur, subséquent" }
    );
  }
  
  if (suggestions.length > 0) {
    console.log('-'.repeat(80));
    suggestions.forEach(sugg => {
      console.log(`"${sugg.word}" - "${sugg.translation}" (vérifiez d'abord s'il existe déjà)`);
    });
  }
}

// Interface en ligne de commande
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (command === 'analyze' || command === 'analyse') {
    // Analyser la distribution du vocabulaire
    if (args.length < 2) {
      console.log('Usage: node vocabulary_analyzer.js analyze <A1|A2|B1|B2|C1|C2>');
      return;
    }
    
    const level = args[1].toUpperCase();
    
    // Valider le niveau
    const validLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    if (!validLevels.includes(level)) {
      console.error(`Niveau invalide: ${level}. Utilisez un des niveaux suivants: ${validLevels.join(', ')}`);
      return;
    }
    
    await analyzeVocabularyDistribution(level);
  } else if (command === 'compare') {
    // Comparer avec les standards CECR
    if (args.length < 2) {
      console.log('Usage: node vocabulary_analyzer.js compare <A1|A2|B1|B2|C1|C2>');
      return;
    }
    
    const level = args[1].toUpperCase();
    
    // Valider le niveau
    const validLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    if (!validLevels.includes(level)) {
      console.error(`Niveau invalide: ${level}. Utilisez un des niveaux suivants: ${validLevels.join(', ')}`);
      return;
    }
    
    await compareWithCEFRStandards(level);
  } else if (command === 'suggest') {
    // Suggérer des mots à ajouter
    if (args.length < 3) {
      console.log('Usage: node vocabulary_analyzer.js suggest <A1|A2|B1|B2|C1|C2> <category>');
      console.log('Exemple: node vocabulary_analyzer.js suggest A1 01_identite');
      return;
    }
    
    const level = args[1].toUpperCase();
    const category = args[2];
    
    // Valider le niveau
    const validLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    if (!validLevels.includes(level)) {
      console.error(`Niveau invalide: ${level}. Utilisez un des niveaux suivants: ${validLevels.join(', ')}`);
      return;
    }
    
    await suggestWordsToAdd(level, category);
  } else if (command === 'all') {
    // Analyser tous les niveaux
    console.log('Analyse de tous les niveaux...');
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    
    for (const level of levels) {
      await analyzeVocabularyDistribution(level);
      await compareWithCEFRStandards(level);
      console.log('\n' + '-'.repeat(80));
    }
  } else {
    // Afficher l'aide
    console.log('ANALYSEUR DE VOCABULAIRE');
    console.log('='.repeat(40));
    console.log('\nCommandes disponibles:');
    console.log('  analyze <level>      - Analyser la distribution du vocabulaire');
    console.log('  compare <level>      - Comparer avec les standards CECR');
    console.log('  suggest <level> <cat> - Suggérer des mots à ajouter');
    console.log('  all                  - Analyser tous les niveaux');
    console.log('\nExemples:');
    console.log('  node vocabulary_analyzer.js analyze A1');
    console.log('  node vocabulary_analyzer.js compare B2');
    console.log('  node vocabulary_analyzer.js suggest A1 01_identite');
    console.log('  node vocabulary_analyzer.js all');
  }
}

// Lancer le programme
if (require.main === module) {
  main().catch(error => {
    console.error('Erreur:', error);
  });
}

module.exports = {
  extractLevelVocabulary,
  analyzeVocabularyDistribution,
  compareWithCEFRStandards,
  suggestWordsToAdd
};