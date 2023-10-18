import React from 'react';
import logo from '../../assets/logo.svg'
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css'
const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate(-1);
  }

  const isHomePage = location.pathname === '/';

  return (
    <nav className="bg-white border-b-2 border-gray-200 fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Use the logo image */}
        <img src={logo} alt="Logo" className="h-10" />

        <div className="flex space-x-4">
          {!isHomePage && (
            // "Go back" link with left-pointing arrow icon and custom action
            <a
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-800 hover:underline cursor-pointer flex items-center"
              /* Add the "cursor-pointer" class to change cursor on hover */
            >
              <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" className='svg-icon' >
                <g id="Frame 2">
                  <rect width="42" height="42" rx="7.875" fill="#DCDCDC" />
                  <path id="Vector 9" d="M21 13L13 21L21 29" stroke="#180A0D" strokeWidth="2" />
                  <path id="Vector 10" d="M13 21H29" stroke="#180A0D" strokeWidth="2" />
                </g>
              </svg>
              Go back
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
