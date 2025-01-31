import React, { useContext, useState } from 'react';
import EntriesFilters from '../Forms/EntriesFilters'
import DataView from '../Components/DataView';
import UpdateDataModal from '../Components/UpdateDataModal';
import EntriesEditor, { emptyValues } from '../Forms/EntriesEditor';
import { ApiContext } from '../Context/ApiContext';

const columns=[
  { header: 'Período',    field: 'period' },
  { header: 'Fecha',      field: 'date' },
  { header: 'Cuenta',     field: 'wallet_name' },
  { header: 'Monto',      field: 'amount' },
  { header: 'Categoría',  field: 'tag_name' },
  { header: 'Contacto',   field: 'contact_name' },
]

const EntriesView = () => {

  const [dataRow, setDataRow] = useState()

  const {deleteTableRow} = useContext(ApiContext)

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
        onDeleteClick={(dr => deleteTableRow('entries', dr))}
      />
    </>
  );
};

export default EntriesView;
