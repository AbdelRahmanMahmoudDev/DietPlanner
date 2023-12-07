"use client"
import { useThemeProvider, ACTIONS } from "@/app/contexts/context";
export function Header() {
    const {state, dispatch} = useThemeProvider() || {};
    const onButtonClick = (): void => {
        dispatch({type: ACTIONS.TOGGLE_THEME});
        console.log(state)
    }

    const themeSwitchClasses = state.isDarkTheme ?
    "block absolute transition-all bg-white rounded w-6 h-6 top-[50%] translate-y-[-50%] start-[60%] rounded-xl"
    :
    "block absolute transition-all bg-black rounded w-6 h-6 top-[50%] translate-y-[-50%] start-0 rounded-xl";

    return (
        <header className="flex justify-evenly items-center p-4">
            <h1 className="text-xl uppercase">diet planner</h1>
            <section className="border-2 border-black w-16 h-7 rounded-xl relative">
                <button onClick={onButtonClick} className="pointer block w-full">
                    <span className={`${themeSwitchClasses}`}></span>
                </button>
            </section>
        </header>
    )
}