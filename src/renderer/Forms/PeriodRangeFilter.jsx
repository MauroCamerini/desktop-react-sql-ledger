import React from "react";
import Filters from "../Components/Filters";

export default function PeriodRangeFilter({onSubmit}) {
  
  return (
    <Filters.Form onSubmit={onSubmit}>
      <Filters.Range 
        label='Período'
        name='period' 
        type='month'/>
    </Filters.Form>
  )

}