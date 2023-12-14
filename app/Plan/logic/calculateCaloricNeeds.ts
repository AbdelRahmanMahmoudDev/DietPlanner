import {OPTIONS} from "@/contexts/context";

const ACTIVITY_LEVELS = {
    sedentary: 1.2,
    lightlyِAtive: 1.375,
    moderatelyActive: 1.550,
    veryActive: 1.725,
    extraActive: 1.9,
}

const CALORIES_TO_BULK = 500;

type MacroFactors = {
    activity_level: string,
    goal: string,
}

export function calculateCaloricNeeds(data: MacroFactors, bmr: number): number {
    let caloricNeeds: number = bmr;

    switch(data.activity_level) {
        case OPTIONS.ACTIVITY_LEVEL.SEDENTARY:
            caloricNeeds *= ACTIVITY_LEVELS.sedentary;
            break;
        case OPTIONS.ACTIVITY_LEVEL.LIGHT:
            caloricNeeds *= ACTIVITY_LEVELS.lightlyِAtive;
            break;
        case OPTIONS.ACTIVITY_LEVEL.MODERATE:
            caloricNeeds *= ACTIVITY_LEVELS.moderatelyActive;
            break;
        case OPTIONS.ACTIVITY_LEVEL.VERY:
            caloricNeeds *= ACTIVITY_LEVELS.veryActive;
            break;
        case OPTIONS.ACTIVITY_LEVEL.EXTRA:
            caloricNeeds *= ACTIVITY_LEVELS.extraActive;
            break;
    }

    switch(data.goal) {
        case OPTIONS.GOAL.GAIN_WEIGHT:
            caloricNeeds += CALORIES_TO_BULK;
            break;
        case OPTIONS.GOAL.LOSE_WEIGHT:
            caloricNeeds -= (caloricNeeds * 0.2);
            break;
    }

    return Math.ceil(caloricNeeds);
}