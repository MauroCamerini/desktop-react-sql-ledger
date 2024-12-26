
let cacheMap = new Map()

function hasTable(tableName) {

  return cacheMap.has(tableName)
}

function setTable(tableName, data) {

  cacheMap.set(tableName, data)
}

function getTable(tableName, data) {
  if (!cacheMap.has(tableName)) {
    throw new Error(`Table '${tableName}' not found in cache.`);
  }
  return cacheMap.get(tableName)
}

const cache = Object.freeze({
  hasTable,
  setTable,
  getTable
})

export default cache