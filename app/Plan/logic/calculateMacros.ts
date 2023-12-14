const MACRO_TO_CALORIE = {
    PROTEIN: 4,
    CARBS: 9,
    FATS: 9,
}

export function calculateMacros(weight: number, caloricNeeds: number, isMetric: boolean) {
    let userWeight: number = weight;
    let calorieTally: number = caloricNeeds;
    // 88.5 2932 true
    // p 195
    // 2152
    // f 59
    // 1621
    if(isMetric) {
        const KG_TO_POUND: number = 2.20462;
        userWeight = Math.round(userWeight * KG_TO_POUND);
    }

    // 1 gram of protein / pound
    let proteinGrams: number = userWeight;
    calorieTally -= (proteinGrams * MACRO_TO_CALORIE.PROTEIN);

    // 0.3 grams of fat / pound
    let fatGrams: number = Math.round(userWeight * 0.3);
    calorieTally -= (fatGrams * MACRO_TO_CALORIE.FATS);

    // remaining calories go to carbs
    let carbCalories: number = calorieTally;
    let carbGrams: number = Math.round(carbCalories / MACRO_TO_CALORIE.CARBS);

    return {proteinGrams, carbGrams, fatGrams}
}