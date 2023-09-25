import React from 'react';
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';
const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const handelBack = () => {
    navigate(-1);

  }
  return (
    <nav className="bg-white border-b-2 border-gray-200">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Use the logo image */}
        <img src={logo} alt="Logo" className="h-10" />

        <div className="flex space-x-4">
          {/* "Go back" link with left-pointing arrow icon and custom action */}
          <a onClick={handelBack} className="text-gray-600 hover:text-gray-800 hover:underline flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transform -rotate-180"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L11.586 10 7.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Go back
          </a>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
