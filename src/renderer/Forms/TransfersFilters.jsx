import React from "react";
import Filters from "../Components/Filters";

export default function TransfersFilters() {
  
  return (
    <Filters.Form>
      <Filters.InList 
        label='Origen'
        listName='wallet_list' 
        name='from_wallet_id' />
      <Filters.InList 
        label='Destino'
        listName='wallet_list' 
        name='to_wallet_id' />
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