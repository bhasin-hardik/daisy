import React, { useState } from 'react';
import Wall from '../Wall/Wall';
import './Measure.css'
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';
type WallMeasurements = {
  length: number;
  height: number;
};

const Measure: React.FC = () => {
  const navigate = useNavigate();

  const wallsNeededFromStorage = JSON.parse(localStorage.getItem('wallsNeeded') || 'null');

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
  const [wallFocus, setWallFocus] = useState<boolean[]>(Array(wallsNeededFromStorage).fill(false));

 
  const [errorMessage, setErrorMessage] = useState('');
  const [currentObstructionNumber, setCurrentObstructionNumber] = useState(1);

  const isWallA = (wallNumber: number, isFocused: boolean) => {
    return isFocused ? '#05EA45' : '#898484';
    console.log(wallNumber);
  };
  
  

  const saveWallMeasurementsToLocalStorage = (wallIndex: number, measurements: WallMeasurements) => {
    localStorage.setItem(`wallMeasurements_${wallIndex + 1}`, JSON.stringify(measurements));
  };


  const handleSubmit = () => {
    if (validationStatus.every((valid) => valid)) {
      const hasNegativeNumbers = validationStatus.some((isValid, index) => {
        const { length, height } = JSON.parse(
          localStorage.getItem(`wallMeasurements_${index + 1}`) || '{}'
        );
        return !isValid || length < 0 || height < 0;
      });

      if (hasNegativeNumbers) {
        setErrorMessage('Please enter positive numbers only.');
      } else {
        if (currentObstructionNumber <= wallsNeededFromStorage) {
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
          l={length}
          h={height}
          isFocused={wallFocus[i - 1]} // Pass isFocused prop
          setFocused={(focused) => {
            const newWallFocus = [...wallFocus];
            newWallFocus[i - 1] = focused;
            setWallFocus(newWallFocus);
          }} // Pass setFocused prop
          onValidationChange={(isValid) => {
            const newValidationStatus = [...validationStatus];
            newValidationStatus[i - 1] = isValid;
            setValidationStatus(newValidationStatus);
          }}
          onMeasurementChange={(length, height) => {
            setLength(length);
            setHeight(height);
            if (length < 0 || height < 0) {
              setErrorMessage('Please enter positive numbers only.');
            } else {
              
              setErrorMessage('');
            }
            saveWallMeasurementsToLocalStorage(i - 1, { length, height });
          }}
          
        />
      </div>
    );

  }
  const isEitherWallFocused = wallFocus[0] || wallFocus[1];
 



  return (
    <motion.div 
    className="flex items-center justify-center main-container" 
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    >
      <div
        className="bg-white p-8 text-center mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20 cont"
        
      >
        <div
          className='head-box'
        > 
          <h1 className="text-3xl font-medium font-actor mb-2">
            That’s an awesome kitchen. Let’s design it!
          </h1>
          <p className="text-gray-500 text-sm font-actor mb-4">
            Enter the measurements for the highlighted wall.
          </p>
        </div>
       
       
        <svg width="100%" height="auto" viewBox="0 0 584 372" fill="none" xmlns="http://www.w3.org/2000/svg" className='svg-wall'>
          <path d="M441.5 44H143.5C141.291 44 139.5 45.7909 139.5 48V112.919C139.5 115.128 141.291 116.919 143.5 116.919H360.239C362.448 116.919 364.239 118.71 364.239 120.919V324C364.239 326.209 366.029 328 368.239 328H441.5C443.709 328 445.5 326.209 445.5 324V48C445.5 45.7909 443.709 44 441.5 44Z" stroke={isWallA(1, wallFocus[0])} stroke-width="2" />
          <path d="M363 117.5L447 116.994" stroke={isEitherWallFocused ? '#05EA45' : '#898484'} stroke-width="3" />
          <path d="M364.5 117.5C364.896 192.481 364.087 250.519 364.484 325.5" stroke={isWallA(2, wallFocus[1])} stroke-width="3" />
          <path d="M445.5 117C445.897 191.981 445.204 250.019 445.601 325" stroke={isWallA(2, wallFocus[1])}stroke-width="3" />
          <path d="M363.5 328H446" stroke={isWallA(2, wallFocus[1])} stroke-width="3" />
          <path d="M266.951 22.36H268.651L271.291 34.4H271.311L274.811 22.36H276.931L280.391 34.4H280.411L283.031 22.36H284.731L281.591 36H279.471L275.871 23.98H275.851L272.231 36H270.111L266.951 22.36ZM291.507 31.38C291.241 31.3933 290.987 31.4067 290.747 31.42C290.507 31.4333 290.267 31.4533 290.027 31.48C289.801 31.4933 289.594 31.5133 289.407 31.54C288.447 31.66 287.767 31.8733 287.367 32.18C286.967 32.4733 286.767 32.9 286.767 33.46C286.767 33.9267 286.907 34.28 287.187 34.52C287.481 34.7467 287.861 34.86 288.327 34.86C288.967 34.86 289.534 34.7533 290.027 34.54C290.534 34.3133 291.027 34.02 291.507 33.66V31.38ZM291.487 35.06C290.861 35.42 290.274 35.7133 289.727 35.94C289.194 36.1533 288.614 36.26 287.987 36.26C287.094 36.26 286.381 36.0467 285.847 35.62C285.327 35.18 285.067 34.46 285.067 33.46C285.067 32.94 285.201 32.4867 285.467 32.1C285.734 31.7133 286.081 31.3933 286.507 31.14C286.947 30.8733 287.441 30.6667 287.987 30.52C288.534 30.3733 289.094 30.28 289.667 30.24C289.907 30.2133 290.221 30.1933 290.607 30.18C290.994 30.1533 291.294 30.1333 291.507 30.12C291.507 29.6533 291.494 29.24 291.467 28.88C291.441 28.5067 291.361 28.1933 291.227 27.94C291.094 27.6733 290.894 27.4733 290.627 27.34C290.374 27.2067 290.007 27.14 289.527 27.14C289.141 27.14 288.767 27.1667 288.407 27.22C288.047 27.26 287.727 27.3067 287.447 27.36C287.114 27.4267 286.807 27.5 286.527 27.58L286.207 26.2C286.541 26.12 286.901 26.0467 287.287 25.98C287.621 25.9133 288.007 25.86 288.447 25.82C288.887 25.7667 289.361 25.74 289.867 25.74C290.547 25.74 291.094 25.84 291.507 26.04C291.934 26.24 292.261 26.5133 292.487 26.86C292.727 27.1933 292.887 27.58 292.967 28.02C293.061 28.4467 293.107 28.9 293.107 29.38V34.18C293.107 34.3667 293.107 34.5667 293.107 34.78C293.121 34.98 293.134 35.18 293.147 35.38C293.174 35.58 293.201 35.7867 293.227 36L291.687 36.16L291.487 35.06ZM295.527 21.02L297.127 20.84V36H295.527V21.02ZM299.599 21.02L301.199 20.84V36H299.599V21.02ZM311.462 22.36H313.542L318.222 36H316.482L315.282 32.36H309.742L308.522 36H306.782L311.462 22.36ZM314.742 30.76L312.542 23.96H312.482L310.262 30.76H314.742Z" fill="black" />
        </svg>


        <div className='wall'>{wallInputs}</div>

        {errorMessage && (
          <p className='error'>{errorMessage}</p>
        )}
         
 
        <button
          onClick={handleSubmit}
          className=" h-12 mt-8 rounded-md text-white buton"
          
        >
          Submit Details
        </button> 
        
      </div>
     

    </motion.div>
  );
};


export default Measure;
