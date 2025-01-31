import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import LeftPanelLink from './LeftPanelLink';

export default function LeftPanel() {

  return (
    <ListGroup variant='flush'>
      <LeftPanelLink to='/' text='Inicio' />

      <span className='mt-1 ps-1 fw-medium'>Movimientos</span>
      <ListGroup variant='flush'>
        <LeftPanelLink to='/entries/add' text='Cargar' />
        <LeftPanelLink to='/entries/view' text='Listar' />
      </ListGroup>

      <span className='mt-1 ps-1 fw-medium'>Listas</span>
      <LeftPanelLink to='/edit/tags' text='Categorías' />
      <LeftPanelLink to='/edit/wallets' text='Cuentas' />
      <LeftPanelLink to='/edit/contacts' text='Contactos' />

      <span className='mt-1 ps-1 fw-medium'>Reportes</span>
    </ListGroup>
  );
}