import * as React from 'react';
import { Route, Routes } from 'react-router'

import Layout from './Layout';

import Home from '../Pages/Home'
import EntriesAdd from '../Pages/EntriesAdd'
import EntriesView from '../Pages/EntriesView';
import Edit from '../Pages/Edit';

export default function Router() {
    return (
        <Routes>
        <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='entries/view' element={<EntriesView />} />
            <Route path='entries/add' element={<EntriesAdd />} />
            <Route path='edit/:page' element={<Edit />} />
        </Route>
        </Routes>
    )
    
}