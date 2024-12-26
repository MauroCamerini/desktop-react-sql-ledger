# Project Architecture

## Overview

### `.`: Configuration files
- `package.json`: Contains project settings, including dependencies and scripts.
- `forge.config.json`: Electron Forge configuration, primarily used to set application entry points and packaging options.
- `webpack.rules.js`: Defines Webpack configurations applied to both Main and Renderer processes.
- `webpack.renderer.config.js`: Configures Webpack for the Renderer process, with key support for React's JSX files.
- `webpack.main.config.js`: Establishes the entry point and settings for the Main process.
- `docs/`: Contains project documentation and related assets.
- `node_modules/`: Stores project dependencies installed via npm.

### `src`: Source code
- `common/`: Shared source files that rely only on Node.js APIs. Code here is reusable across Main, Renderer, and other contexts.
- `main/`: Source files specific to the Main process, utilizing Electron’s main-process APIs. Files in this folder can also use `common` source code.
- `renderer/`: Frontend source files specific to the Renderer process, leveraging Electron renderer-process APIs. These files can use `common` source code as needed.

Do not include files from `main/`in `renderer/`files and vicebersa, the two directories modules run in isolated processes and only communicate via IPC.

## Introduction 

The application is a desktop application built with web technologies like HTML, CSS, and JavaScript. It relies on three main components:

### Main Process
The Main Process has full access to Node.js and the operating system. It manages the application lifecycle and Inter-Process Communication (IPC). It initializes after the `app.whenReady()` event, where it:
- Sets up the database.
- Creates the main application window to host the Renderer process.

#### [Main process full description](main.md)

### Renderer Process
The Renderer Process runs in a browser-like environment. It renders the user interface using HTML, CSS, and JavaScript. While it has limited direct access to the system, the `preload.js` script bridges the gap by exposing a `window.api` object. This object allows secure IPC calls to the Main Process. The `index.js` file initializes the React app, which powers the UI.

### Database
The database is stored in `/database.db` and managed with `better-sqlite3`. It employs:
- **Check constraints**: To validate data integrity.
- **Foreign keys**: To enforce relationships between tables.
- **Triggers**: To automate consistency and business logic.

These measures ensure robust and consistent data handling within the application.

#### [Database full description](database.md)
