import React from "react";
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function RowControls({dataRow, onDeleteClick, onUpdateClick}) {
  return (
    <ButtonGroup aria-label="Basic example">
    <Button 
      size='sm' 
      variant='outline-success' 
      onClick={() => {if(onUpdateClick) onUpdateClick(dataRow)}}>
        Cambiar
    </Button>
    <Button 
      size='sm' 
      variant='outline-danger' 
      onClick={() => {if(onDeleteClick) onDeleteClick(dataRow)}}>
        Borrar
    </Button>
    </ButtonGroup>
  )
}