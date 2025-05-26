import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import Home from "./Home";
import OrderPage from "./Orderpage/OrderPage";

export default function AppRoutes() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                
                <Route path="/orderPage" element={<OrderPage/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}
