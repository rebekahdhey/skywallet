import { motion, useReducedMotion } from 'motion/react'
import type { BoardingPass } from '../types/flight'
import { useIsDesktop } from '../hooks/useIsDesktop'

interface Props {
  pass: BoardingPass
  onClose: () => void
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-label-secondary">
        {label}
      </p>
      <p className="text-lg font-medium">{value}</p>
    </div>
  )
}

export default function PassSheet({ pass, onClose }: Props) {
  const reduceMotion = useReducedMotion()
  const isDesktop = useIsDesktop()

  // Phones: slide up from the bottom. Desktop: fade and scale in place.
  const hidden = isDesktop ? { opacity: 0, scale: 0.96, y: 16 } : { y: '100%' }
  const shown = isDesktop ? { opacity: 1, scale: 1, y: 0 } : { y: 0 }

  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Centering layer: bottom on phones, middle on desktop */}
      <div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-6">
        <motion.div
          className="pointer-events-auto relative w-full max-w-md rounded-t-3xl bg-surface p-6 pb-10 shadow-2xl ring-1 ring-separator md:rounded-3xl md:pb-6"
          initial={hidden}
          animate={shown}
          exit={hidden}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: 'spring', stiffness: 380, damping: 36 }
          }
          drag={isDesktop ? false : 'y'}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.6 }}
          onDragEnd={(_, info) => {
            if (info.offset.y > 120 || info.velocity.y > 500) onClose()
          }}
        >
          <div className="mx-auto mb-6 h-1.5 w-10 rounded-full bg-label-secondary/30 md:hidden" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 hidden h-8 w-8 place-items-center rounded-full bg-separator text-label-secondary transition hover:text-label md:grid"
          >
            ✕
          </button>

          <h2 className="text-2xl font-semibold tracking-tight">
            {pass.from.city} to {pass.to.city}
          </h2>
          <p className="text-label-secondary">
            {pass.airline} · {pass.flightNumber}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-y-5">
            <Detail label="Passenger" value={pass.passenger} />
            <Detail label="Terminal" value={pass.terminal} />
            <Detail label="Gate" value={pass.gate} />
            <Detail label="Seat" value={pass.seat} />
          </div>
        </motion.div>
      </div>
    </>
  )
}