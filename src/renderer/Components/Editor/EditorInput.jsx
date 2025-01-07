import React from "react";
import Form from 'react-bootstrap/Form'

/**
 * AAn input component for use within forms, integrated with React Hook Form.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.type - HTML input type (text, date, month...)
 * @param {string} props.label - The label for the input. It is applied to a label when EditorForm renders the component.
 * @param {string} props.name - The name of the form field, used with React Hook Form.
 * @param {...Object} rest - Additional props to pass to the underlying `<Form.Control>` component.
 *
 *
 * @example
 * <Editor.Input
 *   label='Período'
 *   name='period'
 *   type='month'
 *   />
 */
export default function EditorInput({label, type, name, errors, ...rest}) {

  return (
    <Form.Control type={type} name={name} {...rest} />
  )
} 