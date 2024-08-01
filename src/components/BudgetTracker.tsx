import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import "react-circular-progressbar/dist/styles.css"

export default function BudgetTracker() {

    const { state, totalExpenses, totalSaving, remainingBudget } = useBudget()
    const percentageExpenses = +((totalExpenses / (+state.budget -totalSaving)) * 100).toFixed(2)
    const percentageSaving = +((totalSaving / +state.budget) * 100).toFixed(2)
    
    return (
        <div className="bg-white flex-col gap-5 shadow-lg w-full lg:w-1/2 rounded-xl p-5">
            <div>
                <div className="pb-4 text-center">
                    <h4 className="text-xl font-semibold">Análisis de Finanzas</h4>
                    <span className="text-xs">Gráficos de gasto y ahorro para evaluar tu situación financiera de un vistazo.</span>
                </div>
                <div className="flex gap-5 justify-center">
                    <CircularProgressbar value={percentageSaving}
                        styles={buildStyles({
                            pathColor:  '#11D18F',
                            trailColor: '#F5F5F5',
                            textSize: 8,
                            textColor: '#11D18F'
                        })}
                        text={`${percentageSaving}% Ahorrado`}
                    />
                    <CircularProgressbar value={percentageExpenses}
                        styles={buildStyles({
                            pathColor: percentageExpenses === 100 ? '#DC2626' : '#3b82f6',
                            trailColor: '#F5F5F5',
                            textSize: 8,
                            textColor: percentageExpenses === 100 ? '#DC2626' : '#3b82f6'
                        })}
                        text={`${percentageExpenses}% Gastado`}
                    />
                </div>
            </div>

            <div className="flex flex-wrap pt-4 justify-around text-center gap-5">
                <AmountDisplay label="Inicial" amount={+state.budget} />
                <AmountDisplay label="Ahorro" amount={totalSaving} />
                <AmountDisplay label="Disponible" amount={remainingBudget} />
                <AmountDisplay label="Gastado" amount={totalExpenses} />
            </div>

        </div>

    )
}
