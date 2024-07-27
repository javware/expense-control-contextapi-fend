import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"


function App() {

  const { state } = useBudget()
  const isValidBudget = useMemo(() => +state.budget > 0, [state.budget])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])



  return (
    <>
      <header className="bg-blue-600 py-5 max-h-72 rounded-b-3xl">
        <h1 className="uppercase text-center font-black  text-lg md:text-3xl text-white">
          Planificador de Gastos
        </h1>
      </header>
      <div className="flex flex-col lg:flex-row gap-8 items-start p-5 mt-1 lg:mt-3">

        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}


        {isValidBudget && (
          <main className="w-full lg:w-1/2 lg:h-[calc(100vh-15.5rem)] ">
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
