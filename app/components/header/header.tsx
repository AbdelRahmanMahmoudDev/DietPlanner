"use client"
import { useThemeProvider } from "@/app/contexts/themeContext";
export function Header() {
    const {toggleTheme, updateTheme} = useThemeProvider() || {};
    const onButtonClick = (): void => {
        updateTheme();
    }

    const themeSwitchClasses = toggleTheme ?
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