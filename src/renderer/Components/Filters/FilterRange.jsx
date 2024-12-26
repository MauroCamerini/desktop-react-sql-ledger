import React, { useState } from "react";
import Form  from "react-bootstrap/Form";
import Row  from "react-bootstrap/Row";
import Col  from "react-bootstrap/Col";
import { useController } from "react-hook-form";

export default function FilterRange({name, disabled, type}) {
  
  const { field: fromField } = useController({ name: `${name}.from`, disabled })
  const { field: toField } = useController({ name: `${name}.to`, disabled })

  const [fromValue, setFromValue] = useState('')
  const [toValue, setToValue] = useState('')

  return (
    <>
    <Form.Group className="mb-1" as={Row}>
      <Form.Label column sm={3} className="mb-1">Desde</Form.Label>
      <Col sm={9}>
        <Form.Control 
          type={type}

          onChange={(event) => {
            setFromValue(event.target.value)
            fromField.onChange(event.target.value)
          }} 
          onBlur={fromField.onBlur} 
          value={fromValue} 
          name={fromField.name} 
          disabled={fromField.disabled}

          max={toValue}
          />
      </Col>
    </Form.Group>
    <Form.Group className="mb-1" as={Row}>
      <Form.Label column sm={3}>Hasta</Form.Label>
      <Col sm={9}>
      <Form.Control 
          type={type}

          onChange={(event) => {
            setToValue(event.target.value)
            toField.onChange(event.target.value)
          }} 
          onBlur={toField.onBlur} 
          value={toValue} 
          name={toField.name} 
          disabled={toField.disabled}

          min={fromValue}
          />
      </Col>
    </Form.Group>
    </>
  )
}