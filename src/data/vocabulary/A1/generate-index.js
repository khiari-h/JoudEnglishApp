const fs = require("fs");
const path = require("path");

const categoriesDir = path.join(__dirname, "categories");
const files = fs
  .readdirSync(categoriesDir)
  .filter((f) => f.endsWith(".js"))
  .sort();

let imports = "";
let names = [];

files.forEach((file) => {
  const base = file.replace(".js", "");

  // Extraction d'un identifiant valide à partir du nom de fichier
  // Si le nom commence par des chiffres (01_identite), on prend la partie après le underscore
  // sinon on utilise le nom tel quel
  let varName;
  if (/^\d/.test(base)) {
    // Le fichier commence par un chiffre, on extrait la partie après le underscore
    const parts = base.split("_");
    if (parts.length > 1) {
      varName = parts.slice(1).join("_"); // Prend tout après le premier underscore
    } else {
      // Si pas de underscore, on préfixe avec "module_"
      varName = "module_" + base;
    }
  } else {
    // Le fichier ne commence pas par un chiffre, on peut utiliser son nom directement
    varName = base;
  }

  imports += `import ${varName} from "./categories/${base}.js";\n`;
  names.push(varName);
});

const content =
  imports +
  "\nexport default {\n  exercises: [\n    " +
  names.join(",\n    ") +
  "\n  ],\n};\n";

fs.writeFileSync(path.join(__dirname, "index.js"), content, "utf8");
console.log("index.js généré avec", files.length, "fichiers.");
