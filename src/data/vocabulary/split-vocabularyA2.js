// Script Node.js à placer à la racine du projet ou à côté de vocabularyA2.js

const fs = require('fs');
const path = require('path');

// Lis le fichier source
const sourcePath = path.join(__dirname, 'vocabularyA2.js');
const outputDir = path.join(__dirname, 'vocabularyA2_split');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const fileContent = fs.readFileSync(sourcePath, 'utf8');

// Trouve le tableau principal (exercises ou le tableau racine)
const match = fileContent.match(/exercises\s*:\s*(\[[\s\S]*\])\s*};|^(\[[\s\S]*\]);/m);
let exercisesArray = null;

if (match && match[1]) {
  exercisesArray = match[1];
} else if (match && match[2]) {
  exercisesArray = match[2];
} else {
  throw new Error('Impossible de trouver le tableau des exercices.');
}

// Parse le tableau d’exercices
let exercises;
try {
  // Remplace les guillemets simples par doubles, retire les commentaires JS, etc.
  exercises = eval(exercisesArray);
} catch (e) {
  throw new Error('Erreur lors du parsing du tableau des exercices : ' + e.message);
}

// Pour chaque exercice, crée un fichier séparé
exercises.forEach((exercise) => {
  const id = exercise.id || exercise.title.replace(/\s+/g, '_').toLowerCase();
  const fileName = `${id}.js`;
  const filePath = path.join(outputDir, fileName);

  const fileData = `export default ${JSON.stringify(exercise, null, 2)};\n`;

  fs.writeFileSync(filePath, fileData, 'utf8');
  console.log(`Fichier créé : ${filePath}`);
});

console.log('Découpage terminé.');