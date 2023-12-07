"use client"
import {createContext, useContext, useState} from 'react';

const ThemeContext = createContext<any>(null);

export const ThemeContextProvider = ({children}: any) => {
    const [toggleTheme, setToggleTheme] = useState(false);

    const updateTheme = () => {
        setToggleTheme(!toggleTheme)
    }

    const contextVal = {
        toggleTheme,
        updateTheme,
    }

    return (
        <ThemeContext.Provider value={contextVal}>{children}</ThemeContext.Provider>
    )
}

export const useThemeProvider = () => useContext(ThemeContext);