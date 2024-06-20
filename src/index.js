import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter,RouterProvider, } from "react-router-dom";
import Home from './pages/Home';
import Crypto from './pages/Crypto';
import Trending from './pages/Trending';
import Saved from './pages/Saved';
import CoinDetails from './components/CoinDetails';
import { HelmetProvider } from 'react-helmet-async';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {      
        path: "/",
        element: <Crypto/>,
      },
      {      
        path: "/:coinId",
        element: <CoinDetails/>,
      },
      {      
        path: "/trending",
        element: <Trending/>,
        /*children: [
          {      
            path: ":coinId",
            element: <CoinDetails/>,
          },
        ]*/
      },
      {      
        path: "/saved",
        element: <Saved/>,
        /*children: [
          {      
            path: ":coinId",
            element: <CoinDetails/>,
          },
        ]*/
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);

