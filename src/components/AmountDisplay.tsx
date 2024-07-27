import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label?: string,
    amount: number
}

export default function AmountDisplay({ label, amount }: AmountDisplayProps) {
    return (
        <p className="text-xl md:text-2xl text-blue-600 font-bold">
            {label && `${label}:`}
            <span className="font-bold text-black"> {formatCurrency(amount)}</span>
        </p>
    )
}
