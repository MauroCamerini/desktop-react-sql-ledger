import { ipcMain } from "electron"

/**
 * @type BrowserWindow
 */
let _window

/**
 * Sets the window for send the events from
 * @param {BrowserWindow} newWindow 
 */
function setWindow(newWindow) {
  _window = newWindow
}

async function sendListChange(listName, items) {
  _window.send('api:on-list-change', listName, items)
}

async function sendTableChange(tableName, info) {
  _window.send('api:on-table-change', tableName, info)
}

const events = Object.freeze({
  setWindow,
  sendListChange,
  sendTableChange
})

export default events