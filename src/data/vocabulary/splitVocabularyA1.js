// splitVocabularyA1.js
const fs = require("fs");
const path = require("path");

// Charge le module JS directement
const vocabularyA1 = require("./vocabularyA1.js");

// Récupère les exercices
const exercises = vocabularyA1.exercises;

// Crée le dossier categories s'il n'existe pas
const categoriesDir = path.join(__dirname, "categories");
if (!fs.existsSync(categoriesDir)) {
  fs.mkdirSync(categoriesDir);
}

// Pour chaque catégorie, crée un fichier JS
exercises.forEach((category) => {
  const fileName = `${category.id.replace(/^a1_voc_/, "")}.js`;
  const filePath = path.join(categoriesDir, fileName);
  const fileContent =
    `export default ${JSON.stringify(category, null, 2)};\n`;
  fs.writeFileSync(filePath, fileContent, "utf-8");
  console.log(`Fichier créé : ${fileName}`);
});

console.log("Terminé !");