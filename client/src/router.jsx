import {
    createBrowserRouter,
    redirect,
  } from "react-router-dom";
  
  import HomePage from "./Pages/HomePage";
  import Register from "./Pages/Register";
  import Login from "./Pages/Login";
  // import AddGrocery from "./pages/AddGrocery"
  export const router = createBrowserRouter([
    
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
      loader: () => {
        const token = localStorage.getItem("access_token");
        if (token) {
          throw redirect("/");
        }
        return null;
      },
      
    },
    // {
      // path: "/add-grocery",
      // element: <AddGrocery />,
    // },
  ]);
  