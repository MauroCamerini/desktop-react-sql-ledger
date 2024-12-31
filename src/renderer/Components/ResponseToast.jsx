import React, { useEffect, useState } from "react";
import  Toast  from "react-bootstrap/Toast";

export default function ResponseToast({response}) {

  const [show, setShow] = useState(false);

  useEffect(() => {
    
    setShow(!!response)
    console.log(response)

  }, [response])

  if(!response) return;

  return (<>
    <Toast 
      onClose={() => setShow(false)} 
      show={show} delay={1000} 
      autohide
      bg={response.success ? 'success' : 'danger'}
      >
      <Toast.Body>{response.error ? response.error : `Datos guardados correctamente ID: ${response?.data?.lastInsertRowid}`}</Toast.Body>
    </Toast>
  </>)

}