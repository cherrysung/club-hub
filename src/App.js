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

// const ADVICE_API_URL = 'https://api.adviceslip.com/advice';

function App() {
  //   const [count, setCount] = useState(0);
  //   const [advice, setAdvice] = useState("");

  //   function increment() {
  //     setCount(count + 1);
  //   }

  //   function getAdvice() {
  //     fetch(ADVICE_API_URL).then(function(response) {
  //       return response.json();
  //     }).then(function (data) {
  //       console.log(data);
  //       setAdvice(data.slip.advice)
  //       increment();
  //     });
  //   }

  //   useEffect(function() {
  //     getAdvice();
  //   }, []);

  // return (
  //   <div>
  //     <h1>Hello World</h1>
  //     <CountMessage count={count} />
  //     <CountMessage count={count} />
  //     <CountMessage count={count} />
  //     <button onClick={increment}>add</button>
  //     <p>{advice}</p>
  //     <button onClick={getAdvice}>get new advice</button>
  //   </div>
  // )
  return (
    <RouterProvider
      router={router}
      fallbackElement={<p>...Initial load...</p>}
    />
  );
}
export default App;
