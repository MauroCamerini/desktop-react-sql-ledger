import cache from "./cache"
import db from './db/db'
import events from "./events"

async function tableUpdate(tableName, info, data) {
  
  const lookup = {
    'tags': 'tag_list',
    'entries': 'period_list',
    'contacts': 'contact_list',
    'wallets': 'wallet_list'
  }
  
  let listUpdate = !!lookup[tableName]
  const listName = lookup[tableName] || ''

  // checks if action touchs period field by updting it or deleting the row or 
  if(listUpdate && tableName === 'entries' && data && !data.period) {
    listUpdate = false
  }

  if(listUpdate) {
    const listData = db.readRecords(listName)
    cache.setTable(listName, listData)
    events.sendListChange(listName, listData)
  }

  console.info("Triggering table change event ", tableName, info)
  events.sendTableChange(tableName, info)

  // send events to related views also
  if(tableName === 'entries') {
    events.sendTableChange('entries_view', info)
    events.sendTableChange('income_statement', info)
  }
  
}

const triggers = Object.freeze({
  tableUpdate
})

export default triggers;