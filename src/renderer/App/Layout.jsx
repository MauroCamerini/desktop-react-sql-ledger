import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Layout/MainNavbar';
import LeftPanel from '../Components/Layout/LeftPanel';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Layout() {
  return(<>
    <Container fluid className="mx-0 px-0 vh-100">
    <Navbar />
    <Container className="bg-light h-100" fluid>
      <Row className="h-100" >
        <Col xs={3} md={2} className='mx-0 px-0 border-end border-2' >
          <LeftPanel />
        </Col>
        <Col className="d-flex flex-column p-3">
          <Outlet />
        </Col>
      </Row>
    </Container>
    </Container>
  </>)
}
