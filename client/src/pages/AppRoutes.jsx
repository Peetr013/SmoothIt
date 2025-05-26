import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import Home from "./Home";
import OrderPage from "./Orderpage/OrderPage";
import Employee from "./Home/Empoyee/Employee";

export default function AppRoutes() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/employee" element={<Employee/>}/>
                <Route path="/orderPage" element={<OrderPage/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}
