/**
 * - is_list
 *  Must be read using api.getList, is stored in cache
 * 
 * - tracked
 *  When inserting a record, session_uuid and modification_time must be added.
 * 
 * - dynamic
 *  The SQL query is generated dynamically
 * 
 * - readonly
 *  Only for read operations.
 */
const tracked_table = {
  is_list: false,
  tracked: true,
  dynamic: false,
  readonly: false
}

const common_table = {
  is_list: false,
  tracked: false,
  dynamic: false,
  readonly: false
}

const list_table = {
  is_list: true,
  tracked: false,
  dynamic: false,
  readonly: true
}

const readonly_table = {
  is_list: false,
  tracked: false,
  dynamic: false,
  readonly: true
}

const tables = Object.freeze({

  sessions: readonly_table,

  entries:  tracked_table,
  groups:   tracked_table,

  contacts: common_table,
  tags:     common_table,
  wallets:  common_table,

  contact_list: list_table,
  tag_list:     list_table,
  wallet_list:  list_table,
  period_list:  list_table,

  entries_view:     readonly_table,
  income_statement: readonly_table
  
})

export default tables;