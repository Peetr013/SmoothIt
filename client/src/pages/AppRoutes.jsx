import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import Home from "./Home";
import CarCreateForm from "./CarCreateForm";
import CarList from "./CarList";
import CarView from "./CarView";
import CarUpdateForm from "./CarUpdateForm";

export default function AppRoutes() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/add-car" element={<CarCreateForm/>}/>
                <Route path="/view-cars" element={<CarList/>}/>
                <Route path="/car/:id" element={<CarView/>}/>
                <Route path="/update-car/:id" element={<CarUpdateForm/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}
