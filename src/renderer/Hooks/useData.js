import React, { useEffect, useState, useCallback } from 'react';

const { api } = window;

export const useData = (tableName, options = {}, update = false) => {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const load = async () => {

    try {
      const res = await api.getData(tableName, options)

      if(!res.success) throw new Error(res.error);
      
      setData(res.data)
      setError(null)

    } catch(e) {
      setError(e.message || "Unexpected error loading data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {

    load()

  }, [tableName, options])

  const handleTableChange = useCallback((changedTable) => {
    
    if(tableName === changedTable) {
      load();
    }

  }, [tableName, options])

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

  return {loading, data, error};

}