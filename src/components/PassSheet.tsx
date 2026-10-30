import { motion, useReducedMotion } from 'motion/react'
import type { BoardingPass } from '../types/flight'

interface Props {
  pass: BoardingPass
  onClose: () => void
}

export default function PassSheet({ pass, onClose }: Props) {
  const reduceMotion = useReducedMotion()
  return (
    <>
      {/* The dimmed, blurred backdrop */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* The sheet */}
      <motion.div
        className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md rounded-t-3xl bg-surface p-6 pb-10 shadow-2xl ring-1 ring-separator"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: 'spring', stiffness: 380, damping: 36}
        }
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 120 || info.velocity.y > 500) onClose()
        }}
      >
        <div className='mx-auto mb-6 h-1.5 w-10 rounded-full bg-label-secondary/30'/>

        <h2 className="text-2xl font-semibold tracking-tight">
          {pass.from.city} to {pass.to.city}
        </h2>
        <p className="text-label-secondary">
          {pass.airline} · {pass.flightNumber}
        </p>

        <div className='mt-6 grid grid-cols-2 gap-y-5'>
          <div>
            <p className='text-xs uppercase tracking-wide text-label-secondary'>Passenger</p>
            <p className='text-lg font-medium'>{pass.passenger}</p>
          </div>
          <div>
            <p className='text-xs uppercase tracking-wide text-label-secondary'>Terminal</p>
            <p className='text-lg font-medium'>{pass.terminal}</p>
          </div>
          <div>
            <p className='text-xs uppercase tracking-wide text-label-secondary'>Gate</p>
            <p className='text-lg font-medium'>{pass.gate}</p>
          </div>
          <div>
            <p className='text-xs uppercase tracking-wide text-label-secondary'>Seat</p>
            <p className='text-lg font-medium'>{pass.seat}</p>
          </div>
        </div>
      </motion.div>
    </>
  )
}