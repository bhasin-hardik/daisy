import React from 'react';
import { useLayoutContext } from '../Layout/LayoutContext';
import Wall from '../Wall/Wall';
import walls from '../../assets/walls.png';

const Measure: React.FC = () => {
  const { calculateWallsNeeded } = useLayoutContext();
  const numWalls = calculateWallsNeeded();

  const wallInputs = [];

  for (let i = 1; i <= numWalls; i++) {
    wallInputs.push(
      <div key={i}>
        <Wall wallName={`Wall ${String.fromCharCode(65 + i - 1)}`} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="bg-white p-8 text-center"
        style={{
          maxWidth: '1101px',
          width: '100%',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
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
            width: '584px',
            height: '372px',
            maxWidth: '100%',
            margin: 'auto',
          }}
        />
        <div style={{ marginTop: '20px' }}>
          {wallInputs}
        </div>
        <button
          className="w-80 h-12 mt-4 rounded-md text-white"
          style={{ background: '#7F56D9' }}
        >
          Submit Details
        </button>
      </div>
    </div>
  );
};

export default Measure;
