import { useState, ChangeEvent, useMemo, FormEvent } from "react"
import { useBudget } from "../hooks/useBudget"


export default function BudgetForm() {
    const [budget, setBudget] = useState("")
    const { dispatch } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.value)
    }

    const isValid = useMemo(() => {
        return isNaN(+budget) || +budget <= 0
    }, [budget])


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: 'add-budget', payload: { budget } })
    }

    return (
        <div className="m-auto bg-white shadow-lg w-full lg:w-2/4 rounded-2xl mt-8 p-10">
            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-5">
                    <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
                        Definir Presupuesto
                    </label>
                    <input type="number"
                        id="budgetID"
                        className="w-full bg-white border border-gray-200 focus:border-blue-500 outline-none py-2 px-5 rounded-xl"
                        placeholder="Define tu presupuesto"
                        name="budget"
                        value={budget}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-3 text-white font-black uppercase disabled:opacity-40 rounded-3xl"
                    disabled={isValid}
                >
                    Definir Presupuesto
                </button>
            </form>
        </div>

    )
}
