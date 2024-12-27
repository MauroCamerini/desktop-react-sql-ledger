import React from "react";
import { usePaginatedData } from "../Hooks/usePaginatedData";
import AccordionContainer from "./AccordionContainer";
import DataPagination from "./DataPagination"
import DataTable from "./DataTable";

export default function DataView({tableName, filtersForm, columns}) {
  
  const {data, pagination, onFiltersChange} = usePaginatedData(tableName)

  return (<>
    <AccordionContainer header='Filtros'>
      {
        React.createElement(filtersForm, {onSubmit: onFiltersChange})
      }
    </AccordionContainer>
    { data &&
      <DataTable 
        data={data}
        columns={columns}
      />
    }
    <DataPagination {...pagination} />
  </>)
}