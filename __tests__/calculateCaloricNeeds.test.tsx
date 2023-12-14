import { calculateCaloricNeeds } from "@/app/Plan/logic";
import {OPTIONS} from "@/contexts/context";

describe("Caloric Needs Calculations", () => {
    it("Sedentary Maintain Weight", () => {
        expect(calculateCaloricNeeds({
            activity_level: OPTIONS.ACTIVITY_LEVEL.SEDENTARY,
            goal: OPTIONS.GOAL.MAINTAIN_WEIGHT}, 1891)).toBe(2270);
    })
    it("Sedentary Lose Weight", () => {
        expect(calculateCaloricNeeds({
            activity_level: OPTIONS.ACTIVITY_LEVEL.SEDENTARY,
            goal: OPTIONS.GOAL.LOSE_WEIGHT}, 1891)).toBe(1816);
    })
    it("Very Active Gain Weight", () => {
        expect(calculateCaloricNeeds({
            activity_level: OPTIONS.ACTIVITY_LEVEL.VERY,
            goal: OPTIONS.GOAL.GAIN_WEIGHT}, 1891)).toBe(3762);
    })
})