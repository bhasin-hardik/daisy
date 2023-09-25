import React, { useState, useEffect } from 'react';

interface WallProps {
  wallName: string;
  onValidationChange: (isValid: boolean) => void; // Callback to update parent component
}

const Wall: React.FC<WallProps> = ({ wallName, onValidationChange }) => {
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [isValid, setIsValid] = useState(false); // State to track validation

  // Validation function for length and height
  const validateInputs = () => {
    const isLengthValid = length.trim() !== '';
    const isHeightValid = height.trim() !== '';
    const isValid = isLengthValid && isHeightValid;
    setIsValid(isValid);
    onValidationChange(isValid); // Notify parent component of validation state
  };

  // Call validation function whenever length or height changes
  useEffect(() => {
    validateInputs();
  }, [length, height]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ width: '114px', height: '36px', fontFamily: 'Actor', fontSize: '18px', fontWeight: 400, lineHeight: '36px', letterSpacing: '-0.02em', textAlign: 'left' }}>
          {wallName}:
        </div>
        <input
          type="number"
          id={`length_${wallName}`}
          name={`length_${wallName}`}
          className="border p-2"
          style={{
            fontFamily: 'Actor',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '20px',
            letterSpacing: '-0.02em',
            textAlign: 'left',
            background: '#F9FAFB',
            color: '#0E180A',
            border: '1px solid #ccc',
            marginLeft: '10px',
          }}
          placeholder={`Enter Wall Length`}
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      <div style={{ marginLeft: '124px', marginBottom: '10px' }}>
        <input
          type="number"
          id={`height_${wallName}`}
          name={`height_${wallName}`}
          className="border p-2"
          style={{
            fontFamily: 'Actor',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '20px',
            letterSpacing: '-0.02em',
            textAlign: 'left',
            background: '#F9FAFB',
            color: '#0E180A',
            border: '1px solid #ccc',
          }}
          placeholder={`Enter Wall Height`}
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Wall;
