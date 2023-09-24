import React from 'react';
import { useLayoutContext } from '../Layout/LayoutContext';
const Obstruction: React.FC = () => {
    const { selectedLayout, calculateWallsNeeded } = useLayoutContext();
  return (
    <div>
      <h1>Obstruction Component</h1>
      <p>Selected Layout: {selectedLayout}</p>
      <p>Walls Needed: {calculateWallsNeeded()}</p>
    </div>
  );
};

export default Obstruction;
