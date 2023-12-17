export default function FoodEntry({name, protein, fats, carbs, customClasses}:
    {name: string, protein: string, fats: string, carbs: string, customClasses: string}) {
        return (
            <li className={`${customClasses} flex justify-evenly items-center`}>
                <span className="w-1/4 my-4 text-center">{name}</span>
                <span className="w-1/4 my-4 text-center">{protein}</span>
                <span className="w-1/4 my-4 text-center">{fats}</span>
                <span className="w-1/4 my-4 text-center">{carbs}</span>
            </li>
        )
}