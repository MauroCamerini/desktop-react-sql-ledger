# Desktop React SQL Ledger

Desktop React SQL Ledger is a portable desktop app to track income and expenses. Built with **Electron**, **React**, and **SQLite**.
*[Versión en español](/docs/es/readme.md)*

## Features
- **Transaction Management**: Add, view, and manage financial transactions with ease.
- **Local Storage**: Utilizes a SQLite database for fast, reliable local data storage.
- **Cross-Platform**: Built with Electron to run seamlessly on Windows, macOS, and Linux.
- **User-Friendly UI:** Built with React, featuring React Router, Forms, and Bootstrap for a clean, smooth experience.

## Main Tech Stack
- **Electron**: Bridges web technologies with native desktop capabilities, making it possible to run this app as a standalone application on multiple operating systems. [:link:](https://nodejs.org/)
- **Better SQLite3**: Powers the app's database operations stored in a file. [:link:](https://nodejs.org/)
- **React**: Builds the user interface in the Render Process. [:link:](https://react.dev/)

*[See full tech stack here](/docs/techstack.md)*

## Getting Started
### Prerequisites
- [Node.js](https://nodejs.org/en/download/package-manager "Node.js") and [npm](https://www.npmjs.com/ "npm") installed on your machine.

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/MauroCamerini/desktop-react-sql-ledger.git
   ```
2. Navigate to the project directory:
   ```bash
   cd desktop-react-sql-ledger
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the application:
   ```bash
   npm start
   ```

### Documentation
- [Architecture Details](/docs/architecture.md)
- [Full tech stack](/docs/techstack.md)
- [Frequently Asked Questions](/docs/faq.md)
- [Project Setup](/docs/projectsetup.md)

### Current Status
The application enables users to add new entries through a validated form and view existing entries with filtering and pagination functionality. These features—forms, filtering, pagination, and data loading—are implemented using template components, making it relatively easy to add new features (e.g., editing another table). Key upcoming features include delete and update functionalities, exporting/importing to Excel, and dynamically generated queries for generating reports.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
