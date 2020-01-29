const entryPlus = require('webpack-entry-plus');
const glob = require('glob');
const path = require('path');

module.exports = env => {
  let watchPath = env.dir || './';
  if ( watchPath[0] !== '/' ) watchPath = path.resolve( __dirname, watchPath );
  if ( watchPath.slice(-1) !== '/' ) watchPath += '/';
  const entryReg  = [
    {
      entryFiles: glob.sync( `${watchPath}**/*.es6.js` ),
      outputName(item) {
        let newName = item.replace( 'es6.js', 'ie-compat.js' );
        return newName.replace( watchPath, '' );
      }
    }
  ]
  return {
    entry: entryPlus( entryReg ),
    mode:'development',
    output: {
      path: watchPath, // path.resolve( __dirname, "../../platform/wp-content/plugins/"),
      publicPath: watchPath, //'../../platform/wp-content/plugins/',
      filename: '[name]',
    },
    resolve: {
      modules: [path.resolve( __dirname, 'node_modules')]
    },
    module: {
      rules: [{
        test: /\.es6.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }]
    },
  }
};
