import { calculateBMR } from "@/app/Plan/logic";


describe("BMR Calculations", () => {
    it("Calculate in Metric System", () => {
        expect(calculateBMR({gender: "male", weight: 88.5, height: 178.5, age: 23}, true)).toBe(1891);
    })

    it("Calculate in US System", () => {
        expect(calculateBMR({gender: "male", weight: 195, height: 178.5, age: 23}, false)).toBe(1891);
    })
})