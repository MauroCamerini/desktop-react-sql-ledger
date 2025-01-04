import React, { useState } from 'react';

import TagsEditor, { emptyValues } from '../Forms/TagsEditor'
import InsertDataForm from '../Components/InsertDataForm';
import UpdateDataModal from '../Components/UpdateDataModal'
import DataTable from '../Components/DataTable';

import { useList } from '../Hooks/useList';


export default function Tags() {

  const {items} = useList('tag_list', true)

  const [dataRow, setDataRow] = useState()

  return (<>
    <h2>Nueva etiqueta</h2>
    <InsertDataForm tableName='tags' editorForm={TagsEditor} />
    { items && 
      <>
      <UpdateDataModal 
        tableName='tags' 
        editorForm={TagsEditor} 
        emptyValues={emptyValues}
        dataRow={dataRow}
        onHide={() => setDataRow()}/>
      <DataTable 
        data={items}
        tableName='tags' 
        columns={[
          { header: 'Categoría', field: 'path' },
          { header: 'Tipo',      field: 'tag_type' },
        ]}
        controls
        onUpdateClick={(newDataRow => setDataRow(newDataRow))}
      />
      </>
    }
  </>)
};
