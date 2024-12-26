// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require("electron");

const listeners = new Map()

const addEventListener = (channel, callback) => {
  const listener = (event, ...args) => callback(...args)
  listeners.set(callback, listener)
  ipcRenderer.on(channel, listener)
}

const removeEventListener = (channel, callback) => {
  const listener = listeners.get(callback)
  if (listener) {
    ipcRenderer.removeListener(channel, listener)
    listeners.delete(callback)
  }
}

contextBridge.exposeInMainWorld(
    'api',
    {
      // API FUNCTIONS
      getList: (listName) => 
        ipcRenderer.invoke('api:get-list', listName),

      getData: (tableName, options) => 
        ipcRenderer.invoke('api:get-data', tableName, options),

      getTotalRows: (tableName, filters) => 
        ipcRenderer.invoke('api:get-total-rows', tableName, filters),

      insertData: (tableName, data) => 
        ipcRenderer.invoke('api:insert-data', tableName, data),

      updateByID: (tableName, id, data) => 
        ipcRenderer.invoke('api:update-by-id', tableName, id, data),

      deleteByID: (tableName, id) => 
        ipcRenderer.invoke('api:delete-by-id', tableName, id),

      // API EVENTS
      onListChange: (callback) => 
        addEventListener('api:on-list-change', callback),

      removeListChange: (callback) =>
        removeEventListener('api:on-list-change', callback),

      onTableChange: (callback) => 
        addEventListener('api:on-table-change', callback),

      removeTableChange: (callback) =>
        removeEventListener('api:on-table-change', callback),
    }
)