import React from 'react';
import { Routes, Route } from 'react-router-dom';

import BasicLayout from 'layouts/basic/basic.layout';
import LandingHome from 'pages/landing-home/landing-home.page';
import Auth from 'pages/auth/auth.page';
import Home from 'pages/app/home/home.page';

export default function RoutesIndex() {
  return (
    <Routes>
      <Route path="/" element={<LandingHome />} />
      <Route path="/auth/:type" element={<Auth />} />
      <Route path="/app" element={<BasicLayout />}>
        <Route index element={<Home />} />
        {/*<Route index element={<Navigate to="/app/main" replace />} />*/}
      </Route>
    </Routes>
  );
}
