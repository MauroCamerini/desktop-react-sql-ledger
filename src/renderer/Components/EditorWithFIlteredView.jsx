import React, { useState } from 'react';

import ViewData from './ViewData';
import AccordionContainer from './AccordionContainer';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';



export default function EditorWithFilteredView({tableName, viewName, columns, editorForm, filtersForm}) {

  const [key, setKey] = useState('create');

  const [filters, setFilters] = useState({})

  const handleCreateFormSubmit = (data) => {
    window.api.insertData(tableName, data)
  } 

  return (<>

    <Tabs
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey='create' title='Agregar'>
        {
          React.createElement(editorForm, {onSubmit: handleCreateFormSubmit })
        }
      </Tab>
      <Tab eventKey="filter" title="Filtrar">
        <AccordionContainer header="Filtros">
          {
            React.createElement(filtersForm, {onSubmit: (newFilters) => setFilters(newFilters)})
          }
        </AccordionContainer>
        <ViewData 
          tableName={viewName}
          filters={filters}
          columns={columns}
          controls
        />
      </Tab>
    </Tabs>



  </>)
};
