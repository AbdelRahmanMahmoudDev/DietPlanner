let weightChoices = document.querySelectorAll(".weight .weight-choice input[name='weightChoice']")
let heightChoices = document.querySelectorAll(".height-section input[name='heightChoice']")
let heightInputSection = document.getElementById("heightDynamicInput");

const poundToKg = 2.20462
const feetToMeters = 3.28084

let inputFieldMeters = document.createElement("input")
inputFieldMeters.setAttribute("type", "text")
inputFieldMeters.setAttribute("required", "")
inputFieldMeters.setAttribute("name", "heightInCm")
inputFieldMeters.setAttribute("id", "height")
inputFieldMeters.setAttribute("placeholder", "Your height")
inputFieldMeters.style.display = "block"

heightInputSection.appendChild(inputFieldMeters) // default 

let inputContainerFeet = document.createElement("div")

let inputFieldFeet = document.createElement("input")
inputFieldFeet.setAttribute("type", "number")
inputFieldFeet.setAttribute("required", "")
inputFieldFeet.setAttribute("name", "heightPartFeet")
inputFieldFeet.setAttribute("id", "height")
inputFieldFeet.setAttribute("placeholder", "Feet")
inputFieldFeet.style.marginRight = "10px";
inputFieldFeet.style.marginBottom = "10px";
inputContainerFeet.appendChild(inputFieldFeet)

let inputFieldInches = document.createElement("input")
inputFieldInches.setAttribute("type", "number")
inputFieldInches.setAttribute("required", "")
inputFieldInches.setAttribute("name", "heightPartInches")
inputFieldInches.setAttribute("id", "heightPartInches")
inputFieldInches.setAttribute("placeholder", "Inches")
inputContainerFeet.appendChild(inputFieldInches)

heightChoices.forEach((btn) => {
    btn.addEventListener('change', () => {
        let selected = document.querySelector(".height-section input[name='heightChoice']:checked").id
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

document.forms[0].onsubmit = (e) => {
    /*
    
Calculate basal metabolic rate (BMR), or the calories your body burns simply by being alive.
For men: 10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) + 5 (kcal / day)
For women: 10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) -161 (kcal / day)
    */
    let weight = document.getElementById("weight").value
    let weightVal
    let isNum = /^\d+$/.test(weight)
    if(isNum) {
        weightVal = parseFloat(weight)
    }
    weightChoices.forEach((btn) => {
        btn.addEventListener('change', () => {
            let selected = document.querySelector(".weight .weight-choice input[name='weightChoice']:checked").id
            if(!(selected == "weightChoiceKG")) {
                weightVal /= poundToKg
            }
        })
    })
    // We don't need to store this data
    e.preventDefault();
}