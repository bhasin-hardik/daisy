
import React from 'react';
import Obstruction from './Obstruction';

const ObstructionContainer: React.FC<{ numberOfWalls: number }> = ({ numberOfWalls }) => {
  // Render the Obstruction component multiple times based on the numberOfWalls
  const renderObstructions = () => {
    const obstructions = [];
    for (let i = 0; i < numberOfWalls; i++) {
      obstructions.push(<Obstruction key={i} />);
    }
    return obstructions;
  };

  return <>{renderObstructions()}</>;
};

export default ObstructionContainer;
