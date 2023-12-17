"use client";

import {useProvider, ACTIONS} from "@/contexts/context";
import * as logic from "./logic"
import {useState, useEffect, useReducer} from "react";
import {Header} from "@/components"
import Stats from "./stats";
import FoodEntry from "./foodEntry";

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

const EntryActions = {
  ADD: "add entry",
}

function reducer(entries: any, action: any) {
  switch(action.type) {
    case EntryActions.ADD:
      return [...entries, action.payload.value];
    default: return entries;
  }
}

export default function Plan() {
  const {state, dispatch} = useProvider() || {};
  const [bmr, setBMR] = useState(0);
  const [entryData, setEntryData] = useState({title: "", protein: "", fats: "", carbs: ""});
  const [entries, act] = useReducer(reducer, [])

  useEffect(() => {
    const {bmr, caloricNeeds, proteinGrams, carbGrams, fatGrams} = calculateDisplayValues(state);
    dispatch({type: ACTIONS.SET_CALORIES, payload: {value: caloricNeeds}});
    dispatch({type: ACTIONS.SET_PROTEIN, payload: {value: proteinGrams}});
    dispatch({type: ACTIONS.SET_CARBS, payload: {value: carbGrams}});
    dispatch({type: ACTIONS.SET_FATS, payload: {value: fatGrams}});
    setBMR(bmr);
  }, [])

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log(entries)
    act({type: EntryActions.ADD, payload: {value: {...entryData}}})
    console.log(entries)
}

  return (
    <div className={state.isDarkTheme ? "bg-dark text-white h-screen" : "bg-white text-dark-text h-screen"}>
      <Header />
      <Stats bmr={bmr} calories={state.userMacros.calories} protein={state.userMacros.protein} carbs={state.userMacros.carbs} fats={state.userMacros.fats}/>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 justify-center gap-4 mx-2 my-2 ">
        <input id="setName" className={state.isDarkTheme ? "bg-white text-dark-text placeholder:px-2 mt-5 md:mt-0" : "bg-dark text-white placeholder:px-2 mt-5 md:mt-0"} type="text" placeholder="name"       onChange={e => setEntryData({...entryData, title: e.target.value})} value={entryData.title}/>
        <input id="setProtein" className={state.isDarkTheme ? "bg-white text-dark-text placeholder:px-2 mt-5 md:mt-0" : "bg-dark text-white placeholder:px-2 mt-5 md:mt-0"} type="text" placeholder="protein" onChange={e => setEntryData({...entryData, protein: e.target.value})} value={entryData.protein}/>
        <input id="setFat" className={state.isDarkTheme ? "bg-white text-dark-text placeholder:px-2 mt-5 md:mt-0" : "bg-dark text-white placeholder:px-2 mt-5 md:mt-0"} type="text" placeholder="fats"    onChange={e => setEntryData({...entryData, fats: e.target.value})} value={entryData.fats}/>
        <input id="setCarb" className={state.isDarkTheme ? "bg-white text-dark-text placeholder:px-2 mt-5 md:mt-0" : "bg-dark text-white placeholder:px-2 mt-5 md:mt-0"} type="text" placeholder="carbs"   onChange={e => setEntryData({...entryData, carbs: e.target.value})} value={entryData.carbs}/>
        <input id="doSubmit" type="submit" className="cursor-pointer border border-gray-300 rounded " />
      </form>
      <ul className="odd:bg-white">
        {entries.map((entry: any, index: any) => {
          return (
              <FoodEntry key={index} name={entry.title} protein={entry.protein} fats={entry.fats} carbs={entry.carbs} customClasses={index % 2 == 0 ? 'bg-dark' : 'bg-[#525151]'}></FoodEntry>
          )
        })}
      </ul>
    </div>
  )
}