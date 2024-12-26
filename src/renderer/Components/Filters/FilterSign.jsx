import React from "react";
import Form  from "react-bootstrap/Form";
import { useController } from "react-hook-form";

export default function FilterSign({name, disabled}) {

  const { field } = useController({name: `${name}.sign`, disabled, defaultValue: 'negative'})

  return (
    <Form.Select {...field}> 
      <option value='negative'>Gastos</option>
      <option value='positive'>Ingresos</option>
    </Form.Select>
  )
}