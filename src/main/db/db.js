import Database from "better-sqlite3";
import DATABASE_QUERY from './queries/database.sql'
import DEFAULTDATA_QUERY from './queries/defaultdata.sql'
import config from "../config";
import { getNowFull } from "../../common/dateformat";
import tables from "../tables";

/**
 * Current BetterSqlite3.Database instance
 * @type Database | null
 */
let _db

/**
 * Random unique ID for the current sessions (stablished when opening the DB)
 * @type String
 */
let _sessionUUID

/**
 * Generates an SQL WHERE clause based on the provided filters.
 *
 * @function
 * @param {Object} filters - Filters to apply, structured as key-value pairs:
 * - For equality: `fieldName: { equals: value } `
 * - For multiple values: `fieldname: { in: [value1, value2, ...] }`
 * - For date ranges: `fieldname: { range: { from: Date, to: Date } }`
 * - For income or expenses: `fieldname: { sign: 'positive' || 'negative' }`
 * @param {string} prefix - Prefix added to params to avoid conflicts with other params. 
 * 
 * @example  
 * const filters = {
 *   id: { equals: 255 },
 *   tag_id: { in: [1, 2] },
 *   date: { from: '2023-01-01', to: '2023-12-31' }
 *   amount: { sign: 'postive}
 * };
 */
function generateWhereClause(filters, prefix = "filter_") {
  const clauses = []
  const params = {}
  for (const[field, condition] of Object.entries(filters)) {
    
    if (condition.equals) {
        
        clauses.push(`${field} = @${prefix}${field}`);
        params[`${prefix}${field}`] = condition.equals;
    
    } else if (condition.in && Array.isArray(condition.in)) {
        const placeholders = condition.in.map((_, i) => `@${prefix}${field}_${i}`);
        clauses.push(`${field} IN (${placeholders.join(", ")})`);
        condition.in.forEach((value, i) => {
            params[`${prefix}${field}_${i}`] = value;
        });
    
    } else if (condition.range && condition.range.from && condition.range.to) {
        
        clauses.push(`(${field} >= @${prefix}${field}_from AND ${field} <= @${prefix}${field}_to)`);
        params[`${prefix}${field}_from`] = condition.range.from;
        params[`${prefix}${field}_to`] = condition.range.to;
    } else if (condition.sign) {
        clauses.push(condition.sign === 'positive' ? `(${field} >= 0)` : `(${field} <= 0)`)
    }
  }

  return {
    clause: clauses.length ? `WHERE ${clauses.join(" AND ")}` : "",
    params,
  };

}

/**
 * Inserts a new record in the DB
 */
export function insertRecord(tableName, data) {

  if(!tables[tableName]) {
    throw new Error(`INSERT ERROR: ${tableName} does not exist`)
  }
  
  if(tables[tableName].readonly) {
    throw new Error(`INSERT ERROR: ${tableName} is readonly`)
  }

  let _data = {...data}

  if(tables[tableName].tracked) {
    _data.session_uuid = _sessionUUID 
  }

  const columns = Object.keys(_data).join(', ');
  const placeholders = Object.keys(_data).map(key => `@${key}`).join(', ');

  const stmt = _db.prepare(`
    INSERT INTO ${tableName} (${columns}) 
    VALUES (${placeholders})
  `)

  return stmt.run(_data);

}

/**
 * Updates records in the specified table based on provided data and filters.
 */
export function updateRecord(tableName, data, options) {

  if(!tables[tableName]) {
    throw new Error(`UPDATE ERROR: ${tableName} does not exist`)
  }
  
  if(tables[tableName].readonly) {
    throw new Error(`UPDATE ERROR: ${tableName} is readonly`)
  }

  let _data = {...data}

  if(tables[tableName].tracked) {
    _data.session_uuid = _sessionUUID 
    _data.modification_time = getNowFull() 
  }
  
  const setClause = Object.keys(data).map(key => `${key} = @${key}`).join(', ');
    
  const whereClause = generateWhereClause(options?.filters || {})

  const stmt = _db.prepare(`
    UPDATE ${tableName}
    SET ${setClause}
    ${whereClause.clause}
  `)

  return stmt.run({..._data, ...whereClause.params})

}

/**
 * Deletes records from the specified table based on provided filters.
 */
export function deleteRecord(tableName, options) {

  if(!tables[tableName]) {
    throw new Error(`DELETE ERROR: ${tableName} does not exist`)
  }
  
  if(tables[tableName].readonly) {
    throw new Error(`DELETE ERROR: ${tableName} is readonly`)
  }

  const whereClause = generateWhereClause(options?.filters || {});

  if (!whereClause.clause) {
      throw new Error("Delete operation requires at least one filter condition.");
  }

  const stmt = _db.prepare(`
      DELETE FROM ${tableName}
      ${whereClause.clause}
  `)

  return stmt.run(whereClause.params)

}

/**
 * Reads records from the specified table based on provided filters.
 */
function readRecords(tableName, options) {

  const limitClause = options?.limit ? `LIMIT ${options.limit}` : "";
  const offsetClause = options?.offset ? `OFFSET ${options.offset}` : "";
  const whereClause = generateWhereClause(options?.filters || {});

  const stmt = _db.prepare(`
    SELECT * FROM ${tableName}
    ${whereClause.clause}
    ${limitClause}
    ${offsetClause}
  `);

  let res
  if(options?.first) {
    res = stmt.get(whereClause.params)
  } else {
    res = stmt.all(whereClause.params)
  }

  return res
}

function countRecords(tableName, filters) {
  
  const whereClause = generateWhereClause(filters);

  const stmt = _db.prepare(`
    SELECT COUNT(*) AS total FROM ${tableName}
    ${whereClause.clause}
  `);

  return stmt.get(whereClause.params).total
}

/**
 * Opens the DB for read/write operations and starts a new session.
 * 
 * @param {Boolean} mustCreate Specifies if the database has to be created before opening.
 * @returns {Object} An object withe current session UUID
 */
function open(mustCreate = false) {
  
  _sessionUUID = crypto.randomUUID()
  const starting_time = getNowFull()

  console.info("New session ", _sessionUUID, " starting time ", starting_time)

  _db = new Database(config.DB_FILE_NAME, {fileMustExist: !mustCreate})

  if(mustCreate) {
    console.info("Creating DB...")
    _db.exec(DATABASE_QUERY)
  }
  
  console.info("Storing session...")

  const stmt = _db.prepare(`
    INSERT INTO sessions (session_uuid, starting_time)
    VALUES (@session_uuid, @starting_time)
  `)

  stmt.run({session_uuid: _sessionUUID, starting_time})

  if(mustCreate) {
    console.info("Inserting default data...")
    _db.exec(DEFAULTDATA_QUERY)
  }

  console.info("DB opened successfully!!!")

  return {
    session_uuid: _sessionUUID
  }
}

const db = Object.freeze({
  open,
  readRecords,
  insertRecord,
  updateRecord,
  deleteRecord,
  countRecords
})

export default db