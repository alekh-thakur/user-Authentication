import React from "react";
import ReactDOM from "react-dom/client";
import SignUp from "./src/SignUp";
import SignIn from "./src/SignIn";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./src/Welcome";

const App = () =>{
    return(
    
        <div>
            <SignUp/>
        </div>
    )
}

const appRouter = createBrowserRouter([
    {
        path:'/',
        element:<SignUp/>
    },
    {
        path:'/signUp',
        element: <SignUp/>,
    },
    {
        path:'/signIn',
        element: <SignIn/>
    },
    {
        path:'/welcome',
        element:<Welcome/>
    }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>)