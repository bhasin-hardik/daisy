import React, { useState, useEffect } from 'react';
import Wall from '../Wall/Wall';
import walls from '../../assets/walls.png';
import { useNavigate } from 'react-router-dom';
import { useMeasureContext } from './measureContext';
type WallMeasurements = {
  length: number;
  height: number;
};
const Measure: React.FC = () => {
  const navigate = useNavigate();
  
  
  const wallsNeededFromStorage = JSON.parse(localStorage.getItem('wallsNeeded') || 'null');
  const [isFormValid, setIsFormValid] = useState(false);
  const [validationStatus, setValidationStatus] = useState(() => {
    const initialValidationStatus = Array(wallsNeededFromStorage).fill(false);
    for (let i = 1; i <= wallsNeededFromStorage; i++) {
      const localStorageKey = `wallMeasurements_${i}`;
      const storedMeasurements = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
      if (storedMeasurements.length >= 0 && storedMeasurements.height >= 0) {
        initialValidationStatus[i - 1] = true;
      }
    }
    return initialValidationStatus;
  });
  
  const [errorMessage, setErrorMessage] = useState('');
  const [currentObstructionNumber, setCurrentObstructionNumber] = useState(1); // Track the current 
  const { wallMeasurements, setWallMeasurements } = useMeasureContext();
  useEffect(() => {
    setIsFormValid(validationStatus.every((valid) => valid));
  }, [validationStatus]);
  const saveWallMeasurementsToLocalStorage = (wallIndex: number,measurements : WallMeasurements) => {
    localStorage.setItem(`wallMeasurements_${wallIndex+1}`, JSON.stringify(measurements));
  };
  const handleSubmit = () => {
    if (validationStatus.every((valid) => valid)) {
      // Check if there are more walls to navigate to
      const hasNegativeNumbers = wallMeasurements.some(({ length, height }) => length < 0 || height < 0);
      if (hasNegativeNumbers) {
        setErrorMessage('Please enter positive numbers only.');
      } else {
        if (currentObstructionNumber <= wallsNeededFromStorage) {
          // Save the measurements for the current wall in local storage
          const currentWallMeasurements = wallMeasurements[currentObstructionNumber - 1];
          setCurrentObstructionNumber(currentObstructionNumber + 1);
          navigate(`/obstruction/${currentObstructionNumber}`);
        }
      }
    } else {
      setErrorMessage('Please fill in all the input fields.');
    }
  };
  
 

  

  const wallInputs = [];


  for (let i = 1; i <= wallsNeededFromStorage; i++) {
    const localStorageKey = `wallMeasurements_${i}`;
    const storedMeasurements = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
    const [length, setLength] = useState<number | ''>(storedMeasurements.length || '');
    const [height, setHeight] = useState<number | ''>(storedMeasurements.height || '');
    wallInputs.push(
      <div key={i}>
        <Wall
          wallName={`Wall ${String.fromCharCode(65 + i - 1)}`}
          l={length} // Pass the initial state as props to Wall component
          h={height} // Pass the initial state as props to Wall component
          onValidationChange={(isValid) => {
            const newValidationStatus = [...validationStatus];
            newValidationStatus[i - 1] = isValid;
            setValidationStatus(newValidationStatus);
          }}
          onMeasurementChange={(length, height) => {
            if (length < 0 || height < 0) {
              setErrorMessage('Please enter positive numbers only.');
            } else {
              setErrorMessage(''); // Clear the error message if valid input
            }
            // Update the wall measurements in the context when measurements change
            const updatedMeasurements = [...wallMeasurements];
            updatedMeasurements[i - 1] = { length, height };
            setWallMeasurements(updatedMeasurements);
            saveWallMeasurementsToLocalStorage(i-1,updatedMeasurements[i - 1]);
          }}
          
        />
        

      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className="bg-white p-8 text-center mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20"
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
            width: '100%',
            maxWidth: '449px',
            marginBottom: '20px',
            textAlign: 'center',
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
          className="w-full max-w-xl mx-auto"
        />

        <div style={{ marginTop: '20px' }}>{wallInputs}</div>

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
