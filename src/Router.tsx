import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Station from './pages/Station';

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/station/:id" element={<Station />} />
      <Route element={<NoMatch />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
