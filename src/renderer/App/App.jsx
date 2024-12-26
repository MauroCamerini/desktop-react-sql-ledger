import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router';
import Router from './Router'


const root = createRoot(document.getElementById('app'));

root.render(<>
  <MemoryRouter>
    <Router />
  </MemoryRouter>
</>);
