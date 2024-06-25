import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Landing,
  },
  {
    path: '/home',
    Component: Home,
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
