import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const contex = React.useContext(ThemeContext);

  if (contex === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return contex;
};
