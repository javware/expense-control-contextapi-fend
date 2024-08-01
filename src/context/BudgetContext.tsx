import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react"
import { BudgetActions, BudgetState, budgetReducer, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    totalExpenses: number
    totalSaving: number
    remainingBudget: number
}

type BudgetProviderProps = {
    children: ReactNode
}
export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({ children }: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)
    const totalSaving = useMemo(() => state.expenses.reduce((total, expense) => expense.category === "1" ? expense.amount + total : total, 0), [state.expenses])
    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.category != "1" ? expense.amount + total : total, 0), [state.expenses])
 
    const remainingBudget = +state.budget - totalExpenses - totalSaving


    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                totalSaving,
                remainingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}