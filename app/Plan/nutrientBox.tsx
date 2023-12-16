export default function NutrientBox({title, info}: {title: string, info: string}) {
    return (
      <div className="flex justify-center items-center w-full items-center flex-col border-2 rounded p-4">
        <span>{title}</span>
        <br />
        <span>{info}</span>
      </div>
    )
  }