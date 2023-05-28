import React from "react";
import ReactDOM from "react-dom/client";
import SearchNews from "./SearchNews.jsx";
import FilterSearch from "./FilterSearch.jsx";
import Chat from "./ChatGPT.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';
import LandingMain from "./landing/LandingMain.jsx";
import LandingProject from "./landing/LandingProject.jsx";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #1e1e1e;
  }
`;

const router = createBrowserRouter([
  {
    path: "/home",
    element: <FilterSearch />,
  },
  {
    path: "/result/:keyword",
    element: <SearchNews />,
  },
  {
    path: "/ask",
    element: <Chat />,
  },
  {
    path: "/",
    element: <LandingMain />
  },
  {
    path: "/project",
    element: <LandingProject />
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyle/>
    <RouterProvider router={router} />
  </React.StrictMode>
);
