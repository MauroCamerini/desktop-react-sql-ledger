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
  const { handleSubmit, register, formState: { errors, isSubmitted } } = methods

  const renderChildren = React.Children.map(children, (child) => {
    return child.props.name ?
    (
      <Col xs={4} className="mb-2">
      <Form.Group>
        <Form.Label>{child.props.label || child.props.name}</Form.Label>
        {
          React.cloneElement(child, {
            ...register(child.props.name), 
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
        <Button type='submit'>{button || "Enviar"}</Button>
        <ResponseToast response={response} />
      </Stack>
    </Form>
  )
}