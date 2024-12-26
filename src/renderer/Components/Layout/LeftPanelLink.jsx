import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useLocation } from 'react-router';

export default function LeftPanelLink({to, text}) {

  const location = useLocation()

  return (
      <ListGroup.Item 
        as={Link} 
        to={to} 
        active={location.pathname === to} 
        action
        variant={location.pathname === to ? '' : 'light'}>
        {text}
      </ListGroup.Item>
  );
}