import React, { createContext, useState } from 'react';

export const ApiContext = createContext()

export function ApiProvider({children}) {

  const [response, setResponse] = useState()

  const deleteTableRow = (tableName, dataRow) => {
    const {deleteByID} = window.api

    if(!dataRow?.id) {
      setResponse({success: false, error: "Missing ID on row data"})
      return;
    }

    if(confirm("¿Confirma que desea borrar el elemento?")) {
      deleteByID(tableName, dataRow.id).then(res => setResponse(res))
    }

  }

  return (<ApiContext.Provider value={{response, setResponse, deleteTableRow}}>
    {children}
  </ApiContext.Provider>)
  
}