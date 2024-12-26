import React, { useEffect, useState } from "react";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import { useList } from "../../Hooks/useList";
import { useController } from "react-hook-form";


export default function FilterInList({listName, getItemLabel, name, disabled}) {
  

  const {loading, items, error} = useList(listName)

  const { field } = useController({name: `${name}.in`, disabled})

  const [value, setValue] = useState(field.value)
  const [allChecked, setAllChecked] = useState(false)

  const onChange = (newValue) => {

    const idArray = newValue.map(item => item.id)

    field.onChange(idArray || [])

    setValue(newValue)

    setAllChecked((newValue.length === items.length))
  }

  const handleSelectAll = (event) => {
    if(!event.target.checked && value.length === items.length) {
      field.onChange([])
      setValue([])
    }
    setAllChecked(prev => !prev)
  }

  useEffect(() => {
    if(allChecked) {
      const idArray = items.map(item => item.id)
      field.onChange(idArray)
      setValue(items)
    }
  }, [allChecked])

  return (
    <>
    <Select 
      onChange={onChange} 
      onBlur={field.onBlur} 
      value={value} 
      name={field.name} 
      inputRef={field.ref} 
      isDisabled={field.disabled}

      options={items || []}

      isMulti
      isClearable

      getOptionValue={(option) => option.id}
      getOptionLabel={(option) => getItemLabel ? getItemLabel(option) : option.name}

      isLoading={loading}
      
    />
    <Form.Check 
      label='Seleccionar todas'
      checked={allChecked} 
      disabled={disabled}
      onChange={handleSelectAll}
      />
    </>
  )
}