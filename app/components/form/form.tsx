export function Form(){
    return (
        <main className="flex justify-center items-center h-screen text-light ">
            <form className="border-2 border-black outline-none p-4" method="GET" action="">
                <fieldset className="flex justify-between">
                    <button className="w-1/3 hover:bg-[#666] text-white bg-[#333]" type="button">US System</button>
                    <button className="w-1/3 hover:bg-[#666] text-white bg-[#333]" type="button">Metric System</button>
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
                    <button className="w-1/2 hover:bg-[#666] text-white bg-[#333]" type="button">Next</button>
                </fieldset>
            </form>
        </main>
    )
}