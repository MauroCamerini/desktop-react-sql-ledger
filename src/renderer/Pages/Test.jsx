import React, { useState } from 'react';
import EntriesFilters from '../Forms/EntriesFilters'
import DataView from '../Components/DataView';
import UpdateDataModal from '../Components/UpdateDataModal';
import EntriesEditor, { emptyValues } from '../Forms/EntriesEditor';

const columns=[
  { header: 'Período',    field: 'period' },
  { header: 'Fecha',      field: 'date' },
  { header: 'Cuenta',     field: 'wallet_name' },
  { header: 'Monto',      field: 'amount' },
  { header: 'Categoría',  field: 'tag_name' },
  { header: 'Contacto',   field: 'contact_name' },
]

const Test = () => {

  const [dataRow, setDataRow] = useState()

  return (
    <>
      <UpdateDataModal 
        tableName='entries' 
        editorForm={EntriesEditor} 
        emptyValues={emptyValues}
        dataRow={dataRow}
        onHide={() => setDataRow()}/>
      <DataView 
        tableName='entries_view' 
        filtersForm={EntriesFilters} 
        columns={columns}
        controls
        onUpdateClick={(newDataRow => setDataRow(newDataRow))}
      />
    </>
  );
};

export default Test;
