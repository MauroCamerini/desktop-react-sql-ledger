import fs from 'node:fs'
import { app, BrowserWindow, dialog } from 'electron';
import started from 'electron-squirrel-startup';
import ipc from './ipc';
import events from './events';
import config from './config';
import db from './db/db'

let mainWindow

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,  
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools(); 

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  const dbExists = fs.existsSync(config.DB_FILE_NAME)
  let mustCreate = false

  if(!dbExists) {
    mustCreate = !!dialog.showMessageBoxSync({
      title: "Archivo de base de datos no encontrado",
      message: "No se encuentra el archivo de base de datos ¿Desea crearlo o salir de la aplicación?",
      buttons: ["Salir", "Crear"],
      defaultId: 1, cancelId: 0,
      type: "question"
    })
  }

  if(!dbExists && !mustCreate) {
    dialog.showErrorBox("No se encuentra DB", `No hay archivo de base de datos, se cierra aplicación`)
    app.quit()
  }

  db.open(mustCreate)

  ipc.setHandlers()

  // Creates the window and set senders
  createWindow();

  events.setWindow(mainWindow);

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
      events.setMainWindow(mainWindow);

    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
