import React from "react";
import ReactDOM from "react-dom/client";
import SearchNews from "./SearchNews.jsx";
import FilterSearch from "./FilterSearch.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import LandingMain from "./landing/LandingMain.jsx";
import LandingProject from "./landing/LandingProject.jsx";
import ProjectMain from "./project/ProjectMain.jsx";
import Searching from "./project/Searching.jsx";
import Mypage from "./project/Mypage.jsx";
import NotFound from "./project/Components/NotFound.jsx";

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
    path: "/result",
    element: <SearchNews />,
  },
  {
    path: "/",
    element: <LandingMain />,
    errorElement: <NotFound />,
  },
  {
    path: "/project",
    element: <LandingProject />,
  },
  {
    path: "/main",
    element: <ProjectMain />,
  },
  {
    path: "/search",
    element: <Searching />,
  },
  {
    path: "/mypage",
    element: <Mypage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>
);
