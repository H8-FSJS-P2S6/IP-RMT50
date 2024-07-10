import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from `react-redux`
import store from `./store`
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
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
