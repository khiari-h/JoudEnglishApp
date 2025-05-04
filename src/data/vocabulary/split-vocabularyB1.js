// Script Node.js à placer à la racine du projet ou à côté de vocabularyA2.js

const fs = require('fs');
const path = require('path');

// Charge le module JS (assure-toi que vocabularyB1.js utilise "module.exports" ou "export default")
const sourcePath = path.join(__dirname, 'vocabularyB1.js');
const outputDir = path.join(__dirname, 'categories');

// Si ES module, utilise import() dynamiquement, sinon require :
let vocabulary;
try {
  vocabulary = require(sourcePath);
} catch (e) {
  throw new Error('Impossible de charger vocabularyB1.js : ' + e.message);
}

const exercises = vocabulary.exercises;
if (!Array.isArray(exercises)) {
  throw new Error('Le fichier ne contient pas de tableau "exercises".');
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

exercises.forEach((exercise) => {
  const id = exercise.id || exercise.title.replace(/\s+/g, '_').toLowerCase();
  const fileName = `${id}.js`;
  const filePath = path.join(outputDir, fileName);

  const fileData = `export default ${JSON.stringify(exercise, null, 2)};\n`;

  fs.writeFileSync(filePath, fileData, 'utf8');
  console.log(`Fichier créé : ${filePath}`);
});

console.log('Découpage terminé.');