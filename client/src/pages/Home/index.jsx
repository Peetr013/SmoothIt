import React from 'react';
import './HomePage.css'; // Importujeme CSS pro animaci
import Navbar from '../../components/Navbar';
import Jahoda from '../../assets/jahoda.png'
import { Link } from 'react-router-dom';

// Předpokládáme, že máš obrázek jahody v public/images/strawberry.png
// Nebo si ho dej do src a importuj: import strawberryImage from '../assets/strawberry.png';

const HomePage = () => {
  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-gray-800 text-white"> {/* Předpokládáme výšku navbaru 64px */}
      <div className="relative">
        <Link to="/orderPage" className="flex flex-col items-center group">
          <span className="text-xl mb-4 font-bold tracking-wide text-primary">objednat</span>
          <img
            src={Jahoda} // Cesta k obrázku jahody
            alt="Smoothie Strawberry"
            className="w-64 h-64 object-contain animate-spin-slow cursor-pointer"
          />
        </Link>
      </div>
    </div>
    </>
  );
};

export default HomePage;