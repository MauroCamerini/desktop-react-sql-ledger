import React from 'react'
import Table from 'react-bootstrap/Table'

import Container from 'react-bootstrap/Container'
import RowControls from './RowControls'

export default function DataTable({data, columns, controls, onDeleteClick, onUpdateClick, keyField}) {
  return (
    <Container>
    <Table striped size="sm">
      <thead>
        <tr>
          {columns.map(({field, header}) => <th key={field}>{header}</th>)}
          {controls && <th></th>}
        </tr>
      </thead>
      <tbody>
        {data.map((dataRow) => 
          <tr key={dataRow[keyField || 'id']}>
            {columns.map(({field}) => <td key={field}>{dataRow[field]}</td>)}
            {controls && 
              <td style={{width: '1%', whiteSpace: 'nowrap'}}>
                <RowControls dataRow={dataRow} onDeleteClick={onDeleteClick} onUpdateClick={onUpdateClick} />
              </td>
            }
          </tr>
        )}
      </tbody>
    </Table>
    </Container>
  )
}