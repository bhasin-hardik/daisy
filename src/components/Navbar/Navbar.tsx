import React from 'react';
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';
const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const handelBack = () => {
    navigate(-1);

  }
  return (
    <nav className="bg-white border-b-2 border-gray-200 fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Use the logo image */}
        <img src={logo} alt="Logo" className="h-10" />

        <div className="flex space-x-4">
          {/* "Go back" link with left-pointing arrow icon and custom action */}
          <a onClick={handelBack} className="text-gray-600 hover:text-gray-800 hover:underline flex items-center">
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:'10px'}}>
              <g id="Frame 2">
                <rect width="42" height="42" rx="7.875" fill="#DCDCDC" />
                <path id="Vector 9" d="M21 13L13 21L21 29" stroke="#180A0D" stroke-width="2" />
                <path id="Vector 10" d="M13 21H29" stroke="#180A0D" stroke-width="2" />
              </g>
            </svg>
            Go back
          </a>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
