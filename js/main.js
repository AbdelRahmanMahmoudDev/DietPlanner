let weightChoices = document.querySelectorAll("input[name='weightChoice']")
let heightChoices = document.querySelectorAll("input[name='heightChoice']")
let heightInputSection = document.getElementById("heightDynamicInput");

const poundToKg = 2.20462
const feetToCentiMeters = 30.48
const inchToCentiMeters = 2.54

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
inputFieldFeet.setAttribute("id", "heightPartFeet")
inputFieldFeet.setAttribute("placeholder", "Feet")
inputFieldFeet.style.marginRight = "10px";
inputFieldFeet.style.marginBottom = "10px";
inputContainerFeet.appendChild(inputFieldFeet)

let inputFieldInches = document.createElement("input")
inputFieldInches.setAttribute("type", "number")
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
    let weightVal, heightVal, ageVal
    let weight = document.getElementById("weight").value
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
    heightChoices.forEach((btn) => {
        btn.addEventListener('change', () => {
            let selected = document.querySelector(".height-section input[name='heightChoice']:checked").id
            if(!(selected == "heightChoiceMeters")) {
                let heightFeet, heightInch
                heightFeet = parseFloat(document.getElementById("heightPartFeet").value)
                heightInch = parseFloat(document.getElementById("heightPartInches").value)
    
                heightFeet *= feetToCentiMeters
                heightInch *= inchToCentiMeters

                heightVal = heightFeet + heightInch
            } else {
                heightVal = parseFloat(document.getElementById("heightInCm").value)
            }
        })
    })

    // We don't need to store this data
    e.preventDefault();
}