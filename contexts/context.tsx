"use client"
import {createContext, useContext, useReducer} from 'react';

const context = createContext<any>(null);

export const OPTIONS = {
    GENDER: {
        MALE: "male",
        FEMALE: "female",
    },
    ACTIVITY_LEVEL: {
        SEDENTARY: "sedentary",
        LIGHT: "lightly active",
        MODERATE: "moderately active",
        VERY: "very active",
        EXTRA: "extra active",
    },
    GOAL: {
        LOSE_WEIGHT: "lose weight",
        MAINTAIN_WEIGHT: "maintain weight",
        GAIN_WEIGHT: "gain weight",
    },
}

export const ACTIONS = {
    TOGGLE_THEME: "toggle theme",
    SET_METRIC: "set metric",
    SET_US: "set US",
    SET_WEIGHT: "set weight",
    SET_HEIGHT: "set height",
    SET_HEIGHT_FEET: "set height feet",
    SET_HEIGHT_INCHES: "set height inches",
    SET_AGE: "set age",
    SET_GENDER: "set gender",
    SET_ACTIVITY: "set activity",
    SET_GOAL: "set goal",
}

const reducer = (state: any, action: any) => {
    switch(action.type) {
        case ACTIONS.TOGGLE_THEME:
            return {...state, isDarkTheme: !state.isDarkTheme};
        case ACTIONS.SET_METRIC:
            return {...state, isMetric: true};
        case ACTIONS.SET_US:
            return {...state, isMetric: false};
        case ACTIONS.SET_WEIGHT:
            return {
                ...state,
                userInput: {
                    ...state.userInput,
                    weight: action.payload.value,
                }
            }
        case ACTIONS.SET_HEIGHT:
            return {
                ...state,
                userInput: {
                    ...state.userInput,
                    height: action.payload.value,
                }
            }
        case ACTIONS.SET_HEIGHT_FEET:
            return {
                ...state,
                userInput: {
                    ...state.userInput,
                    heightFeet: action.payload.value,
                }
            }
        case ACTIONS.SET_HEIGHT_INCHES:
            return {
                ...state,
                userInput: {
                    ...state.userInput,
                    heightInches: action.payload.value,
                }
            }
        case ACTIONS.SET_AGE:
            return {
                ...state,
                userInput: {
                    ...state.userInput,
                    age: action.payload.value,
                }
            }
        case ACTIONS.SET_GENDER:
            return {
                ...state,
                userInput: {
                    ...state.userInput,
                    gender: action.payload.value,
                }
            }
        case ACTIONS.SET_ACTIVITY:
            return {
                ...state,
                userInput: {
                    ...state.userInput,
                    activityLevel: action.payload.value,
                }
            }
        case ACTIONS.SET_GOAL:
            return {
                ...state,
                userInput: {
                    ...state.userInput,
                    goal: action.payload.value,
                }
            }
        default:
            return state;
    }
}

export const ContextProvider = ({children}: any) => {
    const [state, dispatch] = useReducer(reducer,
        {isDarkTheme: true,
        isMetric: false,
        userInput: {
            weight: 0,
            height: 0,
            heightFeet: 0,
            heghtInches: 0,
            age: 0,
            gender: "",
            activityLevel: "",
            goal: "",
        },
            });


    const contextVal = {
        state,
        dispatch,
    }

    return (
        <context.Provider value={contextVal}>{children}</context.Provider>
    )
}

export const useProvider = () => useContext(context);