import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Create the context
const PathContext = createContext(null);

// Context provider component
export const PathContextProvider = ({ children }) => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const previousPathRef = useRef(null);

  useEffect(() => {
    // Update the previous path before changing the current path
    if (location.pathname !== currentPath) {
      previousPathRef.current = currentPath;
      setCurrentPath(location.pathname);
    }
  }, [location.pathname, currentPath]);

  const contextValue = {
    previousPath: previousPathRef.current,
    currentPath,
  };

  return (
    <PathContext.Provider value={contextValue}>
      {children}
    </PathContext.Provider>
  );
};

// Custom hook to use the PathContext
export const usePreviousPath = () => {
  const context = useContext(PathContext);
  if (context === undefined) {
    throw new Error('usePreviousPath must be used within a PathContextProvider');
  }
  return context;
};