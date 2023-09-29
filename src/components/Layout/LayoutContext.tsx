import React, { createContext, useContext, useState, ReactNode } from 'react';

// Create a context for Layout data
const LayoutContext = createContext<any>(null);

// Create a provider component
export const LayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);

  // Calculate the number of walls needed based on the selected layout
  const calculateWallsNeeded = () => {
    // Implement your logic to calculate the number of walls needed
    // For example, you can have a mapping of layouts to the number of walls
    const layoutToWallsMap: { [key: string]: number } = {
        img1: 1,
        img2: 2,
        img3: 2,
        img4: 3,
        img5: 2,
        img6: 3,
      // Add more mappings as needed
    };

    return layoutToWallsMap[selectedLayout || ''] || 0;
  };

  return (
    <LayoutContext.Provider
      value={{ selectedLayout, setSelectedLayout, calculateWallsNeeded }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

// Create a custom hook to access the LayoutContext
export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayoutContext must be used within a LayoutProvider');
  }
  return context;
};
