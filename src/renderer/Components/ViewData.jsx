import React, { useEffect, useState } from "react";
import { useData } from '../Hooks/useData'
import { useRowCount } from "../Hooks/useRowCount";
import ViewTable from "./ViewTable";
import Pagination from "./DataPagination";

export default function ViewData({tableName, filters, rowsPerPage = 10, ...rest}) {

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

  return (<>
    { data && totalRows > 0 &&
    <>
      <ViewTable data={data} { ...rest} />
      <Pagination currentPage={currentPage} rowsPerPage={rowsPerPage} totalRows={totalRows} onPageChange={(page) => setCurrentPage(page)} />
    </>
    }
  </>)
}