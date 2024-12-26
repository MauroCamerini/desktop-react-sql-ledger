# Project setup
This document explains step by step how the project was configured from scratch at the start. This is for educational porpouse only, for actually installing the project read [Installation](../readme.md#getting-started)

## 1. Create an Electron app with Webpack
Run the following command to create a new Electron app using the Webpack template:
```bash
npx create-electron-app@latest my-new-app --template=webpack
```
## 2. Install required packages
Install the necessary dependencies for Webpack, React, better-sqlite3, and other utilities:
```bash
npm install --save-dev @babel/core @babel/preset-react babel-loader raw-loader
npm install --save react react-dom react-select
npm install react-bootstrap bootstrap react-router better-sqlite3 react-hook-form @hookform/resolvers yup
```
## 3. Set up directory structure
Ensure the project directory structure matches the following:
- /src 
 - /main 
   - /main.js 
 - /renderer 
   - /index.js 
   - /index.html 
   - /preload.js

## 4. Set up the entry point for the main process
In the webpack.main.config.js file, specify the entry point for the Electron main process:
```javascript
  entry: './src/main/main.js',
```
## 5. Set up entry points for the renderer process
In the forge.config.js file, configure the entry points for the renderer process
```javascript
entryPoints: [
{
html: './src/renderer/index.html',
js: './src/renderer/index.js',
name: 'main_window',
preload: {
js: './src/renderer/preload.js',
},
```
## 6. Configure Babel to handle JSX
```javascript
// ./webpack.rules.js
module.exports = [
  // ... existing loader config ...
  {
    test: /\.jsx?$/,
    use: {
      loader: 'babel-loader',
      options: {
        exclude: /node_modules/,
        presets: ['@babel/preset-react']
      }
    }
  }
  // ... existing loader config ...
];
```
## 7. Add .jsx extension resolution
In the webpack.renderer.rules.js file, ensure Webpack resolves .jsx files by adding the extension to the resolve property:
```javascript
// ./webpack.renderer.rules.js
module.exports = {
  // ...
  resolve: {
    extensions: [".jsx", ".js"],
  }
  /...
};
```
## 8. Integrate Bootstrap in the renderer process
To use Bootstrap in the React app, import Bootstrap and its CSS in the src/renderer/index.js file
```javascript
// ./src/renderer/index.js
import bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
```
