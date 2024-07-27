import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import "react-circular-progressbar/dist/styles.css"

export default function BudgetTracker() {

    const { state, dispatch, totalExpenses, remainingBudget } = useBudget()
    const percentage = +((totalExpenses / +state.budget) * 100).toFixed(2)

    return (
        <div className=" bg-white shadow-lg  w-full lg:w-1/2 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex justify-center">
                    <CircularProgressbar value={percentage}
                        styles={buildStyles({
                            pathColor: percentage === 100 ? '#DC2626' : '#3b82f6',
                            trailColor: '#F5F5F5',
                            textSize: 8,
                            textColor: percentage === 100 ? '#DC2626' : '#3b82f6'
                        })}
                        text={`${percentage}% Gastado`}
                    />
                </div>
                <div className="flex flex-col justify-center items-center gap-8">
                    <button
                        type="button"
                        className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-3xl"
                        onClick={() => dispatch({ type: 'reset-app' })}
                    >
                        Resetear App
                    </button>
                    <div className="flex flex-col gap-3">
                        <AmountDisplay label="Presupuesto" amount={+state.budget} />
                        <AmountDisplay label="Disponible" amount={remainingBudget} />
                        <AmountDisplay label="Gastado" amount={totalExpenses} />
                    </div>

                </div>
            </div>
        </div>

    )
}
