import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-800 to-green-300 text-white py-8 border-t border-green-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="text-lg font-bold">
            Smooth IT © {new Date().getFullYear()}
          </div>
          <div className="text-sm">
            Made with 💚 by Smooth IT
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
