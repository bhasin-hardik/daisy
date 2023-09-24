import React, { useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useLayoutContext } from './LayoutContext';
import img1 from '../../assets/img1.png';
import img2 from '../../assets/img2.png';
import img3 from '../../assets/img3.png';
import img4 from '../../assets/img4.png';
import img5 from '../../assets/img5.png';
import img6 from '../../assets/img6.png';

const Layout: React.FC = () => {
  // const history = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [submittedImageId, setSubmittedImageId] = useState<string | null>(null);
  const { selectedLayout, setSelectedLayout, calculateWallsNeeded } = useLayoutContext();
 
  const handleImageClick = (imageId: string) => {
    if (selectedImage === imageId) {
      // If the clicked image is already selected, deselect it
      setSelectedImage(null);
      setSelectedLayout(null);
    } else {
      // Otherwise, select the clicked image
      setSelectedImage(imageId);
      setSelectedLayout(imageId);
    }
  };

  const handleSubmit = () => {
    if (selectedImage) {
      // Store the submitted image ID
      const wallsNeeded = calculateWallsNeeded();
      setSubmittedImageId(selectedImage);
      // history('/obstruction');
    }
  };

  const isImageSelected = (imageId: string) => {
    return selectedImage === imageId ? 'border-blue-500' : 'border-gray-200';
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white  p-8 text-center">
        {/* Heading */}
        <h1 className="text-3xl font-medium font-actor mb-2">
          Select your kitchen layout
        </h1>

        {/* Subheading */}
        <p className="text-gray-500 text-sm font-actor mb-4">
          Choose the one that best matches your vision
        </p>

        {/* Image selection */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { id: 'img1', src: img1 },
            { id: 'img2', src: img2 },
            { id: 'img3', src: img3 },
            { id: 'img4', src: img4 },
            { id: 'img5', src: img5 },
            { id: 'img6', src: img6 },
          ].map((imageData) => (
            <div
              key={imageData.id}
              className={`block cursor-pointer`}
              onClick={() => handleImageClick(imageData.id)}
            >
              <img
                src={imageData.src}
                alt={`Kitchen Layout ${imageData.id.substring(3)}`}
                className={`w-32 h-32 border rounded-lg cursor-pointer hover:border-blue-500 ${isImageSelected(
                  imageData.id
                )}`}
              />
            </div>
          ))}
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className={`w-80 h-12 mt-6 rounded-md ${
            selectedImage
              ? 'bg-blue-500 text-white cursor-pointer hover:bg-blue-600'
              : 'bg-gray-300 text-white cursor-not-allowed'
          } transition-all duration-200`}
          disabled={!selectedImage}
          style={{ background: '#7F56D9' }}
        >
          {selectedImage ? 'Submit details' : 'Select an image'}
        </button>

        {/* Display the submitted image ID */}
        
      </div>
    </div>
  );
};

export default Layout;
