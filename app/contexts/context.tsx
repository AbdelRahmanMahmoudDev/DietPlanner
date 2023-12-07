"use client"
import {createContext, useContext, useReducer} from 'react';

const context = createContext<any>(null);

export const ACTIONS = {
    TOGGLE_THEME: "toggle theme",
}

const reducer = (state: any, action: any) => {
    switch(action.type) {
        case ACTIONS.TOGGLE_THEME:
            return {isDarkTheme: !state.isDarkTheme};
        default:
            return state;
    }
}

export const ContextProvider = ({children}: any) => {
    const [state, dispatch] = useReducer(reducer, {isDarkTheme: false});


    const contextVal = {
        state,
        dispatch,
    }

    return (
        <context.Provider value={contextVal}>{children}</context.Provider>
    )
}

export const useThemeProvider = () => useContext(context);