const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const GasPlugin = require('gas-webpack-plugin');

const appsPath = path.resolve(__dirname, 'apps')

const targets = fs.readdirSync(appsPath, { withFileTypes: true })
  .filter(path => path.isDirectory() && !path.name.startsWith('.'))
  .map(path => path.name)

const entries = {}
targets.forEach(dirName => {
  entries[dirName] = path.resolve(appsPath, dirName, 'index.ts')
})

module.exports = {
  mode: 'development',
  entry: entries,
  output: {
    path: path.resolve(appsPath),
    filename: "[name]/dist/bundle.js",
  },
  resolve: {
    extensions: [
      '.ts',
      '.js'
    ],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, 'tsconfig.json')
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        ...targets.map(dirName => ({
          from: `apps/${dirName}/**/*.json`,
          to: `${dirName}/dist/[name].[ext]`
        })),
      ]
    }),
    new GasPlugin(),
  ],
};
