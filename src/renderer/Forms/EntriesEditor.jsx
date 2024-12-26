import React from "react";
import Editor from "../Components/Editor";
import { getTagLabelWithDepth  } from "../Utils/utils";
import { getNowYYYYMM, getNowYYYYMMDD } from "../../common/dateformat";
import EntriesEditorSchema from "../Schema/EntriesEditorSchema";

const emptyValues = {
  tag_id: "",
  wallet_id: "",
  contact_id: '',
  period: getNowYYYYMM(),
  date: getNowYYYYMMDD(),
  amount: 0
}

export default function EntriesEditor({defaultValues = emptyValues, onSubmit}){
  
  return (
    <Editor.Form 
      onSubmit={onSubmit} 
      defaultValues={defaultValues}
      schema={EntriesEditorSchema}>
        
      <Editor.ListSelect
        label='Categoría'
        name='tag_id' 
        listName='tag_list' 
        getItemLabel={getTagLabelWithDepth}
      />
      <Editor.ListSelect
        label='Cuenta'
        name='wallet_id' 
        listName='wallet_list' 
      />
      <Editor.ListSelect
        label='Contacto'
        name='contact_id' 
        listName='contact_list' 
      />
      <Editor.Input
        label='Período'
        name='period'
        type='month'
      />
      <Editor.Input
        label='Fecha'
        name='date'
        type='date'
      />
      <Editor.Input
        label='Monto'
        name='amount'
        type='text'
      />
    </Editor.Form>
)

}