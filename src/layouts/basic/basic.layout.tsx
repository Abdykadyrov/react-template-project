import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthGuard } from 'pages/auth-guard';
import Header from './components/header.component';

const BasicLayout = () => {
  return (
    <AuthGuard>
      <>
        <Header />
        <div className="basicLayout__wrapper">
          <Outlet />
        </div>
      </>
    </AuthGuard>
  );
};

export default BasicLayout;
