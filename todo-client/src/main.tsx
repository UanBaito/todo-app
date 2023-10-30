import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./Login";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<div>Hello world</div>} path="/"></Route>
      <Route element={<Login />} path="/login" />
    </>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
);
