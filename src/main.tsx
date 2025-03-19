import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

import './index.css';
import Layout from './Layout.tsx';
import Applications from './pages/Applications.tsx';
import NewApplication from './pages/NewApplication.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Applications />} />
          <Route path="/new" element={<NewApplication />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
