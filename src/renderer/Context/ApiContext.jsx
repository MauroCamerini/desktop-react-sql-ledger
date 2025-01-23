import React, { createContext, useState } from 'react';

export const ApiContext = createContext()

export function ApiProvider({children}) {

  const [response, setResponse] = useState()

  return (<ApiContext.Provider value={{response, setResponse}}>
    {children}
  </ApiContext.Provider>)
  
}