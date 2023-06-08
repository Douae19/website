const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: './src/main.js', // Fichier d'entrée de votre application
  output: {
    path: path.resolve(__dirname, 'dist'), // Dossier de sortie pour les fichiers compilés
    filename: 'bundle.js' // Nom du fichier de sortie
  },
  module: {
    rules: [
      {
        test: /\.vue$/, // Règle pour traiter les fichiers .vue
        loader: 'vue-loader'
      },
      {
        test: /\.js$/, // Règle pour traiter les fichiers .js
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin() // Plugin VueLoaderPlugin pour traiter les fichiers .vue
  ]
};
