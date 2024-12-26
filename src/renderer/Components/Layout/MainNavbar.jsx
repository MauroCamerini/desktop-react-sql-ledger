import React from 'react';
import Container from 'react-bootstrap/Container';
import BSNavbar from 'react-bootstrap/Navbar';


export default function Navbar() {
  return (
    <BSNavbar className="bg-dark px-5">
    <Container fluid>
      <BSNavbar.Brand className="text-light">Desktop React SQL Ledger</BSNavbar.Brand>
    </Container>
    </BSNavbar>
  );
}