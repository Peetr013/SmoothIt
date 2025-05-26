import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import Home from "./Home";
import OrderPage from "./Orderpage/OrderPage";
import Employee from "./Empoyee/Employee";
import TYpage from "./TYpage/TYpage";

export default function AppRoutes() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/employee" element={<Employee/>}/>
                <Route path="/orderPage" element={<OrderPage/>}/>
                <Route path="/TYpage/:orderId" element={<TYpage/>}/>
                
            </Routes>
        </BrowserRouter>
    </>
  )
}
