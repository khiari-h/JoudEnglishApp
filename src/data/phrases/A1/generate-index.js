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
let imports = "import { CATEGORIES } from './metadata.js';\n";
let varNames = [];
let exportNames = [];

// Traitement de chaque fichier
files.forEach((file) => {
  const base = file.replace(".js", "");
  
  // Conversion de kebab-case en camelCase pour le nom de variable
  const varName = base.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
  
  // Ajout des imports default
  imports += `import ${varName} from "./categories/${base}.js";\n`;
  varNames.push(varName);
  exportNames.push(varName);
});

// Génération du contenu du fichier index
const content = `${imports}

const phrasesA1 = {
  categories: CATEGORIES,
  phrases: [
    ${varNames.map(name => `...${name}`).join(',\n    ')}
  ]
};

export default phrasesA1;
export { 
  ${exportNames.join(',\n  ')}
};
`;

// Écriture dans le fichier index.js
fs.writeFileSync(path.join(__dirname, "index.js"), content, "utf8");
console.log("index.js généré avec", files.length, "fichiers de catégories.");