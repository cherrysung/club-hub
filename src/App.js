import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Landing,
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
