import React from "react";
import Filters from "../Components/Filters";

import { getTagLabelWithDepth } from '../Utils/utils'

export default function EntriesFilters({onSubmit}) {
  
  return (
    <Filters.Form onSubmit={onSubmit}>
      <Filters.InList 
        label='Categoría'
        listName='tag_list' 
        name='tag_id'
        getItemLabel={getTagLabelWithDepth}/>
      <Filters.InList 
        label='Cuenta'
        listName='wallet_list' 
        name='wallet_id' />
      <Filters.InList 
        label='Contacto'
        listName='contact_list' 
        name='contact_id'/>
      <Filters.Range 
        label='Período'
        name='period' 
        type='month'/>
      <Filters.Range 
        label='Fecha'
        name='date' 
        type='date'/>
      <Filters.Sign 
        label='Monto'
        name='amount'/>
    </Filters.Form>
  )

}