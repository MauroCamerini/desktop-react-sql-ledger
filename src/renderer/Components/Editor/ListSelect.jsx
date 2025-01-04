import React from "react";
import Form from "react-bootstrap/Form";

import { useList } from "../../Hooks/useList";


export default function ListSelect({label, listName, itemFilter, getItemLabel, keyField, nullable, update, name, methods, ...rest}) {
  
  const { watch } = methods

  const selectedValue = watch(name)
  const {loading, items, error} = useList(listName, update)

  return (
    <Form.Select value={selectedValue} name={name} {...rest}>
      {nullable && <option value=''>-- Ninguno --</option>}
      {items && items.map((item) => {
          if(itemFilter && !itemFilter(item)) {
            return null;
          } else {
            return (<option 
              key={item[keyField || 'id']} 
              value={item[keyField || 'id']}>
              {getItemLabel ? getItemLabel(item) : item.name}
            </option>)
          }
        }
      )}
    </Form.Select>
  )
}