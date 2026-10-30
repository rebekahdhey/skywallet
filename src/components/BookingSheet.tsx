import { useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { Flight, PassengerDetails } from '../types/flight'
import { formatPrice, formatTime } from '../utils/format'

interface Props {
  flight: Flight
  onClose: () => void
  onConfirm: (details: PassengerDetails) => void
}

export default function BookingSheet({ flight, onClose, onConfirm }: Props) {
  const reduceMotion = useReducedMotion()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onConfirm({ name: name.trim(), email: email.trim() })
  }

  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md rounded-t-3xl bg-surface p-6 pb-10 shadow-2xl ring-1 ring-separator"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: 'spring', stiffness: 380, damping: 36 }
        }
      >
        <div className="mx-auto mb-6 h-1.5 w-10 rounded-full bg-label-secondary/30" />

        {/* Flight summary */}
        <h2 className="text-2xl font-semibold tracking-tight">
          {flight.from.city} to {flight.to.city}
        </h2>
        <p className="text-label-secondary">
          {flight.airline} · {flight.flightNumber}
        </p>
        <p className="mt-1 text-label-secondary">
          {formatTime(flight.departure)} → {formatTime(flight.arrival)}
        </p>

        {/* Passenger form */}
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label
              htmlFor="name"
              className="text-xs uppercase tracking-wide text-label-secondary"
            >
              Full name
            </label>
            <input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl bg-background px-4 py-3 text-label outline-none ring-1 ring-transparent transition focus:ring-accent"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-xs uppercase tracking-wide text-label-secondary"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl bg-background px-4 py-3 text-label outline-none ring-1 ring-transparent transition focus:ring-accent"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-accent py-3 font-medium text-white"
          >
            Confirm booking · {formatPrice(flight.price)}
          </button>
        </form>
      </motion.div>
    </>
  )
}