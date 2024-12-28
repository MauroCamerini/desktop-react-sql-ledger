import React, { useState } from 'react';

export default function InsertDataForm({tableName, editorForm}) {

  const [response, setResponse] = useState()

  const handleCreateFormSubmit = (data) => {
    window.api.insertData(tableName, data).then((res) => setResponse(res))
  } 


  return React.createElement(
      editorForm, 
      {
        onSubmit: handleCreateFormSubmit,
        button: "Agregar",
        response
      }
    )
    
}