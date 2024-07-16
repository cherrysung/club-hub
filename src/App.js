import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import Club from './pages/Club';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Landing,
  },
  {
    path: '/home',
    Component: Home,
  },
  {
    path: '/club',
    Component: Club,
  },
]);

function App() {
  
  return (
    <RouterProvider
      router={router}
      fallbackElement={<p>...Initial load...</p>}
    />
  );
}
export default App;
