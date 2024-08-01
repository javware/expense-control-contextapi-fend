import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label?: string,
    amount: number
}

export default function AmountDisplay({ label, amount }: AmountDisplayProps) {
    return (
        <p className={`flex flex-col text-xl md:text-xl font-bold
        ${label === 'Disponible' ? 'text-orange-400 ' : label === 'Ahorro' ? 'text-emerald-500' : label === 'Gastado' ? 'text-red-500' : 'text-blue-600'}`}>
            {label && `${label}`}
            <span className="font-bold text-black"> {formatCurrency(amount)}</span>
        </p>
    )
}
