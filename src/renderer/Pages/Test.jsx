import React from 'react';
import EntriesFilters from '../Forms/EntriesFilters'
import DataView from '../Components/DataView';

const Test = () => {

  return (
    <>
      <DataView 
        tableName='entries_view' 
        filtersForm={EntriesFilters} 
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
  );
};

export default Test;
