const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

module.exports = {
  entry: {
    app: Path.resolve(__dirname, '../src/scripts/index.js'),
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/[name].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|webp|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new ZipPlugin({
      // OPTIONAL: defaults to the Webpack output path (above)
      // can be relative (to Webpack output path) or absolute
      path: 'zip',

      // OPTIONAL: defaults to the Webpack output filename (above) or,
      // if not present, the basename of the path
      filename: 'my_app.zip',

      // OPTIONAL: defaults to 'zip'
      // the file extension to use instead of 'zip'
      extension: 'zip',

      // OPTIONAL: defaults to the empty string
      // the prefix for the files included in the zip file
      pathPrefix: '',

      // OPTIONAL: defaults to the identity function
      // a function mapping asset paths to new paths
      // pathMapper: function (assetPath) {
      //   // put all pngs in an `images` subdir
      //   if (assetPath.endsWith('.png'))
      //     return Path.join(Path.dirname(assetPath), Path.basename(assetPath));
      //   return assetPath;
      // },

      // OPTIONAL: defaults to including everything
      // can be a string, a RegExp, or an array of strings and RegExps
      include: [/\.js$/, /\.png$/, /\.html$/, /\.jpg$/, /\.ttf$/, /\.woff$/, /\.woff2$/, /\.svg$/, /\.ico$/, /\.jpeg$/, /\.gif$/, /\.webp$/, /\.css$/],
      // ico|jpg|jpeg|png|gif|webp|svg
      // OPTIONAL: defaults to excluding nothing
      // can be a string, a RegExp, or an array of strings and RegExps
      // if a file matches both include and exclude, exclude takes precedence
      // exclude: [/\.png$/, /\.html$/],

      // yazl Options

      // OPTIONAL: see https://github.com/thejoshwolfe/yazl#addfilerealpath-metadatapath-options
      fileOptions: {
        mtime: new Date(),
        mode: 0o100664,
        compress: true,
        forceZip64Format: false,
      },

      // OPTIONAL: see https://github.com/thejoshwolfe/yazl#endoptions-finalsizecallback
      zipOptions: {
        forceZip64Format: false,
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({ patterns: [{ from: Path.resolve(__dirname, '../src/media'), to: 'media' }] }),
    new CopyWebpackPlugin({ patterns: [{ from: Path.resolve(__dirname, '../src/fonts'), to: 'fonts' }] }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: Path.resolve(__dirname, '../src/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'test.html',
      template: Path.resolve(__dirname, '../src/test.html'),
    }),
  ],
};
