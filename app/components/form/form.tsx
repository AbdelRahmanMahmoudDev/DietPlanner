"use client"
import {useState} from "react";
import {useProvider, ACTIONS, OPTIONS} from "../../contexts/context";
import Link from 'next/link';


const STAGES = {
    FIRST_STAGE: 1,
    SECOND_STAGE: 2,
    THIRD_STAGE: 3,
    FINAL_STAGE: 4
}


export function Form(){
    const [stage, setStage] = useState(STAGES.FIRST_STAGE);
    const {state, dispatch} = useProvider();
    
    const onFinishStageOne = (e:any) => {
        e.preventDefault();
        setStage(STAGES.SECOND_STAGE);
        if (!state.isMetric) {
            // We will almost always want the height in the metric system
            let heightInFeet = state.userInput.heightFeet;
            let heightInInches = state.userInput.heightInches;
            const FEET_TO_CM = 30.48;
            const INCH_TO_CM = 2.54;
            let metricHeight = (heightInFeet * FEET_TO_CM) + (heightInInches * INCH_TO_CM);
            dispatch({type: ACTIONS.SET_HEIGHT, payload: {value: metricHeight}});
        }
    }

    const buttonClasses = state.isDarkTheme ? "w-1/3 hover:bg-[#666] text-white border-2 border-white bg-dark"
    :
    "w-1/3 hover:bg-[#666] text-white bg-[#333]";

    const selectedButtonClasses = state.isDarkTheme ? "w-1/3 bg-[#666] text-white border-2 border-white bg-[#333]"
    :
    "w-1/3 bg-[#666] text-white bg-[#333]";

    switch(stage) {
        case STAGES.FIRST_STAGE:
            return (
                <main className="flex justify-center items-center h-screen text-light ">
                    <form onSubmit={e => onFinishStageOne(e)} className="flex flex-col justify-between min-w-[280px] w-[280px] min-h-[350px] border-2 border-black outline-none p-4" method="GET" action="">
                        <span className="mx-auto">[1 / 3]</span>
                        <fieldset className="flex justify-between">
                            <button className={!state.isMetric ? selectedButtonClasses : buttonClasses} onClick={e => dispatch({type: ACTIONS.SET_US})} type="button">US System</button>
                            <button className={state.isMetric ? selectedButtonClasses : buttonClasses} onClick={e => dispatch({type: ACTIONS.SET_METRIC})} type="button">Metric System</button>
                        </fieldset>
                        <label className="block" htmlFor="inWeight">Weight<span className="text-[#f00]">*</span></label>
                        <input required className="border-2 border-black focus:outline-none placeholder:px-2 text-dark-text" id="inWeight" onChange={e => dispatch({type: ACTIONS.SET_WEIGHT, payload: {value: e.target.value}})} type="number" step="0.1" placeholder={state.isMetric ? "kgs" : "pounds"}/>
                        {state.isMetric &&
                            <>
                                <label className="block" htmlFor="inHeight">Height<span className="text-[#f00]">*</span></label>
                                <input required
                                className="border-2 border-black focus:outline-none placeholder:px-2 text-dark-text" id="inHeight"
                                onChange={e => dispatch({type: ACTIONS.SET_HEIGHT, payload: {value: e.target.value}})} type="number" step="0.1" placeholder="meters"/>
                            </>}
                        {!state.isMetric &&
                            <>
                                <label className="block" htmlFor="inHeightFeet">Height<span className="text-[#f00]">*</span></label>
                                <input required
                                        className="w-full border-2 border-black focus:outline-none placeholder:px-2 my-2 text-dark-text"
                                        id="inHeightFeet"
                                        onChange={e => {dispatch({type: ACTIONS.SET_HEIGHT_FEET, payload: {value: e.target.value}}); console.log(e.target.value)}}
                                        type="number" step="0.1" placeholder="feet"/>
                                <input required
                                        className="w-full border-2 border-black focus:outline-none placeholder:px-2 my-2 text-dark-text"
                                        id="inHeightInches"
                                        onChange={e => {dispatch({type: ACTIONS.SET_HEIGHT_INCHES, payload: {value: e.target.value}}); console.log(e.target.value)}}
                                        type="number" step="0.1" placeholder="inches"/>
                            </>}
                        <label className="block" htmlFor="inAge">Age<span className="text-[#f00]">*</span></label>
                        <input required className="border-2 border-black focus:outline-none text-dark-text" id="inAge"  onChange={e => dispatch({type: ACTIONS.SET_AGE, payload: {value: e.target.value}})} type="number"/>
                        <fieldset>
                            <legend>Gender <span className="block text-[#f00]">*Required</span></legend>
                            <section className="flex justify-between space-x-4 items-center">
                                <label htmlFor="inMale">
                                    <input id="inMale" name="gender-options" value={OPTIONS.GENDER.MALE}  onChange={e => dispatch({type: ACTIONS.SET_GENDER, payload: {value: e.target.value}})} required type="radio"/>
                                    <span className="px-4">
                                        male
                                    </span>
                                </label>
                                <label htmlFor="inFemale">
                                    <input id="inFemale" name="gender-options" value={OPTIONS.GENDER.FEMALE} onChange={e => dispatch({type: ACTIONS.SET_GENDER, payload: {value: e.target.value}})} type="radio"/>
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
        case STAGES.SECOND_STAGE:
            return (
                <main className="flex justify-center items-center h-screen text-light ">
                <form onSubmit={e => {e.preventDefault(); setStage(STAGES.THIRD_STAGE)}} className="flex flex-col justify-between min-w-[280px] w-[280px] min-h-[350px] border-2 border-black outline-none p-4" method="GET" action="">
                <span className="mx-auto">[2 / 3]</span>

                    <fieldset className="flex flex-col">
                        <legend>Choose your activity level <span className="text-[#f00]">*</span></legend>
                        <label htmlFor="inSedentary">
                            <input id="inSedentary" name="activity-options" value={OPTIONS.ACTIVITY_LEVEL.SEDENTARY} onChange={e => dispatch({type: ACTIONS.SET_ACTIVITY, payload: {value: e.target.value}})} required type="radio" />
                            <span className="px-4">
                                        Sedentary (no activity)
                                    </span>
                        </label>
                        <label htmlFor="inLight">
                            <input id="inLight" name="activity-options" value={OPTIONS.ACTIVITY_LEVEL.LIGHT} onChange={e => dispatch({type: ACTIONS.SET_ACTIVITY, payload: {value: e.target.value}})} type="radio" />
                            <span className="px-4">
                                        Lightly Active (1 - 2 Days)
                                    </span>
                        </label>
                        <label htmlFor="inModerate">
                            <input id="inModerate" name="activity-options" value={OPTIONS.ACTIVITY_LEVEL.MODERATE} onChange={e => dispatch({type: ACTIONS.SET_ACTIVITY, payload: {value: e.target.value}})} type="radio" />
                            <span className="px-4">
                                        Moderately Active (3 - 5 Days)
                                    </span>
                        </label>
                        <label htmlFor="inVery">
                            <input id="inVery" name="activity-options" value={OPTIONS.ACTIVITY_LEVEL.VERY} onChange={e => dispatch({type: ACTIONS.SET_ACTIVITY, payload: {value: e.target.value}})} type="radio" />
                            <span className="px-4">
                                        Very Active (6 - 7 Days)
                                    </span>
                        </label>
                        <label htmlFor="inExtra">
                            <input id="inExtra" name="activity-options" value={OPTIONS.ACTIVITY_LEVEL.EXTRA} onChange={e => dispatch({type: ACTIONS.SET_ACTIVITY, payload: {value: e.target.value}})} type="radio" />
                            <span className="px-4">
                                        Extra Active (2x per day)
                            </span>
                        </label>
                    </fieldset>
                    <span className="block text-[#f00]">*Required</span>
                    <fieldset className="flex justify-between">
                            <button className={buttonClasses} type="submit">Next</button>
                            <button className={buttonClasses} onClick={e => setStage(STAGES.FIRST_STAGE)} type="button">Back</button>
                    </fieldset>
                </form>
            </main>
            )
        case STAGES.THIRD_STAGE:
            return (
                <main className="flex justify-center items-center h-screen text-light ">
                <form onSubmit={e => {e.preventDefault(); setStage(STAGES.FINAL_STAGE)}} className="flex flex-col justify-between min-w-[280px] w-[280px] min-h-[350px] border-2 border-black outline-none p-4" method="GET" action="">
                <span className="mx-auto">[3 / 3]</span>

                <fieldset className="flex flex-col">
                        <legend>Choose your goal <span className="text-[#f00]">*</span></legend>
                        <label htmlFor="inLose">
                            <input id="inLose" name="goal-options" value={OPTIONS.GOAL.LOSE_WEIGHT} onChange={e => dispatch({type: ACTIONS.SET_GOAL, payload: {value: e.target.value}})} required type="radio" />
                            <span className="px-4">
                                        Lose Weight
                            </span>
                        </label>
                        <label htmlFor="inMaintain">
                            <input id="inMaintain" name="goal-options" value={OPTIONS.GOAL.MAINTAIN_WEIGHT} onChange={e => dispatch({type: ACTIONS.SET_GOAL, payload: {value: e.target.value}})} type="radio" />
                            <span className="px-4">
                                        Maintain Weight
                            </span>
                        </label>
                        <label htmlFor="inGain">
                            <input id="inGain" name="goal-options" value={OPTIONS.GOAL.GAIN_WEIGHT} onChange={e => dispatch({type: ACTIONS.SET_GOAL, payload: {value: e.target.value}})} type="radio" />
                            <span className="px-4">
                                        Gain Weight
                            </span>
                        </label>
                    </fieldset>
                    <span className="block text-[#f00]">*Required</span>
                    <fieldset className="flex justify-between">
                            <button className={buttonClasses} type="submit">Finish</button>
                            <button className={buttonClasses} onClick={e => setStage(STAGES.SECOND_STAGE)} type="button">Back</button>

                    </fieldset>
                </form>
            </main>
            )
        case STAGES.FINAL_STAGE:
            return (
                <section className="flex justify-center flex-col items-center h-screen">
                    <h3>Your Information:</h3>
                    <p>weight: {state.userInput.weight}</p>
                    <p>height: {state.userInput.height}</p>
                    <p>height in feet: {state.userInput.heightFeet}</p>
                    <p>height in inches: {state.userInput.heightInches}</p>
                    <p>age: {state.userInput.age}</p>
                    <p>gender: {state.userInput.gender}</p>
                    <p>activity level: {state.userInput.activityLevel}</p>
                    <p>goal: {state.userInput.goal}</p>
                    <button className={buttonClasses}><Link href="/Plan">Create your plan</Link></button>
                </section>
            )
    }
}