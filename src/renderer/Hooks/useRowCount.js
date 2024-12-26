import { useEffect, useState, useCallback } from "react"

const { api } = window

export const useRowCount = (tableName, filters = {}, update = false) => {
  
  const [totalRows, setTotalRows] = useState()
  const [error, setError] = useState()

  const load = async () => {

    try {
      const res = await api.getTotalRows(tableName, filters)

      if(!res.success) throw new Error(res.error);
      
      setTotalRows(res.data)

    } catch(e) {
      setError(e.message || `Cannot get total row count of table ${tableName}`)
    }
  }

  useEffect(() => {

    load()

  }, [tableName, filters])

  const handleTableChange = useCallback((changedTable) => {
    
    if(tableName === changedTable) {
      load();
    }

  }, [tableName, filters])

  useEffect(() => {

    if(update){
      api.onTableChange(handleTableChange)
    }

    return () => {
      if(update) {
        api.removeTableChange(handleTableChange)
      }
    }

  }, [update])

  return {totalRows, error}
}