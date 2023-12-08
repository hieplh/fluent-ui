const path = require('path');
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const GenerateVersionPlugin = require('./build/GenerateVersionPlugin');
const GenerateManifestsPlugin = require('./build/GenerateManifestsPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config: Configuration = {

  // webpack will take the files from ./src/index
  entry: './src/index',

  devServer: {
    allowedHosts: 'all',
    static: {
      directory: path.resolve(__dirname, 'dist'),
      watch: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },

  // and output it into /dist as bundle.js
  output: {
    path: path.join(__dirname, '/dist'),
    clean: true,
    filename: 'bundle.[contenthash].js',
  },

  // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [

      // we use babel-loader to load our jsx and tsx files
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000, // Convert images < 8kb to base64 strings
            name: 'images/[hash]-[name].[ext]',
          },
        }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'i18n/locales',
          to: path.join(__dirname, 'dist/i18n'),
        },
      ],
    }),
    new GenerateVersionPlugin(),
    new GenerateManifestsPlugin(),
  ],

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  externals: [{
    'react': 'React',
    'react-dom': 'ReactDOM',
    '@emotion/react': 'emotionReact',
  },
  externalMaterialUI,
  externalMystique,
  ],
};

/** re-route material-ui imports to the global UMD import */
export function externalMaterialUI (_: any, module: any, callback: any): any {
  if (module === '@material-ui/core') {
    return callback(null, `window["MaterialUI"]`);
  }

  const isMaterialUIComponent = /^@material-ui\/core\/.+$/;
  const match = isMaterialUIComponent.exec(module);
  if (match !== null) {
    const parts = module.split('/');
    const component = parts[parts.length - 1];
    if (component === 'styles') { // these appear to be flattened out in the ESM version
      return callback(null, `window["MaterialUI"]`);
    }
    return callback(null, `window["MaterialUI"].${component}`);
  }
  callback();
}

/** re-route mystique imports to the global object */
export function externalMystique (_: any, module: any, callback: any): any {
  const isMystiqueComponent = /^mystique\/.+$/;
  const match = isMystiqueComponent.exec(module);
  if (match !== null) {
    return callback(null, `window["Mystique"]`);
  }
  callback();
}

export default config;
