import React, { useContext, useMemo, useState } from 'react';

import TagsEditor, { emptyValues as tagsEmptyValues } from '../Forms/TagsEditor'
import ContactsEditor, { emptyValues as contactsEmptyValues } from '../Forms/ContactsEditor'
import WalletsEditor, { emptyValues as  walletsEmptyValues } from '../Forms/WalletsEditor'

import InsertDataForm from '../Components/InsertDataForm';
import UpdateDataModal from '../Components/UpdateDataModal'
import DataTable from '../Components/DataTable';

import { useList } from '../Hooks/useList';
import { useParams } from 'react-router';
import { ApiContext } from '../Context/ApiContext';
 
const pages = {
  'tags': {
    listName: 'tag_list',
    editorForm: TagsEditor,
    tableName: 'tags',
    emptyValues: tagsEmptyValues,
    columns: [
      { header: 'Categoría', field: 'path' },
      { header: 'Tipo',      field: 'tag_type' },
    ]
  },
  'contacts': {
    listName: 'contact_list',
    editorForm: ContactsEditor,
    tableName: 'contacts',
    emptyValues: contactsEmptyValues,
    columns: [
      { header: 'Nombre',      field: 'name' },
      { header: 'Descripción', field: 'description' },
    ]
  },
  'wallets': {
    listName: 'wallet_list',
    editorForm: WalletsEditor,
    tableName: 'wallets',
    emptyValues: walletsEmptyValues,
    columns: [
      { header: 'Nombre',      field: 'name' },
      { header: 'Descripción', field: 'description' },
      { header: 'Monto inicial', field: 'starting_balance' },
    ]
  }
}

export default function Edit() {

  const {page} = useParams()

  const {editorForm, tableName, listName, emptyValues, columns} = useMemo(() => pages[page], [page])

  const {items} = useList(listName, true)

  const [dataRow, setDataRow] = useState()

  const {deleteTableRow} = useContext(ApiContext)

  return (<>
    <h2>Crear</h2>
    <InsertDataForm tableName={tableName} editorForm={editorForm} />
    { items && 
      <>
      <UpdateDataModal 
        tableName={tableName} 
        editorForm={editorForm} 
        emptyValues={emptyValues}
        dataRow={dataRow}
        onHide={() => setDataRow()}/>
        
      <h2>Editar</h2>
      <DataTable 
        data={items}
        tableName={tableName} 
        columns={columns}
        controls
        onUpdateClick={(newDataRow => setDataRow(newDataRow))}
        onDeleteClick={(dr => deleteTableRow(tableName, dr))}
      />
      </>
    }
  </>)
};