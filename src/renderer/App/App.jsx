import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router';
import Router from './Router'
import { ApiProvider } from '../Context/ApiContext';


const root = createRoot(document.getElementById('app'));

root.render(<>
  <ApiProvider>
    <MemoryRouter>
      <Router />
    </MemoryRouter>
  </ApiProvider>
</>);
