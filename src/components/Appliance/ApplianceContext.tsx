import { createContext, useContext, useState, ReactNode } from 'react';

// Define the context
interface WallApplianceData {
  refrigeratorData: {
    selected: boolean;
    height: string;
    width: string;
    center: string;
  };
  sinkData: {
    selected: boolean;
    width: string;
    center: string;
  };
  rangeData: {
    selected: boolean;
    width: string;
    center: string;
  };
  dishData: {
    selected: boolean;
    width: string;
    center: string;
  };
  ApplianceError: string;
}

interface ApplianceContextType {
  wallApplianceData: WallApplianceData[]; // Array to store data for each wall
  setApplianceError: (error: string, wallIndex: number) => void;
}

const ApplianceContext = createContext<ApplianceContextType | undefined>(undefined);

// Create a provider component
interface ApplianceProviderProps {
  children: ReactNode;
}

export function ApplianceProvider({ children }: ApplianceProviderProps) {
  const initialWallApplianceData: WallApplianceData[] = [
    // Initialize the array with default values for each wall
    {
      refrigeratorData: {
        selected: false,
        height: '',
        width: '',
        center:'',
      },
      sinkData: {
        selected: false,
        width: '',
        center:'',
      },
      rangeData: {
        selected: false,
        width: '',
        center:'',
      },
      dishData: {
        selected: false,
        width: '',
        center:'',
      },
      ApplianceError: '',
    },
    {
        refrigeratorData: {
          selected: false,
          height: '',
          width: '',
          center:'',
        },
        sinkData: {
          selected: false,
          width: '',
          center:'',
        },
        rangeData: {
          selected: false,
          width: '',
          center:'',
        },
        dishData: {
          selected: false,
          width: '',
          center:'',
        },
        ApplianceError: '',
      },
      {
        refrigeratorData: {
          selected: false,
          height: '',
          width: '',
          center:'',
        },
        sinkData: {
          selected: false,
          width: '',
          center:'',
        },
        rangeData: {
          selected: false,
          width: '',
          center:'',
        },
        dishData: {
          selected: false,
          width: '',
          center:'',
        },
        ApplianceError: '',
      },
    // Add more items for additional walls as needed
  ];

  const [wallApplianceData, setWallApplianceData] = useState<WallApplianceData[]>(initialWallApplianceData);

  const setApplianceError = (ApplianceError: string, wallIndex: number) => {
    // Update the error for the specified wall index
    const updatedWallApplianceData = [...wallApplianceData];
    updatedWallApplianceData[wallIndex] = {
      ...updatedWallApplianceData[wallIndex],
      ApplianceError,
    };
    setWallApplianceData(updatedWallApplianceData);
  };

  const contextValue: ApplianceContextType = {
    wallApplianceData,
    setApplianceError,
  };

  return (
    <ApplianceContext.Provider value={contextValue}>
      {children}
    </ApplianceContext.Provider>
  );
}

// Custom hook for using the context
export function useApplianceContext() {
  const context = useContext(ApplianceContext);
  if (!context) {
    throw new Error('useApplianceContext must be used within an ApplianceProvider');
  }
  return context;
}
