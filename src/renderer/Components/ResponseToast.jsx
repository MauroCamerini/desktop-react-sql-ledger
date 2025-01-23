import React, { useContext, useEffect, useState } from "react";
import  Toast  from "react-bootstrap/Toast";
import { ApiContext } from "../Context/ApiContext";

export default function ResponseToast() {

  const {response} = useContext(ApiContext)
  const [show, setShow] = useState(false);

  useEffect(() => {
    
    setShow(!!response)

  }, [response])

  if(!response) return;

  const variant = () => (response.success ? 'success' : 'danger')

  return (<>
    <Toast 
      className={`fixed-bottom m-3 border border-${variant()} text-${variant()}`}
      onClose={() => setShow(false)} 
      show={show} delay={3000} 
      autohide
      >
      <Toast.Body>{response.error ? response.error : `Datos guardados correctamente ID: ${response?.data?.lastInsertRowid}`}</Toast.Body>
    </Toast>
  </>)

}