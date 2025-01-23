import React from "react";
import Editor from "../Components/Editor";
import ContactsEditorSchema from "../Schema/ContactsEditorSchema";

export const emptyValues = Object.freeze({
  name: '',
  description: ''
})

export default function WalletsEditor({defaultValues, dataRow, ...rest}){
  
  return (
    <Editor.Form 
      defaultValues={defaultValues || {...emptyValues}}
      schema={ContactsEditorSchema}
      {...rest}
      >
        
      <Editor.Input
        label='Nombre'
        name='name' 
        type='text'
      />
      <Editor.Input
        label='Descripción'
        name='description' 
        type='text'
      />
    </Editor.Form>
  )
}