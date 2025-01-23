import React from "react";
import Editor from "../Components/Editor";
import WalletsEditorSchema from "../Schema/WalletsEditorSchema";


export const emptyValues = Object.freeze({
  name: '',
  description: '',
  starting_balance: 0
})

export default function WalletsEditor({defaultValues, dataRow, ...rest}){
  
  return (
    <Editor.Form 
      defaultValues={defaultValues || {...emptyValues}}
      schema={WalletsEditorSchema}
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
      <Editor.Input
        label='Saldo inicial'
        name='starting_balance' 
        type='text'
      />
    </Editor.Form>
)

}