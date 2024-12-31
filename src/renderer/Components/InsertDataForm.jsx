import React, { useState } from 'react';

export default function InsertDataForm({tableName, editorForm}) {

  const [response, setResponse] = useState()

  const handleFormSubmit = (data) => {
    window.api.insertData(tableName, data).then((res) => setResponse(res))
  } 


  return React.createElement(
      editorForm, 
      {
        onSubmit: handleFormSubmit,
        button: "Agregar",
        response
      }
    )
    
}