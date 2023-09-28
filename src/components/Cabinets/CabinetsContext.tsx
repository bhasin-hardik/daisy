import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context
const CabinetsContext = createContext<any>(null);

// Create a custom hook to access the context
export const useCabinetsContext = () => {
  const context = useContext(CabinetsContext);
  if (!context) {
    throw new Error('useCabinetsContext must be used within a CabinetsProvider');
  }
  return context;
};

// Create a provider component
interface CabinetsProviderProps {
  children: ReactNode; // Specify children as a ReactNode
}

export const CabinetsProvider: React.FC<CabinetsProviderProps> = ({ children }) => {
  // State variables to keep track of selected images for each cabinet
  const [selectedImages, setSelectedImages] = useState<any>({
    cabinet1: null,
    cabinet2: null,
    cabinet3: null,
    cabinet4: null,
  });

  // Function to toggle the selection status of an image for a cabinet
  const toggleSelection = (cabinet: string, image: string) => {
    setSelectedImages((prevSelectedImages: any) => ({
      ...prevSelectedImages,
      [cabinet]: image,
    }));
  };

  // Provide the context values
  const contextValue = {
    selectedImages,
    toggleSelection,
  };

  return (
    <CabinetsContext.Provider value={contextValue}>
      {children}
    </CabinetsContext.Provider>
  );
};
