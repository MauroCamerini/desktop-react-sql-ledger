import React from "react";

import Accordion from 'react-bootstrap/Accordion';

export default function AccordionContainer({header, children}) {
  return(
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{header}</Accordion.Header>
        <Accordion.Body>
          {children}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}