import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import LeftPanelLink from './LeftPanelLink';

export default function LeftPanel() {

  return (
    <ListGroup variant='flush'>
      <LeftPanelLink to='/' text='Inicio' />
      <LeftPanelLink to='/entries' text='Movimientos' />
      <LeftPanelLink to='/tags' text='Categorías' />
    </ListGroup>
  );
}