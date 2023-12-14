"use client";

import {useProvider, OPTIONS} from "@/contexts/context";
import * as logic from "./logic"
import {useState, useEffect} from "react";
import {Header} from "@/components"

function NutrientBox({title, info}: {title: string, info: string}) {
  return (
    <div className="flex justify-center items-center flex-col border-2 w-fit rounded p-4">
      <span>{title}</span>
      <br />
      <span>{info}</span>
    </div>
  )
}

function calculateDisplayValues(state: any) {
  let bmr: number = logic.calculateBMR(
    {gender: state.userInput.gender,
    weight: state.userInput.weight,
    height: state.userInput.height,
    age: state.userInput.age}, state.isMetric);

  let caloricNeeds: number = logic.calculateCaloricNeeds(
    {activity_level: state.userInput.activityLevel,
    goal: state.userInput.goal}, bmr);

  const {proteinGrams, carbGrams, fatGrams} = logic.calculateMacros(state.userInput.weight, caloricNeeds, state.isMetric);
  
    return {bmr, caloricNeeds, proteinGrams, carbGrams, fatGrams};
}

function Display() {
  const {state} = useProvider() || {};
  const [displayData, setDisplayData] = useState({_bmr: 0, _caloricNeeds: 0, _protein: 0, _carbs: 0, _fats: 0});
  useEffect(() => {
    const {bmr, caloricNeeds, proteinGrams, carbGrams, fatGrams} = calculateDisplayValues(state);
    setDisplayData({_bmr: bmr, _caloricNeeds: caloricNeeds, _protein: proteinGrams, _carbs: carbGrams, _fats: fatGrams});
  }, [])
  return (
    <>
    <NutrientBox title="Basal Metabolic Rate (BMR)" info={displayData._bmr.toString()}/>
    <NutrientBox title="Caloric Needs" info={displayData._caloricNeeds.toString()}/>
    <NutrientBox title="Protein" info={`${displayData._protein.toString()} grams`}/>
    <NutrientBox title="Carbohydrates" info={`${displayData._carbs.toString()} grams`}/>
    <NutrientBox title="Fats" info={`${displayData._fats.toString()} grams`}/>
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