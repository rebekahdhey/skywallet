import { useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { Flight, PassengerDetails } from '../types/flight'
import { formatPrice, formatTime } from '../utils/format'
import { useIsDesktop } from '../hooks/useIsDesktop'

interface Props {
  flight: Flight
  onClose: () => void
  onConfirm: (details: PassengerDetails) => Promise<void>
}

export default function BookingSheet({ flight, onClose, onConfirm }: Props) {
  const reduceMotion = useReducedMotion()
  const isDesktop = useIsDesktop()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const hidden = isDesktop ? { opacity: 0, scale: 0.96, y: 16 } : { y: '100%' }
  const shown = isDesktop ? { opacity: 1, scale: 1, y: 0 } : { y: 0 }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      await onConfirm({ name: name.trim(), email: email.trim() })
    } catch {
      setError('Could not complete your booking. Please try again.')
      setSubmitting(false)
    }
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

      <div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-6">
        <motion.div
          className="pointer-events-auto relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-surface p-6 pb-10 shadow-2xl ring-1 ring-separator md:rounded-3xl md:pb-6"
          initial={hidden}
          animate={shown}
          exit={hidden}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: 'spring', stiffness: 380, damping: 36 }
          }
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
            {flight.from.city} to {flight.to.city}
          </h2>
          <p className="text-label-secondary">
            {flight.airline} · {flight.flightNumber}
          </p>
          <p className="mt-1 text-label-secondary">
            {formatTime(flight.departure)} → {formatTime(flight.arrival)}
          </p>

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
              disabled={submitting}
              className="mt-2 w-full rounded-full bg-accent py-3 font-medium text-white transition hover:brightness-110 disabled:opacity-60"
            >
              {submitting
                ? 'Booking…'
                : `Confirm booking · ${formatPrice(flight.price)}`}
            </button>

            {error && (
              <p role="alert" className="text-center text-sm text-red-600">
                {error}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </>
  )
}