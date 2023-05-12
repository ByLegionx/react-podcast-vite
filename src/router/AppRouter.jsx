import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { ActualView } from '../podcast/pages/ActualView';
import { PodCastRoutes } from '../podcast/routes/PodCastRoutes';

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ActualView />} />
        <Route path="/*" element={<PodCastRoutes />} />
      </Routes>
    </>
  );
};
