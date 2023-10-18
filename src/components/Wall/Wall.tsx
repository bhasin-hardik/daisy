import React, { useState, useEffect } from 'react';
import './Wall.css';

interface WallProps {
  wallName: string;
  l: number | '';
  h: number | '';
  onValidationChange: (isValid: boolean) => void;
  onMeasurementChange: (length: number, height: number) => void;
  isFocused: boolean;
  setFocused: (focused: boolean) => void; // New prop to update focus state
}

const Wall: React.FC<WallProps> = ({ wallName, onValidationChange, onMeasurementChange, l, h, setFocused }) => {
  const [length, setLength] = useState<number | ''>(l);
  const [height, setHeight] = useState<number | ''>(h);
  const [isValid, setIsValid] = useState(false);
  console.log(isValid);

  // Event handler for input focus
  const handleFocus = () => {
    setFocused(true);
  };

  // Event handler for input blur
  const handleBlur = () => {
    setFocused(false);
    if (!isNaN(Number(length)) && !isNaN(Number(height))) {
      onMeasurementChange(Number(length), Number(height));
    }
  };

  useEffect(() => {
    // Validation logic remains the same
    const isLengthValid = length !== '';
    const isHeightValid = height !== '';
    const isValid = isLengthValid && isHeightValid;
    setIsValid(isValid);
    onValidationChange(isValid);
  }, [length, height]);

  return (
    <div className='box-1'>
      <div className='box-2'>
        <div className='wall-name'>
          {wallName}:
        </div>
        <div className='input-container'>
          <input
            type="number"
            id={`length_${wallName}`}
            name={`length_${wallName}`}
            className="border p-2 input-text"

            placeholder={'Enter Wall Length'}
            value={length === '' ? '' : String(length)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => {
              const newValue = e.target.value.trim();
              setLength(newValue === '' ? '' : parseFloat(newValue));
            }}
          />
          <input
            type="number"
            id={`height_${wallName}`}
            name={`height_${wallName}`}
            className="border p-2 input-text spcl"
            placeholder={'Enter Wall Height'}
            value={height === '' ? '' : String(height)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => {
              const newValue = e.target.value.trim();
              setHeight(newValue === '' ? '' : parseFloat(newValue));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Wall;
