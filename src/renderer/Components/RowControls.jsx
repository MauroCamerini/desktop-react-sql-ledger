import React from "react";
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function RowControls({dataRow, onDeleteClick, onUpdateClick}) {
  return (
    <ButtonGroup>
    <Button 
      size='sm' 
      variant='link' 
      onClick={() => {if(onUpdateClick) onUpdateClick(dataRow)}}>
        Cambiar
    </Button>
    <Button 
      size='sm' 
      variant='link' 
      onClick={() => {if(onDeleteClick) onDeleteClick(dataRow)}}>
        Borrar
    </Button>
    </ButtonGroup>
  )
}