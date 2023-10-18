import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Layout.css';
import { motion } from 'framer-motion'
const Layout: React.FC = () => {
  const getSelectedImageFromLocalStorage = () => {
    return localStorage.getItem('selectedImage');
  };
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(getSelectedImageFromLocalStorage());
  const [wallsNeeded, setWallsNeeded] = useState<number | null>(null); // Initialize to null
  console.log(wallsNeeded);

  const setSelectedImageInLocalStorage = (imageId: string) => {
    localStorage.setItem('selectedImage', imageId);
  };

  const handleImageClick = (imageId: string) => {
    if (selectedImage === imageId) {
      // If the clicked image is already selected, deselect it
      setSelectedImage(null);
      setWallsNeeded(null); // Reset the wallsNeeded when image is deselected
    } else {
      // Otherwise, select the clicked image
      setSelectedImage(imageId);
      calculateWallsNeeded(imageId); // Calculate wallsNeeded when image is selected
    }
    setSelectedImageInLocalStorage(imageId);
  };

  const calculateWallsNeeded = (imageId: string) => {
    // Implement your logic to calculate the number of walls needed
    // For example, you can have a mapping of layouts to the number of walls
    const layoutToWallsMap: { [key: string]: number } = {
      img1: 1,
      img2: 2,
      img3: 2,
      img4: 3,
      img5: 2,
      img6: 3
      // Add more mappings as needed
    };

    const walls = layoutToWallsMap[imageId] || 0;
    setWallsNeeded(walls); // Update wallsNeeded state
    // Store wallsNeeded in local storage
    localStorage.setItem('wallsNeeded', JSON.stringify(walls));
  };

  const handleSubmit = () => {
    if (selectedImage) {
      navigate('/measurements');
    }
  };

  const getFillColor = (imageId: string) => {
    return selectedImage === imageId ? 'rgba(132, 255, 174, 1.3)' : 'rgba(249, 250, 251, 1.3)';
  };
  const getStroke = (imageId: string) => {
    return selectedImage === imageId ? 'black' : '#615D5A';
  }

  return (
    <motion.div className="flex items-center justify-center main-contain"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    >
      <div className="bg-white p-8 text-center">
        {/* Heading */}
        <h1 className="text-3xl font-medium font-actor mb-2">
          Select your kitchen layout
        </h1>

        {/* Subheading */}
        <p className="text-gray-500 text-sm font-actor mb-4">
          Choose the one that best matches your vision
        </p>

        {/* Image selection */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">

          <div
            className={'block cursor-pointer boxer'}

            onClick={() => { handleImageClick('img1'); }}
          >
            <svg
              width="100%" // Make the SVG responsive to its container's width
              height="auto" // Automatically adjust the height to maintain aspect ratio
              viewBox="0 0 193 192"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0.5 7C0.5 3.134 3.63401 0 7.5 0H185.5C189.366 0 192.5 3.13401 192.5 7V185C192.5 188.866 189.366 192 185.5 192H7.5C3.634 192 0.5 188.866 0.5 185V7Z" fill={getFillColor('img1')} />
              <rect x="31.5" y="80" width="130" height="32" rx="3" stroke={getStroke('img1')} strokeWidth="2" />
              <rect x="37.5" y="86" width="28" height="28" rx="3" fill={getFillColor('img1')} stroke={getStroke('img1')} strokeWidth="2" />
              <rect x="85.5" y="88" width="21" height="16" rx="3" stroke={getStroke('img1')} strokeWidth="2" />
              <circle cx="96" cy="96" r="1.625" fill={getFillColor('img1')} stroke={getStroke('img1')} strokeWidth="0.75" />
              <rect x="127.5" y="85" width="24" height="21" rx="3" stroke={getStroke('img1')} strokeWidth="2" />
              <circle cx="144.5" cy="90.5" r="3.125" stroke={getStroke('img1')} strokeWidth="0.75" />
              <circle cx="144.5" cy="100.5" r="3.125" stroke={getStroke('img1')} strokeWidth="0.75" />
              <circle cx="134.5" cy="90.5" r="3.125" stroke={getStroke('img1')} strokeWidth="0.75" />
              <circle cx="134.5" cy="100.5" r="3.125" stroke={getStroke('img1')} strokeWidth="0.75" />
            </svg>
          </div>
          <div
            className={'block cursor-pointer boxer'}

            onClick={() => { handleImageClick('img2'); }}
          >
            <svg
              width="100%" // Make the SVG responsive to its container's width
              height="auto" // Automatically adjust the height to maintain aspect ratio
              viewBox="0 0 193 192"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0.5 7C0.5 3.134 3.63401 0 7.5 0H185.5C189.366 0 192.5 3.13401 192.5 7V185C192.5 188.866 189.366 192 185.5 192H7.5C3.634 192 0.5 188.866 0.5 185V7Z" fill={getFillColor('img2')} />
              <rect x="31.5" y="50" width="130" height="32" rx="3" stroke={getStroke('img2')} strokeWidth="2" />
              <rect x="31.5" y="109" width="130" height="32" rx="3" stroke={getStroke('img2')} strokeWidth="2" />
              <rect x="38.5" y="56" width="28" height="28" rx="3" fill={getFillColor('img2')} stroke={getStroke('img2')} strokeWidth="2" />
              <rect x="89.5" y="58" width="21" height="16" rx="3" stroke={getStroke('img2')} strokeWidth="2" />
              <circle cx="100" cy="66" r="1.125" stroke={getStroke('img2')} strokeWidth="0.75" />
              <rect x="84.5" y="114" width="24" height="21" rx="3" stroke={getStroke('img2')} strokeWidth="2" />
              <circle cx="101.5" cy="119.5" r="3.125" stroke={getStroke('img2')} strokeWidth="0.75" />
              <circle cx="101.5" cy="129.5" r="3.125" stroke={getStroke('img2')} strokeWidth="0.75" />
              <circle cx="91.5" cy="119.5" r="3.125" stroke={getStroke('img2')} strokeWidth="0.75" />
              <circle cx="91.5" cy="129.5" r="3.125" stroke={getStroke('img2')} strokeWidth="0.75" />
            </svg>
          </div>
          <div
            className={'block cursor-pointer boxer'}

            onClick={() => { handleImageClick('img3'); }}
          >
            <svg
              width="100%" // Make the SVG responsive to its container's width
              height="auto" // Automatically adjust the height to maintain aspect ratio
              viewBox="0 0 193 192"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0.5 7C0.5 3.134 3.63401 0 7.5 0H185.5C189.366 0 192.5 3.13401 192.5 7V185C192.5 188.866 189.366 192 185.5 192H7.5C3.634 192 0.5 188.866 0.5 185V7Z" fill={getFillColor('img3')} />
              <path d="M148 40H35.5C33.2909 40 31.5 41.7909 31.5 44V64.5C31.5 66.7091 33.2909 68.5 35.5 68.5H116C118.209 68.5 120 70.2909 120 72.5V147C120 149.209 121.791 151 124 151H148C150.209 151 152 149.209 152 147V44C152 41.7909 150.209 40 148 40Z" stroke={getStroke('img3')} strokeWidth="2" />
              <rect x="39.5" y="45" width="28" height="28" rx="3" fill={getFillColor('img3')} stroke={getStroke('img3')} strokeWidth="2" />
              <rect x="127.5" y="101" width="21" height="16" rx="3" transform="rotate(-90 127.5 101)" stroke={getStroke('img3')} strokeWidth="2" />
              <circle cx="135.5" cy="90.5" r="1.125" transform="rotate(-90 135.5 90.5)" stroke={getStroke('img3')} strokeWidth="0.75" />
              <rect x="125.5" y="141" width="24" height="21" rx="3" transform="rotate(-90 125.5 141)" stroke={getStroke('img3')} strokeWidth="2" />
              <circle cx="131" cy="124" r="3.125" transform="rotate(-90 131 124)" stroke={getStroke('img3')} strokeWidth="0.75" />
              <circle cx="141" cy="124" r="3.125" transform="rotate(-90 141 124)" stroke={getStroke('img3')} strokeWidth="0.75" />
              <circle cx="131" cy="134" r="3.125" transform="rotate(-90 131 134)" stroke={getStroke('img3')} strokeWidth="0.75" />
              <circle cx="141" cy="134" r="3.125" transform="rotate(-90 141 134)" stroke={getStroke('img3')} strokeWidth="0.75" />
            </svg>
          </div>
          <div
            className={'block cursor-pointer boxer'}

            onClick={() => { handleImageClick('img4'); }}
          >
           <svg
              width="100%" // Make the SVG responsive to its container's width
              height="auto" // Automatically adjust the height to maintain aspect ratio
              viewBox="0 0 193 192"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0.5 7C0.5 3.134 3.63401 0 7.5 0H185.5C189.366 0 192.5 3.13401 192.5 7V185C192.5 188.866 189.366 192 185.5 192H7.5C3.634 192 0.5 188.866 0.5 185V7Z" fill={getFillColor('img4')} />
              <path d="M152 59H40C37.7909 59 36 60.7909 36 63V135C36 137.209 37.7909 139 40 139H61C63.2091 139 65 137.209 65 135V90.5C65 88.2909 66.7909 86.5 69 86.5H124C126.209 86.5 128 88.2909 128 90.5V135C128 137.209 129.791 139 132 139H152C154.209 139 156 137.209 156 135V63C156 60.7909 154.209 59 152 59Z" stroke={getStroke('img4')} strokeWidth="2" />
              <rect x="122.5" y="134" width="28" height="28" rx="3" transform="rotate(-90 122.5 134)" fill={getFillColor('img4')} stroke={getStroke('img4')} strokeWidth="2" />
              <rect x="85.5" y="65" width="21" height="16" rx="3" stroke={getStroke('img4')} strokeWidth="2" />
              <circle cx="96" cy="73" r="1.125" stroke={getStroke('img4')} strokeWidth="0.75" />
              <rect x="40.5" y="123" width="23" height="20" rx="3" transform="rotate(-90 40.5 123)" stroke={getStroke('img4')} strokeWidth="2" />
              <path d="M45.7175 103.779C47.3575 103.779 48.6903 105.116 48.6903 106.769C48.6903 108.423 47.3575 109.76 45.7175 109.76C44.0775 109.76 42.7446 108.423 42.7446 106.769C42.7446 105.116 44.0775 103.779 45.7175 103.779Z" stroke={getStroke('img4')} strokeWidth="0.75" />
              <path d="M55.2824 103.779C56.9224 103.779 58.2552 105.116 58.2552 106.769C58.2552 108.423 56.9224 109.76 55.2824 109.76C53.6424 109.76 52.3096 108.423 52.3096 106.769C52.3096 105.116 53.6424 103.779 55.2824 103.779Z" stroke={getStroke('img4')} strokeWidth="0.75" />
              <path d="M45.7175 113.394C47.3575 113.394 48.6903 114.731 48.6903 116.385C48.6903 118.038 47.3575 119.375 45.7175 119.375C44.0775 119.375 42.7446 118.038 42.7446 116.385C42.7446 114.731 44.0775 113.394 45.7175 113.394Z" stroke={getStroke('img4')} strokeWidth="0.75" />
              <path d="M55.2824 113.394C56.9224 113.394 58.2552 114.731 58.2552 116.385C58.2552 118.038 56.9224 119.375 55.2824 119.375C53.6424 119.375 52.3096 118.038 52.3096 116.385C52.3096 114.731 53.6424 113.394 55.2824 113.394Z" stroke={getStroke('img4')} strokeWidth="0.75" />
            </svg>
          </div>
          <div
            className={'block cursor-pointer boxer'}

            onClick={() => { handleImageClick('img5'); }}
          >
            <svg
              width="100%" // Make the SVG responsive to its container's width
              height="auto" // Automatically adjust the height to maintain aspect ratio
              viewBox="0 0 193 192"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0.5 7C0.5 3.134 3.63401 0 7.5 0H185.5C189.366 0 192.5 3.13401 192.5 7V185C192.5 188.866 189.366 192 185.5 192H7.5C3.634 192 0.5 188.866 0.5 185V7Z" fill={getFillColor('img5')} />
              <rect x="30.5" y="50" width="130" height="32" rx="3" stroke={getStroke('img5')} strokeWidth="2" />
              <path d="M66.5 109C66.5 107.343 67.8431 106 69.5 106H131.5C133.157 106 134.5 107.343 134.5 109V135C134.5 136.657 133.157 138 131.5 138H69.5C67.8431 138 66.5 136.657 66.5 135V109Z" stroke={getStroke('img5')} strokeWidth="2" />
              <rect x="36.5" y="57" width="28" height="28" rx="3" fill={getFillColor('img5')} stroke={getStroke('img5')} strokeWidth="2" />
              <rect x="89.5" y="110" width="21" height="16" rx="3" stroke={getStroke('img5')} strokeWidth="2" />
              <circle cx="100" cy="118" r="1.125" stroke={getStroke('img5')} strokeWidth="0.75" />
              <rect x="85.5" y="56" width="24" height="21" rx="3" stroke={getStroke('img5')} strokeWidth="2" />
              <circle cx="102.5" cy="61.5" r="3.125" stroke={getStroke('img5')} strokeWidth="0.75" />
              <circle cx="102.5" cy="71.5" r="3.125" stroke={getStroke('img5')} strokeWidth="0.75" />
              <circle cx="92.5" cy="61.5" r="3.125" stroke={getStroke('img5')} strokeWidth="0.75" />
              <circle cx="92.5" cy="71.5" r="3.125" stroke={getStroke('img5')} strokeWidth="0.75" />
            </svg>
          </div>
          <div
            className={'block cursor-pointer boxer'}

            onClick={() => { handleImageClick('img6'); }}
          >
            <svg
              width="100%" // Make the SVG responsive to its container's width
              height="auto" // Automatically adjust the height to maintain aspect ratio
              viewBox="0 0 193 192"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0.5 7C0.5 3.134 3.63401 0 7.5 0H185.5C189.366 0 192.5 3.13401 192.5 7V185C192.5 188.866 189.366 192 185.5 192H7.5C3.634 192 0.5 188.866 0.5 185V7Z" fill={getFillColor('img6')} />
              <path d="M157 40H44.5C42.2909 40 40.5 41.7909 40.5 44V64.5C40.5 66.7091 42.2909 68.5 44.5 68.5H125C127.209 68.5 129 70.2909 129 72.5V147C129 149.209 130.791 151 133 151H157C159.209 151 161 149.209 161 147V44C161 41.7909 159.209 40 157 40Z" stroke={getStroke('img6')} strokeWidth="2" />
              <rect x="67.5" y="140" width="53" height="32" rx="3" transform="rotate(-90 67.5 140)" stroke={getStroke('img6')} strokeWidth="2" />
              <rect x="46.5" y="45" width="28" height="28" rx="3" fill={getFillColor('img6')} stroke={getStroke('img6')} strokeWidth="2" />
              <rect x="95.5" y="101" width="21" height="16" rx="3" transform="rotate(90 95.5 101)" stroke={getStroke('img6')} strokeWidth="2" />
              <circle cx="87.5" cy="111.5" r="1.125" transform="rotate(90 87.5 111.5)" stroke={getStroke('img6')} strokeWidth="0.75" />
              <rect x="134.5" y="122" width="24" height="21" rx="3" transform="rotate(-90 134.5 122)" stroke={getStroke('img6')} strokeWidth="2" />
              <circle cx="140" cy="105" r="3.125" transform="rotate(-90 140 105)" stroke={getStroke('img6')} strokeWidth="0.75" />
              <circle cx="150" cy="105" r="3.125" transform="rotate(-90 150 105)" stroke={getStroke('img6')} strokeWidth="0.75" />
              <circle cx="140" cy="115" r="3.125" transform="rotate(-90 140 115)" stroke={getStroke('img6')} strokeWidth="0.75" />
              <circle cx="150" cy="115" r="3.125" transform="rotate(-90 150 115)" stroke={getStroke('img6')} strokeWidth="0.75" />
            </svg>
          </div>

        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className={` h-12 mt-8 rounded-md mb-10 buton  ${selectedImage
            ? 'text-white cursor-pointer  buton'
            : ' text-white cursor-not-allowed buton'
            } transition-all duration-200 `}
          disabled={!selectedImage}

        >
          {selectedImage ? 'Submit details' : 'Select an image'}
        </button>
      </div>
    </motion.div>
  );
};

export default Layout;
