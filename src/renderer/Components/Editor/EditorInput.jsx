import React from "react";
import Form from 'react-bootstrap/Form'

export default function EditorInput({label, type, name, errors, ...rest}) {

  return (
    <Form.Control type={type} name={name} {...rest} />
  )
} 