"use client";

import {useProvider, OPTIONS} from "../contexts/context";

type BMRFactors = {
  gender: string,
  weight: number,
  height: number,
  age: number,
}

// TODO: Unit tests
export function calculateBMR(data: BMRFactors, isMetric: boolean): number {
  let weight = data.weight, height = data.height, age = data.age;
  let bmr = 0
  // height will always be stored in metric
  // weight might be received in US

  // Calculate basal metabolic rate (BMR), or the calories your body burns simply by being alive.
  // For men: 10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) + 5 (kcal / day)
  // For women: 10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) -161 (kcal / day)
  if(!isMetric) {
    const POUND_TO_KG = 0.45359237;
    weight *= POUND_TO_KG;
  }

  if(data.gender === OPTIONS.GENDER.MALE) {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
  return Math.ceil(bmr);
}

function NutrientBox({title}: {title: string}) {
  return (
    <div>
      <span>{title}</span>
    </div>
  )
}

export default function Plan() {
  return (
    <NutrientBox title="weight"/>
  )
}