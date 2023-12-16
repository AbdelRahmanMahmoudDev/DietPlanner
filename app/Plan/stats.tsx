import NutrientBox from "./nutrientBox";

export default function Stats({bmr, calories, protein, fats, carbs}:
    {bmr: number, calories: number, protein: number, fats: number, carbs: number}) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <NutrientBox title="Basal Metabolic Rate (BMR)" info={bmr.toString()}/>
            <NutrientBox title="Caloric Needs" info={calories.toString()}/>
            <NutrientBox title="Protein" info={`${protein.toString()} grams`}/>
            <NutrientBox title="Carbohydrates" info={`${carbs.toString()} grams`}/>
            <NutrientBox title="Fats" info={`${fats.toString()} grams`}/>
        </div>
    )
}