import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"


export default function ExpenseList() {
    const { state } = useBudget()
    const filterdExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses
    const isEmpty = useMemo(() => filterdExpenses.length === 0, [filterdExpenses])

    return (
        <div className="mt-5 bg-white shadow-lg rounded-lg py-5 p-3 md:h-full overflow-y-auto scrollbar-thin">
            <div>
                {isEmpty ? <p className="text-gray-600 text-lg md:text-2xl font-bold">No Hay Gastos</p> : (
                    <>
                        <p className="text-gray-600 text-lg md:text-2xl font-bold ">
                            Listado de Gastos:
                        </p>
                        {filterdExpenses.map(expense => (
                            <ExpenseDetail key={expense.id} expense={expense} />
                        ))}
                    </>
                )}
            </div>
        </div>

    )
}
