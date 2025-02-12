import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login"; 
import Register from "./Pages/Register"; 
import Rooms from "./Pages/rooms/Rooms";
import RoomDetail from "./Pages/rooms/RoomDetail"
import Description from "./Pages/rooms/Description"
import Photos from "./Pages/rooms/Photos"
import Location from "./Pages/rooms/Location"
import Dashboard from "./Pages/host/Dashboard";
import NotFound from "./Pages/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="host" element={<Dashboard />} />
      <Route path="about" element={<About />} />
      <Route path="rooms" element={<Rooms />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="rooms/:id" element={<RoomDetail />}>
        <Route index element={<Description />} />
        <Route path="description" element={<Description />} />
        <Route path="photos" element={<Photos />} />
        <Route path="location" element={<Location />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}