import React, { createContext, useContext, useState } from 'react';

const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('Projeto');
  const [myPosts, setMyPosts] = useState('Meu feed');
  const [initialTab, setInitialTab] = useState('Projeto');
  const [shouldResetTabs, setShouldResetTabs] = useState(true);


  const resetTabs = () => {
    setActiveTab(initialTab);
    setMyPosts('Meu feed');
  };

  return (
    <TabContext.Provider value={{ 
    activeTab, 
    setActiveTab, 
    myPosts, 
    setMyPosts, 
    resetTabs, 
    setInitialTab, 
    shouldResetTabs, 
    setShouldResetTabs
    }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTab = () => useContext(TabContext);