import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
    useNavigate,
} from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';
import Homepage from './pages/Homepage.jsx';
import Demo from "./pages/Demo.jsx";
import Character from "./pages/Characters.jsx";
import Weapon from "./pages/Weapon.jsx";
import Party from "./pages/Party.jsx";
import React from 'react'
import CharacterDetails from "./pages/CharacterDetails.jsx";
import WeaponDetails from "./pages/WeaponDetails.jsx";
import EditTeam from "./pages/EditTeam.jsx";
import AddTeam from "./pages/AddTeam.jsx";
import Register from "./pages/Register.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <Navbar />
                <div>
                    <Homepage />
                </div>
            </>
        )
    },
    {
        path: "/login",
        element: (
            <Login />
        )
    },
    {
        path: "/add-user",
        element: (
            <Register />
        )
    },
    {
        path: "/weapons",
        element: (<>
            <Navbar />
            <Weapon />
        </>
        )
    },
    {
        path: "/weapons/:id",
        element: (<>
            <Navbar />
            <WeaponDetails />
        </>
        )
    },
    {
        path: "/characters",
        element: (<>
            <Navbar />
            <Character />
        </>
        )
    },
    {
        path: "/characters/:id",
        element: (<>
            <Navbar />
            <CharacterDetails />
        </>
        )
    },
    {
        path: "/party",
        element: (<>
            <Navbar />
            <Party />
        </>
        )
    },
    {
        path: "/party/create",
        element: (<>
            <Navbar />
            {/* <Party /> */}
        </>
        )
    },
    {
        path: "/demo",
        element: (<>
            <Navbar />
            <Demo />
        </>
        )
    },
    {
        path: "/party/:id/team/:teamId",
        element: (<>
            <Navbar />
            <EditTeam />
        </>
        )
    },
    {
        path: "/party/:id/team",
        element: (<>
            <Navbar />
            <AddTeam />
        </>
        )
    }
]);

export default router