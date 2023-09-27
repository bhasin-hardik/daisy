import React, { useState, useEffect } from 'react';
import { useLayoutContext } from '../Layout/LayoutContext';
import Wall from '../Wall/Wall';
import walls from '../../assets/walls.png';
import { useNavigate } from 'react-router-dom';

const Measure: React.FC = () => {
  const navigate = useNavigate();
  const { calculateWallsNeeded } = useLayoutContext();
  const numWalls = calculateWallsNeeded();
  const [isFormValid, setIsFormValid] = useState(false);
  const [validationStatus, setValidationStatus] = useState(Array(numWalls).fill(false));
  const [errorMessage, setErrorMessage] = useState('');
  const [currentObstructionNumber, setCurrentObstructionNumber] = useState(1); // Track the current obstruction number

  useEffect(() => {
    setIsFormValid(validationStatus.every((valid) => valid));
  }, [validationStatus]);

  const handleSubmit = () => {
    if (validationStatus.every((valid) => valid)) {
      // Check if there are more walls to navigate to
      if (currentObstructionNumber <= numWalls) {
        // If there are more walls, increment the obstruction number and navigate
        setCurrentObstructionNumber(currentObstructionNumber + 1);
        navigate(`/obstruction/${currentObstructionNumber}`);
      } 
    } else {
      setErrorMessage('Please fill in all the input fields.');
    }
  };

  const wallInputs = [];

  for (let i = 1; i <= numWalls; i++) {
    wallInputs.push(
      <div key={i}>
        <Wall
          wallName={`Wall ${String.fromCharCode(65 + i - 1)}`}
          onValidationChange={(isValid) => {
            const newValidationStatus = [...validationStatus];
            newValidationStatus[i - 1] = isValid;
            setValidationStatus(newValidationStatus);
          }}
        />
      </div>
    );
  }




  return (
    <div className="flex items-center justify-center">
      <div
        className="bg-white p-8 text-center"
        style={{
          maxWidth: '100%',
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
            width: '100%',
            maxWidth: '584px',
            margin: 'auto',
          }}
        />
        <div style={{ marginTop: '20px' }}>
          {wallInputs}
        </div>

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
