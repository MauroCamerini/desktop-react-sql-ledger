import React, { useContext } from 'react';
import { ApiContext } from '../Context/ApiContext';

export default function InsertDataForm({tableName, editorForm}) {

  const {setResponse} = useContext(ApiContext)

  const handleFormSubmit = (data) => {
    window.api.insertData(tableName, data).then((res) => setResponse(res))
  } 


  return React.createElement(
      editorForm, 
      {
        onSubmit: handleFormSubmit,
        button: "Agregar",
      }
    )
    
}