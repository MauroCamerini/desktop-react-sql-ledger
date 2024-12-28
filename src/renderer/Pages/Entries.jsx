import React, { useEffect, useMemo } from 'react';

import EntriesEditor from '../Forms/EntriesEditor'
import InsertDataForm from '../Components/InsertDataForm';

import DataTable from '../Components/DataTable';

import { useData } from '../Hooks/useData'
import { getNowYYYYMMDD } from '../../common/dateformat';

const options = {
  filters: {
    creation_time: { greater_than_e: getNowYYYYMMDD()} 
  },
  order: { by: 'creation_time'},
  limit: 50, offset: 0
}

export default function Edit() {

  const {data} = useData('entries_view', options, true)

  useEffect(() => {
    console.log('mounting')
    return (()=> console.log('unmounting'))
  }, [])

  return (<>
    <h2>Agregar movimiento</h2>
    <InsertDataForm tableName='entries' editorForm={EntriesEditor} />
    { data && 
      <>
      <h2>Creadas hoy:</h2>
      <DataTable 
        data={data}
        tableName='entries_view' 
        columns={[
          { header: 'Período',    field: 'period' },
          { header: 'Fecha',      field: 'date' },
          { header: 'Cuenta',     field: 'wallet_name' },
          { header: 'Monto',      field: 'amount' },
          { header: 'Categoría',  field: 'tag_name' },
          { header: 'Contacto',   field: 'contact_name' },
        ]}
      />
      </>
    }
  </>)
};
