const heightChoices = document.querySelectorAll("input[name='heightChoice']")
const age = document.getElementById("age")
const heightInputSection = document.getElementById("heightDynamicInput")
const formSection = document.querySelector(".questionnaire")
const dynamicSection = document.querySelector(".dynamic-content")
const macroNumbers = Array.from(document.querySelectorAll(".number-display .number-card p"))
const addItemButton = document.querySelector(".dynamic-content .button-section button:first-child")
const removeItemButton = document.querySelector(".dynamic-content .button-section button:last-child")
const listSection = document.querySelector(".dynamic-content .list-section")
const macroItem = document.querySelector(".macro-item")

const numberRegex = /^-?\d+\.?\d*$/
const poundToKgFactor = 2.20462
const feetToCentiMetersFactor = 30.48
const inchToCentiMetersFactor = 2.54
const feetToInchFactor = 12

const macroGlobals = {
    proteinFactor: 1,
    proteinCalorieWeight: 4,
    // carbs have the same calorie weight as protein
    fatFactor: 0.3,
    fatCalorieWeight: 9
}

function poundToKg(pound) {
    return pound / poundToKgFactor
}

function kgToPound(kg) {
    return kg * poundToKgFactor
}

function feetToCm(feet, inch) {
    feet *= feetToCentiMetersFactor
    inch *= inchToCentiMetersFactor
    return(feet + inch)
}

function cmToFeet(cm) {
    let totalLength = cm / inchToCentiMetersFactor
    let feet = Math.floor(totalLength / feetToInchFactor)
    let inch = totalLength - ( feetToInchFactor * feet)
    return [feet, inch]
}

const genderChoices = {
    male: "genderChoiceMale",
    maleMathVal: 5,
    female: "genderChoiceFemale",
    femaleMathVal: -161
}

const activityLevelChoices = {
    sedentary: "sedentary",
    sedentaryLevel: 1.2,
    lightlyActive: "lightlyActive",
    lightlyActiveLevel: 1.375,
    moderatelyActive: "moderatelyActive",
    moderatelyActiveLevel: 1.550,
    veryActive: "veryActive",
    veryActiveLevel: 1.725,
    extraActive: "extraActive",
    extraActiveLevel: 1.9
}

const goalChoices = {
    loseWeight: "loseWeight",
    caloricDeficitFactor: 0.8,
    gainWeight: "gainWeight",
    caloricSurplusValue: 500
}

let personCharacteristics = {
    weightKg: 0, 
    weightPound: 0, 
    heightCm: 0, 
    heightFeet: 0,
    heightInch: 0, 
    age: 0,
    basalMetabolicRate: 0,
    caloricRequirements: 0,
    proteinGrams: 0,
    proteinCalories: 0,
    carbGrams: 0,
    carbCalories: 0,
    fatGrams: 0,
    fatCalories: 0
}
// input for meter height
const inputFieldMeters = document.createElement("input")
inputFieldMeters.setAttribute("type", "text")
inputFieldMeters.setAttribute("required", "")
inputFieldMeters.setAttribute("name", "heightInCm")
inputFieldMeters.setAttribute("id", "height")
inputFieldMeters.setAttribute("placeholder", "Your height")
inputFieldMeters.setAttribute("value", "178.4")
inputFieldMeters.style.display = "block"

heightInputSection.appendChild(inputFieldMeters) // default 

// input container for height feet + inches
const inputContainerFeet = document.createElement("div")

// input for height feet
const inputFieldFeet = document.createElement("input")
inputFieldFeet.setAttribute("type", "number")
inputFieldFeet.setAttribute("required", "")
inputFieldFeet.setAttribute("name", "heightPartFeet")
inputFieldFeet.setAttribute("id", "heightPartFeet")
inputFieldFeet.setAttribute("placeholder", "Feet")
inputFieldFeet.style.marginRight = "10px";
inputFieldFeet.style.marginBottom = "10px";
inputContainerFeet.appendChild(inputFieldFeet)

// input for height inches
const inputFieldInches = document.createElement("input")
inputFieldInches.setAttribute("type", "number")
inputFieldInches.setAttribute("name", "heightPartInches")
inputFieldInches.setAttribute("id", "heightPartInches")
inputFieldInches.setAttribute("placeholder", "Inches")
inputContainerFeet.appendChild(inputFieldInches)

// check which height option the user selected
heightChoices.forEach((btn) => {
    btn.addEventListener('change', () => {
        let selected = document.querySelector("input[name='heightChoice']:checked").id
        if(selected == "heightChoiceMeters") {
            heightInputSection.appendChild(inputFieldMeters)
            if(heightInputSection.hasChildNodes()) {
                heightInputSection.removeChild(inputContainerFeet)
            }
        } else {
            heightInputSection.appendChild(inputContainerFeet)
            if(heightInputSection.hasChildNodes()) {
                heightInputSection.removeChild(inputFieldMeters)
            }
        }
    })
})

function createMacroField() {
    // input item for macronutrients
    const macroSection = document.createElement("div")
    macroSection.classList.add("macro-item")
    
    const placeholders = ["Name", "Calories", "Protein", "Fat", "Carbs"]
    for(index = 0; index < placeholders.length; ++index) {
        const inputField = document.createElement("input")
        inputField.setAttribute("type", "text")
        inputField.setAttribute("name", `${placeholders[index]}`)
        inputField.setAttribute("placeholder", `${placeholders[index]}`)
        macroSection.appendChild(inputField)
    }

    return macroSection
}


