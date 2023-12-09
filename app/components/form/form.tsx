import {useState} from "react";
import {useProvider} from "../../contexts/context";

export function Form(){
    const [stage, setStage] = useState(1);
    const {state} = useProvider();
    const buttonClasses = state.isDarkTheme ? "w-1/3 hover:bg-[#666] text-white border-2 border-white bg-dark"
    :
    "w-1/3 hover:bg-[#666] text-white bg-[#333]";

    switch(stage) {
        case 1:
            return (
                <main className="flex justify-center items-center h-screen text-light ">
                    <form onSubmit={e => {e.preventDefault(); setStage(2)}} className="min-w-[280px] w-[280px] min-h-[350px] h-[350px] border-2 border-black outline-none p-4" method="GET" action="">
                        <fieldset className="flex justify-between">
                            <button className={buttonClasses} type="button">US System</button>
                            <button className={buttonClasses} type="button">Metric System</button>
                        </fieldset>
                        <label className="block" htmlFor="inWeight">Weight</label>
                        <input className="border-2 border-black focus:outline-none" id="inWeight" type="number" placeholder="weight in kg"/>
                        <label className="block" htmlFor="inHeight">Height</label>
                        <input className="border-2 border-black focus:outline-none" id="inHeight" type="number" placeholder="height in meters"/>
                        <label className="block" htmlFor="inAge">Age</label>
                        <input className="border-2 border-black focus:outline-none" id="inAge" type="number"/>
                        <fieldset>
                            <legend>Gender</legend>
                            <section className="flex justify-between space-x-4 items-center">
                                <label htmlFor="inMale">
                                    <input id="inMale" type="radio"/>
                                    <span className="px-4">
                                        male
                                    </span>
                                </label>
                                <label htmlFor="inFemale">
                                    <input id="inFemale" type="radio"/>
                                    <span className="px-4">
                                        female
                                    </span>
                                </label>
                            </section>
                        </fieldset>
                        <fieldset className="flex justify-center">
                            <button className={buttonClasses} type="submit">Next</button>
                        </fieldset>
                    </form>
                </main>
            )
        case 2:
            return (
                <main className="flex justify-center items-center h-screen text-light ">
                <form onSubmit={e => {e.preventDefault(); setStage(3)}} className="min-w-[280px] w-[280px] min-h-[350px] h-[350px] border-2 border-black outline-none p-4" method="GET" action="">
                    <fieldset className="flex flex-col">
                        <legend>Choose your activity level</legend>
                        <label htmlFor="inSedentary">
                            <input id="inSedentary" type="radio" />
                            <span className="px-4">
                                        Sedentary (no activity)
                                    </span>
                        </label>
                        <label htmlFor="inLight">
                            <input id="inLight" type="radio" />
                            <span className="px-4">
                                        Lightly Active (1 - 2 Days)
                                    </span>
                        </label>
                        <label htmlFor="inModerate">
                            <input id="inModerate" type="radio" />
                            <span className="px-4">
                                        Moderately Active (3 - 5 Days)
                                    </span>
                        </label>
                        <label htmlFor="inVery">
                            <input id="inVery" type="radio" />
                            <span className="px-4">
                                        Very Active (6 - 7 Days)
                                    </span>
                        </label>
                        <label htmlFor="inExtra">
                            <input id="inExtra" type="radio" />
                            <span className="px-4">
                                        Extra Active (2x per day)
                            </span>
                        </label>
                    </fieldset>
                    <fieldset className="flex justify-center">
                            <button className={buttonClasses} type="submit">Next</button>
                    </fieldset>
                </form>
            </main>
            )
        case 3:
            return (
                <main className="flex justify-center items-center h-screen text-light ">
                <form onSubmit={e => {e.preventDefault(); setStage(4)}} className="min-w-[280px] w-[280px] min-h-[350px] h-[350px] border-2 border-black outline-none p-4" method="GET" action="">
                <fieldset className="flex flex-col">
                        <legend>Choose your goal</legend>
                        <label htmlFor="inLose">
                            <input id="inLose" type="radio" />
                            <span className="px-4">
                                        Lose Weight
                            </span>
                        </label>
                        <label htmlFor="inMaintain">
                            <input id="inMaintain" type="radio" />
                            <span className="px-4">
                                        Maintain Weight
                            </span>
                        </label>
                        <label htmlFor="inGain">
                            <input id="inGain" type="radio" />
                            <span className="px-4">
                                        Gain Weight
                            </span>
                        </label>
                    </fieldset>
                    <fieldset className="flex justify-center">
                            <button className={buttonClasses} type="submit">Finish</button>
                    </fieldset>
                </form>
            </main>
            )
        case 4:
            return (
                <p>All done!</p>
            )
    }

}