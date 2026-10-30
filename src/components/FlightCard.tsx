import { motion } from 'motion/react'
import type { Flight } from '../types/flight'
import { formatPrice, formatTime } from '../utils/format'

interface Props {
  flight: Flight
  onSelect: (flight: Flight) => void
}

export default function FlightCard({ flight, onSelect }: Props) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(flight)}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="w-full rounded-2xl bg-surface p-5 text-left ring-1 ring-separator"
    >
      {/* Top row: airline and flight number */}
      <span className="flex justify-between text-sm text-label-secondary">
        <span>{flight.airline}</span>
        <span>{flight.flightNumber}</span>
      </span>

      {/* Middle row: departure and arrival times */}
      <span className="mt-3 flex items-center justify-between text-2xl font-semibold tracking-tight">
        <span>{formatTime(flight.departure)}</span>
        <span className="text-label-secondary">→</span>
        <span>{formatTime(flight.arrival)}</span>
      </span>

      {/* Bottom row: route and price */}
      <span className="mt-3 flex items-center justify-between">
        <span className="text-sm text-label-secondary">
          {flight.from.code} → {flight.to.code}
        </span>
        <span className="text-lg font-medium">{formatPrice(flight.price)}</span>
      </span>
    </motion.button>
  )
}