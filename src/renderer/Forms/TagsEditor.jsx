import React from "react";
import Editor from "../Components/Editor";
import FormSelect from "react-bootstrap/FormSelect";
import TagsEditorSchema from "../Schema/TagsEditorSchema";


export const emptyValues = Object.freeze({
  parent_id: '',
  name: '',
  description: '',
  tag_type: 'ORD'
})

export default function TagsEditor({defaultValues, dataRow, ...rest}){
  
  return (
    <Editor.Form 
      defaultValues={defaultValues || {...emptyValues}}
      schema={TagsEditorSchema}
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
      <Editor.ListSelect
        label='Anidar en'
        name='parent_id' 
        listName='tag_list' 
        getItemLabel={(item) => item.path || item.name || "###"}
        itemFilter={(item) => 
          (dataRow ? !item.path.startsWith(dataRow?.path) : true)
        }
        nullable
        update
      />
      <FormSelect label='Tipo' name="tag_type">
        <option value='FIX'>Fijo</option>
        <option value='ORD'>Ordinario</option>
        <option value='EXT'>Extraordinario</option>
      </FormSelect>
    </Editor.Form>
)

}