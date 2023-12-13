"use client";

import {useProvider, OPTIONS} from "@/contexts/context";
import * as logic from "./logic"
import {useState, useEffect} from "react";
import {Header} from "@/components"

function NutrientBox({title, info}: {title: string, info: string}) {
  return (
    <div>
      <span>{title}</span>
      <span>{info}</span>
    </div>
  )
}

function Display() {
  const {state} = useProvider() || {};
  const [bmr, setBmr] = useState("");
  useEffect(() => {
    setBmr(logic.calculateBMR(
      {gender: state.userInput.gender,
      weight: state.userInput.weight,
      height: state.userInput.height,
      age: state.userInput.age}, state.isMetric).toString())
      console.log(state);
  }, [state])
  return (
    <>
    <NutrientBox title="Basal Metabolic Rate (BMR)" info={bmr.toString()}/>
    </>
  )
}

export default function Plan() {
  const {state} = useProvider() || {};
  return (
    <div className={state.isDarkTheme ? "bg-dark text-white h-screen" : "bg-white text-dark-text h-screen"}>
      <Header />
      <Display />
    </div>
  )
}