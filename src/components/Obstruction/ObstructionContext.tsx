import { createContext, useContext, useState, ReactNode } from 'react';

// Define the context
interface WallObstructionData {
  doorData: {
    selected: boolean;
    height: string;
    width: string;
    center: string;
  };
  windowData: {
    selected: boolean;
    height: string;
    width: string;
    center: string;
  };
  beamData: {
    selected: boolean;
    height: string;
    width: string;
    center: string;
  };
  otherData: {
    selected: boolean;
    height: string;
    width: string;
    center: string;
  };
  Obstructionerror: string;
}

interface ObstructionContextType {
  wallObstructionData: WallObstructionData[]; // Array to store data for each wall
  setObstructionError: (error: string, wallIndex: number) => void;
}

const ObstructionContext = createContext<ObstructionContextType | undefined>(undefined);

// Create a provider component
interface ObstructionProviderProps {
  children: ReactNode;
}

export function ObstructionProvider({ children }: ObstructionProviderProps) {
  const initialWallObstructionData: WallObstructionData[] = [
    // Initialize the array with default values for each wall
    {
      doorData: {
        selected: false,
        height: '',
        width: '',
        center: '',
      },
      windowData: {
        selected: false,
        height: '',
        width: '',
        center: '',
      },
      beamData: {
        selected: false,
        height: '',
        width: '',
        center: '',
      },
      otherData: {
        selected: false,
        height: '',
        width: '',
        center: '',
      },
      Obstructionerror: '',
    },
    {
      doorData: {
        selected: false,
        height: '',
        width: '',
        center: '',
      },
      windowData: {
        selected: false,
        height: '',
        width: '',
        center: '',
      },
      beamData: {
        selected: false,
        height: '',
        width: '',
        center: '',
      },
      otherData: {
        selected: false,
        height: '',
        width: '',
        center: '',
      },
      Obstructionerror: '',
    },
    {
      doorData: {
        selected: false,
        height: '',
        width: '',
        center: '',
      },
      windowData: {
        selected: false,
        height: '',
        width: '',
        center: '',
      },
      beamData: {
        selected: false,
        height: '',
        width: '',
        center: '',
      },
      otherData: {
        selected: false,
        height: '',
        width: '',
        center: '',
      },
      Obstructionerror: '',
    },
    // Add more items for additional walls as needed
  ];

  const [wallObstructionData, setWallObstructionData] = useState<WallObstructionData[]>(initialWallObstructionData);

  const setObstructionError = (Obstructionerror: string, wallIndex: number) => {
    // Update the error for the specified wall index
    const updatedWallObstructionData = [...wallObstructionData];
    updatedWallObstructionData[wallIndex] = {
      ...updatedWallObstructionData[wallIndex],
      Obstructionerror,
    };
    setWallObstructionData(updatedWallObstructionData);
  };

  const contextValue: ObstructionContextType = {
    wallObstructionData,
    setObstructionError,
  };

  return (
    <ObstructionContext.Provider value={contextValue}>
      {children}
    </ObstructionContext.Provider>
  );
}

// Custom hook for using the context
export function useObstructionContext() {
  const context = useContext(ObstructionContext);
  if (!context) {
    throw new Error('useObstructionContext must be used within an ObstructionProvider');
  }
  return context;
}
