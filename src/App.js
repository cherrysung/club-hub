import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Club from './pages/Club';
import ClubDetail from './pages/ClubDetail';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Recommend from './pages/Recommend';

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
    children: [
      {
        path: ':clubId',
        Component: ClubDetail,
      },
    ],
  },
  {
    path: '/signup',
    Component: SignUp,
  },
  {
    path: '/recommend',
    Component: Recommend,
  },
  {
    path: '/profile',
    Component: Profile,
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