document.forms[0].onsubmit = (e) => {
    // We don't need to store this data
    e.preventDefault();

    /*
    Calculate basal metabolic rate (BMR), or the calories your body burns simply by being alive.
    For men:   10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) + 5 (kcal / day)
    For women: 10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) -161 (kcal / day)
    */
    const weight = document.getElementById("weight").value
    const weightSelected = document.querySelector("input[name='weightChoice']:checked").id
    if(weightSelected == "weightChoiceKG") {
        personCharacteristics.weightKg    = parseFloat(weight)
        personCharacteristics.weightPound = kgToPound(personCharacteristics.weightKg)
    } else {
        personCharacteristics.weightPound = parseFloat(weight)
        personCharacteristics.weightKg    = poundToKg(personCharacteristics.weightPound)
    }

    const heightSelected = document.querySelector("input[name='heightChoice']:checked").id
    if(heightSelected == "heightChoiceFeet") {
        personCharacteristics.heightFeet = parseFloat(document.getElementById("heightPartFeet").value)
        personCharacteristics.heightInch = parseFloat(document.getElementById("heightPartInches").value)
        personCharacteristics.heightCm   = feetToCm(personCharacteristics.heightFeet, personCharacteristics.heightInch)
    } else {
        personCharacteristics.heightCm   = parseFloat(document.getElementById("height").value)
        const [heightFeet, heightInch]   = cmToFeet(parseFloat(document.getElementById("height").value))
        personCharacteristics.heightFeet = heightFeet
        personCharacteristics.heightInch = heightInch
    }

    personCharacteristics.age = age.value;
    console.log(`Weight: ${personCharacteristics.weightKg}\n Height: ${personCharacteristics.heightCm}\n Age: ${personCharacteristics.age}\n`)
    let basalMetabolicRate = (10 * personCharacteristics.weightKg) + (6.25 * personCharacteristics.heightCm) - (5 * personCharacteristics.age) 
    personCharacteristics.basalMetabolicRate = basalMetabolicRate


    const genderSelected = document.querySelector("input[name='genderChoice']:checked").id
    if(genderSelected == genderChoices.male) {
        basalMetabolicRate += genderChoices.maleMathVal
    } else {
        basalMetabolicRate += genderChoices.femaleMathVal
    }



    const activityLevelSelected = document.querySelector("input[name='activityLevel']:checked").id
    switch(activityLevelSelected) {
        case activityLevelChoices.sedentary: 
            basalMetabolicRate *= activityLevelChoices.sedentaryLevel
            break;
        case activityLevelChoices.lightlyActive: 
            basalMetabolicRate *= activityLevelChoices.lightlyActiveLevel
            break;    
        case activityLevelChoices.moderatelyActive: 
            basalMetabolicRate *= activityLevelChoices.moderatelyActiveLevel
            break;   
        case activityLevelChoices.veryActive: 
            basalMetabolicRate *= activityLevelChoices.veryActiveLevel
            break;   
        case activityLevelChoices.extraActive: 
            basalMetabolicRate *= activityLevelChoices.extraActiveLevel
            break;  
    }



    const goalSelected = document.querySelector("input[name='goalChoice']:checked").id
    switch(goalSelected) {
        case goalChoices.loseWeight:
            basalMetabolicRate *= goalChoices.caloricDeficitFactor
            break;
        case gainWeight:
            basalMetabolicRate += goalChoices.caloricSurplusValue
    }
    basalMetabolicRate = basalMetabolicRate.toFixed(0)
    personCharacteristics.caloricRequirements = basalMetabolicRate

    console.log(`Basal Metabolic Rate(BMR): ${personCharacteristics.basalMetabolicRate},\nCaloric Requirements: ${personCharacteristics.caloricRequirements}`)

    personCharacteristics.proteinGrams    = parseFloat((macroGlobals.proteinFactor * personCharacteristics.weightPound).toFixed(0))
    personCharacteristics.proteinCalories = parseFloat((macroGlobals.proteinCalorieWeight * personCharacteristics.proteinGrams).toFixed(0))

    personCharacteristics.fatGrams        = parseFloat((macroGlobals.fatFactor * personCharacteristics.weightPound).toFixed(0))
    personCharacteristics.fatCalories     = parseFloat((macroGlobals.fatCalorieWeight * personCharacteristics.fatGrams).toFixed(0))

    personCharacteristics.carbCalories    = (personCharacteristics.caloricRequirements - (personCharacteristics.proteinCalories + personCharacteristics.fatCalories)).toFixed(0)
    personCharacteristics.carbGrams       = (personCharacteristics.carbCalories / macroGlobals.proteinCalorieWeight).toFixed(0)

    console.log(`Macros\nprotein: ${personCharacteristics.proteinGrams} (${personCharacteristics.proteinCalories})\nfat: ${personCharacteristics.fatGrams} (${personCharacteristics.fatCalories})\nCarbs: ${personCharacteristics.carbGrams} (${personCharacteristics.carbCalories})`)

    const cardNumbers = [personCharacteristics.caloricRequirements, personCharacteristics.proteinGrams, personCharacteristics.fatGrams, personCharacteristics.carbGrams]
    for(index = 0; index < macroNumbers.length; ++index) {
        macroNumbers[index].innerText = `${cardNumbers[index]}`
    }

    formSection.style.display = "none"
    dynamicSection.style.display = "block"

    addItemButton.onclick = () => {
        listSection.appendChild(createMacroField())
        const separator = document.createElement("hr")
        listSection.appendChild(separator)
    }

    removeItemButton.onclick = () => {
        if(listSection.lastChild) {
            listSection.removeChild(listSection.lastChild)
        }
    }
}