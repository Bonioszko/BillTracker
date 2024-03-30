import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import SignIn from "./pages/SignInPage.tsx";
import Login from "./pages/LoginPage.tsx";
import Profile from "./pages/Profile.tsx";
import UserContextProvider from "./context/UserContext.tsx";
const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage></LandingPage>,
        errorElement: <NotFoundPage></NotFoundPage>,
    },
    {
        path: "main",
        element: <App></App>,
    },
    {
        path: "signin",
        element: <SignIn></SignIn>,
    },
    {
        path: "login",
        element: <Login></Login>,
    },
    {
        path: "profile",
        element: <Profile></Profile>,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <UserContextProvider>
            <RouterProvider router={router}></RouterProvider>
        </UserContextProvider>
    </React.StrictMode>
);
