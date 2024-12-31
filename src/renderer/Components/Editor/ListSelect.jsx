import React from "react";
import Form from "react-bootstrap/Form";

import { useList } from "../../Hooks/useList";


export default function ListSelect({label, listName, getItemLabel, keyField, name, methods, ...rest}) {
  
  const { watch } = methods

  const selectedValue = watch(name)
  const {loading, items, error} = useList(listName)

  return (
    <Form.Select value={selectedValue} name={name} {...rest}>

      {items && items.map((item) => 
      <option 
        key={item[keyField || 'id']} 
        value={item[keyField || 'id']}>
        {getItemLabel ? getItemLabel(item) : item.name}
      </option>
      )}
    </Form.Select>
  )
}