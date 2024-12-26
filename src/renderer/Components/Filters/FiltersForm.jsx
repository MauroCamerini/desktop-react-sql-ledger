import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FormProvider, useForm } from "react-hook-form";
import FilterSwitch from "./FilterSwitch";

const cleanEmptyFilters = (obj) => 
  Object.fromEntries(Object.entries(obj).filter(([key, value]) => 
    value?.in || value?.sign || value?.range
  ))

export default function FiltersForm({ defaultValues, children, onSubmit, button }) {
  const methods = useForm({ defaultValues })
  const { handleSubmit } = methods

  const preSubmit = (data) => {
    const cleanData = cleanEmptyFilters(data)

    if(onSubmit) {
      onSubmit(cleanData)
    } else {
      console.error("No submit handler ", cleanData)
    }
  }

  const renderChildren = React.Children.map(children, (child) => {
    return child.props.name ?
    (
      <Col xs={4} className="mb-2">
        <FilterSwitch label={child.props.label || child.props.name}>
          {child}
        </FilterSwitch>
      </Col>
    ) : child
  })

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(preSubmit)}>
        <Row>
          {renderChildren}
        </Row>
        <Button type='submit'>{button || 'Filtrar'}</Button>
      </Form>
    </FormProvider>
  )
}

  