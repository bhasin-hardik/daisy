import React, { useState } from 'react';
import { useLayoutContext } from '../Layout/LayoutContext';
import Wall from '../Wall/Wall';
import walls from '../../assets/walls.png';
import { useNavigate } from 'react-router-dom';

const Measure: React.FC = () => {
  const navigate = useNavigate();
  const { calculateWallsNeeded } = useLayoutContext();
  const numWalls = calculateWallsNeeded();
  const [isFormValid, setIsFormValid] = useState(false); // State to track form validity
  const [errorMessage, setErrorMessage] = useState(''); // State to store error message

  const handleSubmit = () => {
    if (isFormValid) {
      navigate('/obstruction');
    } else {
      setErrorMessage('Please fill in all the input fields.'); // Set the error message
    }
  };

  const wallInputs = [];

  for (let i = 1; i <= numWalls; i++) {
    wallInputs.push(
      <div key={i}>
        <Wall wallName={`Wall ${String.fromCharCode(65 + i - 1)}`} onValidationChange={setIsFormValid} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className="bg-white p-8 text-center"
        style={{
          maxWidth: '100%', // Set to 100% to fit within the screen
          width: '100%',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '64px',
        }}
      >
        <div
          style={{
            width: '449px',
            height: '98px',
            marginBottom: '20px',
          }}
        >
          <h1 className="text-3xl font-medium font-actor mb-2">
            That’s an awesome kitchen. Let’s design it!
          </h1>
          <p className="text-gray-500 text-sm font-actor mb-4">
            Enter the measurements for the highlighted wall.
          </p>
        </div>

        <img
          src={walls}
          alt="Image Description"
          style={{
            width: '100%', // Set to 100% to fit within the screen
            maxWidth: '584px', // Limit the maximum width if needed
            margin: 'auto',
          }}
        />
        <div style={{ marginTop: '20px' }}>
          {wallInputs}
        </div>

        {/* Conditional rendering of error message */}
        {errorMessage && (
          <p className="text-red-500 mb-2">{errorMessage}</p>
        )}

        <button
          onClick={handleSubmit}
          className="w-80 h-12 mt-2 rounded-md text-white"
          style={{ background: '#7F56D9' }}
        >
          Submit Details
        </button>
      </div>
    </div>
  );
};

export default Measure;
