import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";


export default function FilterByCategory() {

    const { dispatch } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: 'add-filter-category', payload: { id: e.target.value } })
    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-5">
            <form>
                <div className="flex flex-row gap-5 justify-normal items-center">
                    <label htmlFor="category" className="w-1/5">Filtrar Gastos</label>
                    <div className="relative w-4/5">
                        <select id="category" className="appearance-none bg-slate-100 w-full border border-gray-200 focus:border-blue-500 outline-none py-3 px-5 rounded-3xl" onChange={handleChange}>
                            <option value="">-- Todo</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}> {category.name}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-700">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
