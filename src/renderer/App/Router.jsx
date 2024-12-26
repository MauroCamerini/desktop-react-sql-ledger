import * as React from 'react';
import { Route, Routes } from 'react-router'

import Layout from './Layout';

import Test from '../Pages/Test'
import Entries from '../Pages/Entries'

export default function Router() {
    return (
        <Routes>
        <Route path='/' element={<Layout />}>
            <Route index element={<Test />} />
            <Route path='entries' element={<Entries />} />
        </Route>
        </Routes>
    )
    
}