#!/bin/bash
export PATH="/c/nvm4w/nodejs:$PATH"

# Vérifier que node est disponible
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas trouvé dans le PATH"
    exit 1
fi

echo "✅ Node.js trouvé: $(node -v)"
echo "🚀 Lancement de Detox..."

# Appeler directement le CLI JavaScript de Detox
node node_modules/detox/lib/src/cli.js "$@"
