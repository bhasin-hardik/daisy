import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cab1 from '../../assets/cab1.png';
import cab2 from '../../assets/cab2.png';
import cab3 from '../../assets/cab3.png';
import cab4 from '../../assets/cab4.png';
import a from '../../assets/a.png';
import b from '../../assets/b.png';
import either from '../../assets/either.png';
import { useCabinetsContext } from './CabinetsContext';

const Cabinets: React.FC = () => {
  const imageSpacing = 10; // Adjust this value as needed
  const navigate = useNavigate();
  const { selectedImages, toggleSelection } = useCabinetsContext();

  // Function to toggle the selection status of an image for a specific cabinet
  const toggleSelectionForCabinet = (cabinet: string, image: string) => {
    toggleSelection(cabinet, image);
  };

  // Function to handle image selection for a specific cabinet
  // Function to handle image selection for a specific cabinet
  const handleImageSelection = (cabinet: string, image: string) => {
    const currentSelection = selectedImages[cabinet];

    // If the current selection is the same as the clicked image, deselect it
    if (currentSelection === image) {
      
      toggleSelectionForCabinet(cabinet, ''); // You can use null or any other value to represent no selection
    } else {
      toggleSelectionForCabinet(cabinet, image);
    }
  };

  // Function to get the CSS class for selected or deselected images
  const getImageClass = (isSelected: boolean) => {
    return isSelected ? 'selectedImage' : 'deselectedImage';
  };

  const handleSubmit = () => {
    navigate('/overview');
  }
  
  // Define your cabinet and image data
  const cabinets = [
    { name: 'cabinet1', image: cab1 },
    { name: 'cabinet2', image: cab2 },
    { name: 'cabinet3', image: cab3 },
    { name: 'cabinet4', image: cab4 },
  ];

  const images = [
    { name: 'a', label: 'Image A' },
    { name: 'b', label: 'Image B' },
    { name: 'either', label: 'Either' },
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg" style={{ width: '1101px', height: '90px', marginTop: '180px', marginLeft: '169px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '28px' }}>
        <div style={{ width: '449px', height: '88px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '449px', height: '52px', background: 'none', fontFamily: 'Actor', fontSize: '30px', fontWeight: 400, lineHeight: '36px', letterSpacing: '-0.02em', textAlign: 'center' }}>Specialty Cabinets:</div>
          <div style={{ width: '426px', height: '36px', background: 'none', fontFamily: 'Actor', fontSize: '18px', fontWeight: 400, lineHeight: '26px', letterSpacing: '-0.02em', textAlign: 'center', color: '#656362' }}>Please select any specialty cabinets you would like to add to your kitchen.</div>
        </div>
        <div style={{ width: '137px', height: '21px', marginTop: '70px', top: '365px', left: '475px', fontFamily: 'Actor', fontSize: '16px', fontWeight: 400, lineHeight: '20px', letterSpacing: '-0.02em', textAlign: 'center', position: 'absolute' }}>Specialty Cabinet</div>
        <div style={{ width: '105px', height: '21px', marginTop: '70px', top: '365px', left: '871px', fontFamily: 'Actor', fontSize: '16px', fontWeight: 400, lineHeight: '20px', letterSpacing: '-0.02em', textAlign: 'center', position: 'absolute' }}>Wall preference</div>

        {cabinets.map((cabinet, index) => (
          <React.Fragment key={cabinet.name}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', top: `${490 + 80 * index}px`, left: '830px', gap: '40px' }}>
              {images.map((image) => (
                <img
                  key={image.name}
                  src={image.name === 'a' ? a : image.name === 'b' ? b : either}
                  alt={image.name}
                  style={{
                    border: selectedImages[cabinet.name] === image.name ? '2px solid #7F56D9' : '2px solid transparent',
                  }}
                  onClick={() => handleImageSelection(cabinet.name, image.name)}
                />
              ))}
            </div>
            <div style={{ position: 'absolute', top: `${490 + 80 * index}px`, left: '475px' }}>
              <img src={cabinet.image} alt={cabinet.name} />
            </div>
          </React.Fragment>
        ))}

        <button
          onClick={handleSubmit}
          className="w-80 h-12 mt-4 rounded-md text-white"
          style={{ background: '#7F56D9', position: 'absolute', top: '850px', bottom: '20px', left: '800px', transform: 'translateX(-50%)' }}
        >
          Submit Details
        </button>
      </div>
    </div>
  );
};

export default Cabinets;
