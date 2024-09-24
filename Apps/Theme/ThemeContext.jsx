import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';


export const ThemeContext = React.createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme); // Utilisez le thème du système par défaut

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // Écoutez les changements du thème système et mettez à jour le thème de l'application en conséquence
  useEffect(() => {
    setTheme(systemTheme);
  }, [systemTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
