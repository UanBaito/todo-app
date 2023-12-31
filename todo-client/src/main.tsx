import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import Register from "./Register";
import Home from "./Home";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Home/>} path="/"></Route>
      <Route element={<Login />} path="/login" />
      <Route element={<Dashboard />} path="/dashboard" />
      <Route element={<Register />} path="/register" />
    </>,
  ),
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </App>
  </React.StrictMode>,
);
