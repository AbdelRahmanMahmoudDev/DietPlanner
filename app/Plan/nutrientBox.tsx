import { useProvider } from "@/contexts/context"

export default function NutrientBox({title, info}: {title: string, info: string}) {
  const {state} = useProvider() || {};
  const boxClasses = state.isDarkTheme ? 'flex justify-center items-center w-full items-center flex-col border-2 rounded p-4' : 
  'flex justify-center items-center w-full items-center flex-col border-2 rounded p-4 bg-gray-200';
    return (
      <div className={boxClasses}>
        <span>{title}</span>
        <br />
        <span>{info}</span>
      </div>
    )
  }