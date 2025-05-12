import type { JSX } from 'react';
import { Route, Routes } from 'react-router';
import { SignInPage } from '../pages';

export function MainRoutes(): JSX.Element {
  return (
    <Routes>
      <Route index element={<SignInPage />} />
    </Routes>
  );
}
