const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const deps = require("./package.json").dependencies;

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3001,
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:3001/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'eventApp',
      filename: 'remoteEntry.js',
      exposes: {
        './Event': './src/App.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};