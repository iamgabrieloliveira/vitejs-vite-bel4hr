import React from "react";
import { Routes, Route } from "react-router-dom";
import {Home} from './pages/Home'
import Login from './pages/Login'

export default function MainRoutes() {
  return(
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
  );
}


