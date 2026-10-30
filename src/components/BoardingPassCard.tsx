import { motion } from 'motion/react'
import type { BoardingPass } from '../types/flight'

interface Props {
  pass: BoardingPass
  onSelect: (pass: BoardingPass) => void
}

function BoardingPassCard({ pass, onSelect }: Props) {
  const time = new Date(pass.departure).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <motion.div
      className="w-full max-w-sm cursor-pointer overflow-hidden rounded-3xl text-white shadow-lg"
      style={{ backgroundColor: pass.color }}
      onClick={() => onSelect(pass)}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {/* Top section: airline, flight number, route */}
      <div className="p-6">
        <div className="flex justify-between text-sm opacity-80">
          <span>{pass.airline}</span>
          <span>{pass.flightNumber}</span>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-5xl font-semibold tracking-tight">
              {pass.from.code}
            </p>
            <p className="text-sm opacity-80">{pass.from.city}</p>
          </div>

          <span className="text-2xl">✈</span>

          <div className="text-right">
            <p className="text-5xl font-semibold tracking-tight">
              {pass.to.code}
            </p>
            <p className="text-sm opacity-80">{pass.to.city}</p>
          </div>
        </div>
      </div>

      {/* Tear-off line */}
      <div className="border-t border-dashed border-white/30" />

      {/* Bottom section: gate, seat, boarding time */}
      <div className="grid grid-cols-3 gap-4 p-6">
        <div>
          <p className="text-xs uppercase tracking-wide opacity-70">Gate</p>
          <p className="text-xl font-medium">{pass.gate}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide opacity-70">Seat</p>
          <p className="text-xl font-medium">{pass.seat}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide opacity-70">Boards</p>
          <p className="text-xl font-medium">{time}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default BoardingPassCard