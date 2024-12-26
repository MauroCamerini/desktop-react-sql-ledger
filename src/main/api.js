import cache from "./cache"
import db from "./db/db";
import tables from "./tables";
import response from "./response";
import triggers from "./triggers";

const readFromCache = (tableName) => {

  console.log('Checking cache ', tableName)
  let records
  if(cache.hasTable(tableName)){
    console.log('reading table from cache')
    records = cache.getTable(tableName)
  } else {
    console.log('inserting table to cache')
    records = db.readRecords(tableName)
    cache.setTable(tableName, records)
  }
  return records
}

const checkTableName = (tableName) => {
  if (typeof tableName !== "string") {
    throw new TypeError("tableName must be a string");
  }
  if(!tables[tableName]) {
    throw new Error(`${tableName} is not a valid table name`)
  }

}

const checkOptions = (options) => {
  if(!!(Object.hasOwn(options, 'limit') ^ Object.hasOwn(options, 'offset'))) {
    throw new Error("'limit' and 'offset' are codependent and one is missing");
  }
  if(Object.hasOwn(options, 'limit') && !Number.isInteger(options.limit)) {
    throw new TypeError("'limit' must be integer");
  }
  if(Object.hasOwn(options, 'offset') && !Number.isInteger(options.offset)) {
    throw new TypeError("'offset' must be integer");
  }


}

function getList(listName) {
  
  try {  
    
    checkTableName(listName)

    if(!tables[listName].is_list) {
      throw new Error(`${listName} is not a valid list name`)
    }

    const data = readFromCache(listName)

    return response.success(data)

  } catch (e) {

    return response.error(e.message)
    
  } 

}

function getData(tableName, options) {
  
  try {  
    
    checkTableName(tableName)

    checkOptions(options)

    console.info("Reading data ", tableName, options)
    const data = db.readRecords(tableName, options)

    return response.success(data)

  } catch (e) {

    return response.error(e.message)
    
  }

}

function getTotalRows(tableName, filters) {
  
  try {

    checkTableName(tableName)

    console.log("Counting rows ", tableName, filters)
    const totalRows = db.countRecords(tableName, filters)

    return response.success(totalRows)

  } catch(e) {

    console.error(e)
    return response.error(e.message)

  }
}

function updateByID(tableName, id, data) {
  
  try {  
    
    checkTableName(tableName)

    if(tables[tableName].readonly) {
      throw new Error(`${tableName} table is read only`)
    }

    const info = db.updateRecord(tableName, data, {filters: {id: {equals: id}}})

    triggers.tableUpdate(tableName, info, data)

    return response.success(info)

  } catch (e) {

    return response.error(e.message)
    
  }

}

function deleteByID(tableName, id) {
  
  try {  
    
    checkTableName(tableName)

    if(tables[tableName].readonly) {
      throw new Error(`${tableName} table is read only`)
    }

    const info = db.deleteRecord(tableName, {filters: {id: {equals: id}}})

    triggers.tableUpdate(tableName, info)

    return response.success(info)

  } catch (e) {

    return response.error(e.message)
    
  }

}

function insertData(tableName, data) {
  try {

    checkTableName(tableName)

    if(tables[tableName].readonly) {
      throw new Error(`${tableName} table is read only`)
    }

    const info = db.insertRecord(tableName, data)

    triggers.tableUpdate(tableName, info, data)

    return response.success(info)

  } catch(e) {
    return response.error(e.message)
  }
}

const api = Object.freeze({
  getList,
  getData,
  insertData,
  updateByID,
  deleteByID,
  getTotalRows
})

export default api