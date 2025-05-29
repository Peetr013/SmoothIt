import React from 'react';
import './HomePage.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Jahoda from '../../assets/jahoda.png';
import pozadi from '../../assets/ovoce_LE_upscale_balanced_x4.jpg';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div
      className="flex flex-col min-h-screen text-white"
      style={{
        backgroundImage: `url(${pozadi})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-green-700 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center animate-fade-in-up border-4 border-white">
          <Link to="/orderPage" className="group cursor-pointer flex flex-col items-center space-y-4">
            <span className="text-3xl font-extrabold tracking-wider text-white group-hover:text-pink-400 transition-colors duration-300">
              Objednat Smoothie
            </span>
            <img
              src={Jahoda}
              alt="Smoothie Strawberry"
              className="w-48 h-48 object-contain animate-spin-slow transform group-hover:scale-105 transition-transform duration-500 drop-shadow-lg"
            />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
