import React from 'react'
import ReactDOM from 'react-dom/client'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import YouTuberDetailsPage from './pages/details';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <>
    <Login />
    </>,
  },
  {
    path: "/",
    element: <>
    <Homepage />
    </>,
  },
  {
    path: "/details",
    element: <>
    <YouTuberDetailsPage />
    </>,
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
