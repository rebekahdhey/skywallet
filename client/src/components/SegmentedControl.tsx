import { motion } from "motion/react";

export type View = 'wallet' | 'book'

interface ControlProps {
  value: View
  onChange: (value: View) => void
}

const options: { value: View; label: string }[] = [
  { value: 'wallet', label: 'Wallet' },
  { value: 'book', label: 'Book' },
]

function SegmentedControl({ value, onChange }: ControlProps) {
  return (
    <div className="flex rounded-full bg-separator p-1">
      {options.map((option) => (
        <button 
          key={option.value} 
          onClick={() => onChange(option.value)}
          className="relative z-10 flex-1 rounded-full py-1.5 text-sm font-medium"
        >
          {value === option.value && (
            <motion.span
              layoutId="segment"
              className="absolute inset-0 -z-10 rounded-full bg-surface shadow-sm"
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            />
          )}
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default SegmentedControl