/*
  ***************
    EDITOR FORM
  ***************
  
  The `EditorForm` component is a higher-order form wrapper designed to manage 
  the lifecycle of form fields using the `useForm` hook from React Hook Form.
  It initializes the form with default values and validation rules defined by 
  a Yup schema, which is passed as a prop. The component dynamically integrates
  its child elements into the form by iterating over them, identifying those
  with a `name` prop, and registering them with React Hook Form. 

  Each registered child is wrapped in a `Form.Group` component that provides a 
  consistent layout and structure. Labels for the fields are automatically set 
  based on the `label` or `name` prop of the child, and validation feedback is 
  displayed below the field if an error is present. The layout is arranged in 
  rows, with up to three controls per row.

  The form includes a submit button, which is disabled until the form is m
  odified (`isDirty`). It also renders a `ResponseToast` component to display 
  the result of an API response. When the form is submitted, the `onSubmit` 
  function provided as a prop is executed, receiving the form data as its 
  argument.

  The `EditorForm` ensures seamless integration of child components with React 
  Hook Form while maintaining a consistent layout and providing validation and
  user feedback mechanisms.
*/

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import ResponseToast from '../ResponseToast';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Stack from "react-bootstrap/Stack";

import * as Yup from 'yup'

/**
 * A reusable form component that integrates with React Hook Form and Yup for validation.
 * Dynamically renders child components as form fields and handles form submission.
 *
 * @param {Object} props - The props for the component.
 * @param {function} props.onSubmit - The callback function to handle form submission. Receives the form data as an argument.
 * @param {string} [props.button="Enviar"] - The label for the submit button.
 * @param {Object} [props.response] - The response object returned from the API to display in the `ResponseToast` component.
 * @param {React.ReactNode} props.children - The components to render as form fields.
 * @param {Yup.ObjectSchema} [props.schema=Yup.object().shape({})] - The Yup validation schema for the form.
 * @param {Object} [props.defaultValues={}] - The default values for the form fields.
 *
 */
export default function EditorForm({
  onSubmit, 
  button, 
  response,
  children, 
  schema = Yup.object().shape({}),
  defaultValues = {}
}) {
  
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });
  const { handleSubmit, register, formState: { errors, isSubmitted, isDirty } } = methods

  const renderChildren = React.Children.map(children, (child) => {
    return child.props.name ?
    (
      <Col xs={4} className="mb-2">
      <Form.Group>
        <Form.Label>{child.props.label || child.props.name}</Form.Label>
        {
          React.cloneElement(child, {
            ...register(child.props.name), 
            methods,
            isInvalid: isSubmitted && !!errors[child.props.name]})
        }
        <Form.Control.Feedback type='invalid'>{errors[child.props.name]?.message}</Form.Control.Feedback>
      </Form.Group>
      </Col>
    ) : child
  })

  return (
    <Form onSubmit={handleSubmit(onSubmit || ((data) => {console.error("No submit handler ", data)}))}>
      <Row className="mb-2">
        {renderChildren}
      </Row>
      <Stack direction="horizontal" gap={3} className="mb-3">
        <Button type='submit' disabled={!isDirty}>{button || "Enviar"}</Button>
        <ResponseToast response={response} />
      </Stack>
    </Form>
  )
}