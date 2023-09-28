// measureContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Define the context interface
interface MeasureContextProps {
  wallMeasurements: { length: number; height: number }[];
  setWallMeasurements: React.Dispatch<React.SetStateAction<{ length: number; height: number }[]>>;
  
}

// Create the context
const MeasureContext = createContext<MeasureContextProps | undefined>(undefined);

// Create a custom hook to access the context
export const useMeasureContext = () => {
  const context = useContext(MeasureContext);
  if (!context) {
    throw new Error('useMeasureContext must be used within a MeasureProvider');
  }
  return context;
};

// Create the MeasureProvider component
export const MeasureProvider: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
    const [wallMeasurements, setWallMeasurements] = useState<{ length: number; height: number }[]>([]);
  
    return (
      <MeasureContext.Provider value={{ wallMeasurements, setWallMeasurements }}>
        {children}
      </MeasureContext.Provider>
    );
  };
  
