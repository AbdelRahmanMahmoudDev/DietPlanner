"use client";

import {useProvider, ACTIONS} from "@/contexts/context";
import * as logic from "./logic"
import {useState, useEffect} from "react";
import {Header} from "@/components"

function NutrientBox({title, info}: {title: string, info: string}) {
  return (
    <div className="flex justify-center items-center w-full items-center flex-col border-2 rounded p-4">
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
  const {state, dispatch} = useProvider() || {};
  const [bmr, setBMR] = useState(0);
  useEffect(() => {
    const {bmr, caloricNeeds, proteinGrams, carbGrams, fatGrams} = calculateDisplayValues(state);
    dispatch({type: ACTIONS.SET_CALORIES, payload: {value: caloricNeeds}});
    dispatch({type: ACTIONS.SET_PROTEIN, payload: {value: proteinGrams}});
    dispatch({type: ACTIONS.SET_CARBS, payload: {value: carbGrams}});
    dispatch({type: ACTIONS.SET_FATS, payload: {value: fatGrams}});
    setBMR(bmr);
  }, [state, dispatch])
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <NutrientBox title="Basal Metabolic Rate (BMR)" info={bmr.toString()}/>
      <NutrientBox title="Caloric Needs" info={state.userMacros.calories.toString()}/>
      <NutrientBox title="Protein" info={`${state.userMacros.protein.toString()} grams`}/>
      <NutrientBox title="Carbohydrates" info={`${state.userMacros.carbs.toString()} grams`}/>
      <NutrientBox title="Fats" info={`${state.userMacros.fats.toString()} grams`}/>
    </div>
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