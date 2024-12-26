# Desktop React SQL Ledger

Desktop React SQL Ledger es una aplicación portable de escritorio para el control de gastos e ingresos desarrollada con **Electron**, **React**, y **SQLite**.
*[English version](/readme.md)*

## Características
- **Transaction Management**: Add, view, and manage financial transactions with ease.
- **Local Storage**: Utilizes a SQLite database for fast, reliable local data storage.
- **Cross-Platform**: Built with Electron to run seamlessly on Windows, macOS, and Linux.
- **User-Friendly UI:** Built with React, featuring React Router, Forms, and Bootstrap for a clean, smooth experience.

## Main Tech Stack
- **Electron**: Conecta tecnologías web con capacidades nativas de escritorio, permitiendo que esta aplicación funcione como de forma independiente en múltiples sistemas operativos. [:link:](https://nodejs.org/)
- **Better SQLite3**: Maneja las operaciones de la base de datos alojada es un archivo local.  [:link:](https://nodejs.org/)
- **React**: Construye la interfaz de usuario en el proceso de renderizado [:link:](https://react.dev/)

*[Consulta la lista completa de tecnologías aquí](/docs/techstack.md)*

## Comenzar
### Requisitos previos
- Debes tener [Node.js](https://nodejs.org/en/download/package-manager "Node.js") y [npm](https://www.npmjs.com/ "npm") instalados en tu computadora.

### Instalación
1. Clonar este repositorio:
   ```bash
   git clone https://github.com/MauroCamerini/desktop-react-sql-ledger.git
   ```
2. Navegar a la carpeta del proyecto:
   ```bash
   cd desktop-react-sql-ledger
   ```
3. Instalar dependencias:
   ```bash
   npm install
   ```
4. Correr aplicación:
   ```bash
   npm start
   ```
### Documentación (en inglés)
- [Architecture Details](/docs/architecture.md)
- [Full tech stack](/docs/techstack.md)
- [Frequently Asked Questions](/docs/faq.md)
- [Project Setup](/docs/projectsetup.md)

### Estado actual
La aplicación permite a los usuarios agregar nuevas entradas mediante un formulario validado y visualizar las entradas existentes con funciones de filtrado y paginación. Estas funcionalidades—formularios, filtrado, paginación y carga de datos—se implementan utilizando componentes template, lo que facilita la adición de nuevas características (por ejemplo, la edición de otra tabla). Las próximas características clave incluyen funciones de eliminación y actualización, exportación/importación a Excel y consultas generadas dinámicamente para la creación de reportes.

## License
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.