const fs = require("fs");
const path = require("path");

// Chemin vers le dossier des catégories
const categoriesDir = path.join(__dirname, "categories");

// Récupération des fichiers .js, triés par nom
const files = fs
  .readdirSync(categoriesDir)
  .filter((f) => f.endsWith(".js"))
  .sort();

// Création des lignes d'importation et du tableau des modules
let imports = "";
let names = [];

// Traitement de chaque fichier
files.forEach((file) => {
  const base = file.replace(".js", "");

  // Création d'un identifiant valide pour JavaScript (sans chiffres au début)
  let varName;
  if (/^\d/.test(base)) {
    // Si le nom commence par un chiffre, on extrait la partie après le underscore
    const parts = base.split("_");
    if (parts.length > 1) {
      varName = parts.slice(1).join("_"); // Prend tout après le premier underscore
    } else {
      // Si pas d'underscore, on préfixe avec "cat_"
      varName = "cat_" + base;
    }
  } else {
    // Le nom ne commence pas par un chiffre, on peut l'utiliser tel quel
    varName = base;
  }

  // Important: Importer directement la propriété vocab du module
  imports += `import { vocab as ${varName} } from "./categories/${base}.js";\n`;
  names.push(varName);
});

// Génération du contenu complet du fichier
const content =
  imports +
  "\nexport default {\n  exercises: [\n    " +
  names.join(",\n    ") +
  "\n  ],\n};\n";

// Écriture dans le fichier index.js
fs.writeFileSync(path.join(__dirname, "index.js"), content, "utf8");


