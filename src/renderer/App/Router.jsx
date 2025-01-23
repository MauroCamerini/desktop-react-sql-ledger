import * as React from 'react';
import { Route, Routes } from 'react-router'

import Layout from './Layout';

import Home from '../Pages/Home'
import EntriesAdd from '../Pages/EntriesAdd'
import Tags from '../Pages/Tags'
import Wallets from '../Pages/Wallets'
import Contacts from '../Pages/Contacts'
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
            <Route path='tags' element={<Tags />} />
            <Route path='wallets' element={<Wallets />} />
            <Route path='contacts' element={<Contacts />} />
        </Route>
        </Routes>
    )
    
}