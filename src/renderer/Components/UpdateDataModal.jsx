import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ResponseToast from './ResponseToast';

export default function UpdateDataModal({tableName, editorForm, dataRow, emptyValues, onHide}) {

  const [response, setResponse] = useState()
  const [show, setShow] = useState(false);
  const [defaultValues, setDefaultValues] = useState()
  const [rowId, setRowId] = useState()

  const handleFormSubmit = (data) => {
    setShow(false)
    window.api.updateByID(tableName, rowId, data).then((res) => setResponse(res))
  } 

  useEffect(() => {
    if(!dataRow)
      return;

    const newDefaultValues = {}
    Object.keys(emptyValues).forEach((key) => newDefaultValues[key] = dataRow[key])

    console.log(newDefaultValues)

    setDefaultValues(newDefaultValues)
    setRowId(dataRow.id)
    setShow(true)

  }, [dataRow])

  return (
    <>
    <ResponseToast response={response} />
    <Modal 
      show={show}
      backdrop="static"
      onHide={() => {setShow(false); if(onHide) onHide(); }}
      centered
      >
      
      <Modal.Header closeButton>
        <Modal.Title>Editar elemento</Modal.Title>
       </Modal.Header>
      <Modal.Body>
        {
          show ? React.createElement(
            editorForm, 
            {
              defaultValues: defaultValues,
              onSubmit: handleFormSubmit,
              button: "Guardar",
            }
          )
          : null
        }
      </Modal.Body>
    </Modal>
    </>
  )
    
}