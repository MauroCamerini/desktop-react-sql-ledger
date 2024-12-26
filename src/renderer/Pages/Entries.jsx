import React from 'react';
import EntriesFilters from '../Forms/EntriesFilters'
import EntriesEditor from '../Forms/EntriesEditor'
import EditorWithFilteredView from '../Components/EditorWithFIlteredView';


export default function Edit() {

  return (<>
    <EditorWithFilteredView 
      tableName={'entries'}
      filtersForm={EntriesFilters}
      editorForm={EntriesEditor}

      viewName='entries_view'
      columns={[
        { header: 'Período',    field: 'period' },
        { header: 'Fecha',      field: 'date' },
        { header: 'Cuenta',     field: 'wallet_name' },
        { header: 'Monto',      field: 'amount' },
        { header: 'Categoría',  field: 'tag_name' },
        { header: 'Contacto',   field: 'contact_name' },
      ]}
    />  
  </>)
};
