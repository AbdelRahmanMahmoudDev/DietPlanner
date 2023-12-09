"use client";
import {Header, Form} from "../../components"
import { useProvider } from "@/app/contexts/context"
export default function HomePage() {
    const {state} = useProvider() || {};
    return (
        <div className={state.isDarkTheme ? "bg-dark text-white" : "bg-white text-dark-text"}>
            <Header />
            <Form />
        </div>
    )
}