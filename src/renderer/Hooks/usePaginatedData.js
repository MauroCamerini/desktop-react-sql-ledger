import React, { useEffect, useState } from 'react'
import { useData } from './useData'
import { useRowCount } from './useRowCount'

export const usePaginatedData = (tableName, rowsPerPage = 10) => {

  const [filters, setFilters] = useState({})

  const [options, setOptions] = useState({filters, limit: rowsPerPage, offset: 0})
  const {totalRows, error: totalRowsError} = useRowCount(tableName, options.filters, true)

  const {loading, data, error: dataError} = useData(tableName, options, true)

  const [currentPage, setCurrentPage] = useState(1)


  useEffect(()=> {
    setOptions(prev => {
      const newOffset = (currentPage - 1) * rowsPerPage
      
      if(newOffset === prev.offset) {
        return prev  // Avoids re-rendiring by returning same object
      }

      const newOptions = {...prev}
      newOptions.offset= newOffset

      return newOptions
    })
  }, [currentPage])

  useEffect(()=> {
    setOptions(prev => ({...prev, filters}))
  }, [filters])

  const onPageChange = (newPage) => setCurrentPage(newPage)

  const onFiltersChange = (newFilters) => setFilters(newFilters)

  return {
    onFiltersChange,
    loading,
    data,
    error: dataError,
    pagination: {
      error: totalRowsError,
      currentPage,
      rowsPerPage,
      totalRows,
      onPageChange
    }
  }
}