import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"


function App() {

  const { state, dispatch } = useBudget()
  const isValidBudget = useMemo(() => +state.budget > 0, [state.budget])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])

  return (
    <>
      <header className="flex justify-between items-center bg-blue-600 p-5 max-h-72 rounded-b-3xl">
        <h1 className="uppercase text-center font-black text-sm  md:text-xl lg:text-2xl text-white">
          Planificador de Gastos
        </h1>
        <button
          type="button"
          className="bg-pink-600 px-5 py-2 text-white uppercase font-bold rounded-3xl text-xs lg:text-lg"
          onClick={() => dispatch({ type: 'reset-app' })}
        >
          Resetear App
        </button>
      </header>
      <div className="flex flex-col lg:flex-row gap-8 items-start p-5 mt-1 lg:mt-3">

        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}

        {isValidBudget && (
          <main className="w-full lg:w-1/2 lg:h-[calc(100vh-15.5rem)]">
            <FilterByCategory />
            <ExpenseList />
            <ExpenseModal />
          </main>
        )}

      </div>

    </>
  )
}

export default App
