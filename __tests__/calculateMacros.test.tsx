import { calculateMacros } from "@/app/Plan/logic";

describe("Macro calculations", () => {
    it("Process weight in Metric system", () => {
        expect(calculateMacros(88.5, 2932, true))
        .toEqual({proteinGrams: 195, carbGrams: 180, fatGrams: 59})
    })

    it("Process weight in US system", () => {
        expect(calculateMacros(195, 2932, false))
        .toEqual({proteinGrams: 195, carbGrams: 180, fatGrams: 59})
    })
})