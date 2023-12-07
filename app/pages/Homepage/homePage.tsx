"use client";
import {Header, Form} from "../../components"
import { useThemeProvider } from "@/app/contexts/themeContext"
export default function HomePage() {
    const {toggleTheme} = useThemeProvider() || {};
    return (
        <div className={toggleTheme ? "bg-dark text-white" : "bg-white text-dark-text"}>
            <Header />
            <Form />
        </div>
    )
}