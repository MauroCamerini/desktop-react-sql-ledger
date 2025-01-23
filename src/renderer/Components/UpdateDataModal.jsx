import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { ApiContext } from '../Context/ApiContext';

export default function UpdateDataModal({tableName, editorForm, dataRow, emptyValues, onHide}) {

  const { setResponse } = useContext(ApiContext)
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
    Object.keys(emptyValues).forEach((key) => newDefaultValues[key] = dataRow[key] || '')

    setDefaultValues(newDefaultValues)
    setRowId(dataRow.id)
    setShow(true)

  }, [dataRow])

  return (
    <>
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
              dataRow
            }
          )
          : null
        }
      </Modal.Body>
    </Modal>
    </>
  )
    
}