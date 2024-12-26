
import { ipcMain } from "electron"
import api from "./api"
import events from "./events"

let _handlersSet = false

function setHandlers() {

  if(_handlersSet) {
    throw new Error("Inter process comunication handlers are alredy set");
  }

  ipcMain.handle('api:get-list', 
    async (event, listName) => 
      api.getList(listName));

  ipcMain.handle('api:get-data', 
    async (event, tableName, options) => 
      api.getData(tableName, options));

  ipcMain.handle('api:get-total-rows', 
    async (event, tableName, filters) => 
      api.getTotalRows(tableName, filters));

  ipcMain.handle('api:insert-data', 
    async (event, tableName, data) =>
      api.insertData(tableName, data));

  ipcMain.handle('api:update-by-id', 
    async (event, tableName, id, data) => 
      api.getData(tableName, id, data));

  ipcMain.handle('api:delete-by-id', 
    async (event, tableName, id) => 
      api.getData(tableName, id))

  _handlersSet = true

}

const ipc = Object.freeze({
  setHandlers,
})

export default ipc