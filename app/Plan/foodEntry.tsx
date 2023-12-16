export default function FoodEntry({name, protein, fats, carbs}:
    {name: string, protein: string, fats: string, carbs: string}) {
        return (
            <li className="flex justify-center items-center">
                <span>{name}</span>
                <span>{protein}</span>
                <span>{fats}</span>
                <span>{carbs}</span>
            </li>
        )
}