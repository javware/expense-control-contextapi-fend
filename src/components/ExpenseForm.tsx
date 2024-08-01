import { ChangeEvent, useEffect, useState } from "react";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";



export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')
    const [previusAmount, setPreviusAmount] = useState(0)
    const { dispatch, state, remainingBudget } = useBudget()

    useEffect(() => {
        if (state.editingId) {
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
            setExpense(editingExpense)
            setPreviusAmount(editingExpense.amount)
        }
    }, [state.editingId])


    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value

        })
    }

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //Validación
        if (Object.values(expense).includes('')) {
            setError('Todos los campos son olbigatorios.')
            return
        }

        //Validar que no pase del presupuesto
        if ((expense.amount - previusAmount) > remainingBudget) {
            setError('Ese gasto se sale del presupuesto')
            return
        }

        //Agregar o actualizar el Gasto
        if (state.editingId) {
            dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense } } })

        } else {
            dispatch({ type: 'add-expense', payload: { expense } })

        }

        //reiniciar el state
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })

        setPreviusAmount(0)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-start pb-4">
                <div>
                    <div className="text-2xl font-medium uppercase">{state.editingId ? 'Actualizar Gasto' : 'Registrar Nuevo Gasto'}</div>
                    <span className="text-xs">{state.editingId ? 'Modifique la información del gasto seleccionado a continuación.' : 'Complete el formulario a continuación para registrar un nuevo gasto.'} </span>
                </div>
                <div
                    className="flex justify-center items-center cursor-pointer bg-white font-semibold w-8 h-8 rounded-full shadow-3xl"
                    onClick={() => dispatch({ type: 'close-modal' })}
                >
                    x
                </div>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="space-y-4 px-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="expenseName" className="text-lg">Nombre Gasto</label>
                    <input type="text" id="expenseName" placeholder="Añade el nombre del gasto"
                        className="bg-slate-100 py-2 px-4 border border-slate-100  text-sm rounded-lg focus:border-blue-500 outline-none"
                        name="expenseName"
                        value={expense.expenseName}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="amount" className="text-lg">Cantidad:</label>
                    <input type="number" id="amount" placeholder="Añade la cantidad del gasto: ej. 300"
                        className="bg-slate-100 py-2 px-4 border border-slate-100  text-sm rounded-lg focus:border-blue-500 outline-none"
                        name="amount"
                        value={expense.amount.toString()}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="category" className="text-lg">Categoría:</label>
                    <select id="category"
                        className="bg-slate-100 py-2 px-4 border border-slate-100  text-sm rounded-lg focus:border-blue-500 outline-none"
                        name="category"
                        value={expense.category}
                        onChange={handleChange}
                    >
                        <option value="">-- Selecione --</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="amount" className="text-lg">Fecha Gasto:</label>
                    <DatePicker className={"bg-slate-100 py-2 px-4  border border-slate-100 text-sm rounded-lg focus:border-blue-500 outline-none"} value={expense.date} onChange={handleChangeDate} />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 cursor-pointer w-full p-2 py-3 text-white uppercase  font-bold rounded-3xl shadow-xl">
                    {state.editingId ? 'Guardar Cambios' : 'Registrar Gastos'}
                </button>
            </div>

        </form>
    )
}
