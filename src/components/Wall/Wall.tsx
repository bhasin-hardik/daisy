import React from 'react';

interface WallProps {
  wallName: string;
  
}

const Wall: React.FC<WallProps> = ({ wallName  }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ width: '114px', height: '36px'}}>{wallName}:</div>
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
            background: '#F9FAFB', // Background color
            color: '#0E180A', // Text color
            border: '1px solid #ccc', // Border style
            marginLeft: '10px', // Add margin to separate from WallA
          }}
          placeholder={`Enter Wall Length`}
          // Add appropriate event handlers and state management for length input
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
            background: '#F9FAFB', // Background color
            color: '#0E180A', // Text color
            border: '1px solid #ccc', // Border style
          }}
          placeholder={`Enter Wall Height`}
          // Add appropriate event handlers and state management for height input
        />
      </div>
    </div>
  );
};

export default Wall;
