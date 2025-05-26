import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar bg-base-100 border-b border-gray-700">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl normal-case">Smooth IT</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link className="hover:text-primary">About</Link></li>
          <li><Link className="hover:text-primary">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;