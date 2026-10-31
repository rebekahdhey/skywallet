import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import BoardingPassCard from './components/BoardingPassCard'
import PassSheet from './components/PassSheet'
import SegmentedControl, { type View } from './components/SegmentedControl'
import SearchForm from './components/SearchForm'
import FlightCard from './components/FlightCard'
import FlightSkeleton from './components/FlightSkeleton'
import BookingSheet from './components/BookingSheet'
import Toast from './components/Toast'
import { createPass, getPasses, searchFlights } from './lib/api'
import type { BoardingPass, Flight, PassengerDetails } from './types/flight'

type Status = 'idle' | 'loading' | 'success' | 'error'

function App() {
  const [passes, setPasses] = useState<BoardingPass[]>([])
  const [passesStatus, setPassesStatus] = useState<Status>('loading')
  const [selected, setSelected] = useState<BoardingPass | null>(null)
  const [view, setView] = useState<View>('wallet')
  const [results, setResults] = useState<Flight[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [bookingFlight, setBookingFlight] = useState<Flight | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const reduceMotion = useReducedMotion()

  // Load the wallet from the server once, when the app opens
  useEffect(() => {
    getPasses()
      .then((data) => {
        setPasses(data)
        setPassesStatus('success')
      })
      .catch(() => setPassesStatus('error'))
  }, [])

  async function handleSearch(from: string, to: string) {
    setStatus('loading')

    try {
      const flights = await searchFlights(from, to)
      setResults(flights)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  function handleViewChange(next: View) {
    setView(next)
    setStatus('idle')
    setResults([])
  }

  // No try/catch on purpose: if createPass fails, the error travels up
  // to BookingSheet, which shows the message.
  async function handleConfirm(details: PassengerDetails) {
    if (!bookingFlight) return

    const newPass = await createPass(bookingFlight.id, details.name)

    setPasses((prev) => [...prev, newPass])
    setBookingFlight(null)
    setView('wallet')
    setToast('Booking confirmed')
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <div className="min-h-screen px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto flex max-w-sm flex-col gap-6 md:max-w-3xl md:gap-10 lg:max-w-5xl">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-label md:text-5xl">
              Wallet
            </h1>
            <p className="mt-1 text-label-secondary">Your upcoming flights</p>
          </div>
          <div className="md:w-64">
            <SegmentedControl value={view} onChange={handleViewChange} />
          </div>
        </header>

        {view === 'wallet' ? (
          <>
            {passesStatus === 'loading' && (
              <div className="h-56 animate-pulse rounded-3xl bg-surface ring-1 ring-separator" />
            )}

            {passesStatus === 'error' && (
              <div className="rounded-2xl bg-surface p-6 text-center ring-1 ring-separator">
                <p className="font-medium">Couldn't load your wallet</p>
                <p className="mt-1 text-sm text-label-secondary">
                  Check that the API is running, then refresh.
                </p>
              </div>
            )}

            {passesStatus === 'success' && passes.length === 0 && (
              <div className="rounded-2xl border border-dashed border-separator p-10 text-center">
                <p className="font-medium">No boarding passes yet</p>
                <p className="mt-1 text-sm text-label-secondary">
                  Book a flight and it will appear here.
                </p>
                <button
                  type="button"
                  onClick={() => handleViewChange('book')}
                  className="mt-4 rounded-full bg-accent px-5 py-2 text-sm font-medium text-white"
                >
                  Book a flight
                </button>
              </div>
            )}

            {passesStatus === 'success' && passes.length > 0 && (
              <div className="relative md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {passes.map((pass, index) => (
                  <motion.div
                    key={pass.id}
                    className={
                      index === 0 ? 'relative' : 'relative -mt-32 md:mt-0'
                    }
                    style={{ zIndex: index }}
                    initial={reduceMotion ? false : { opacity: 0, y: 40 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                        delay: index * 0.08,
                      },
                    }}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -12,
                            transition: {
                              type: 'spring',
                              stiffness: 400,
                              damping: 30,
                            },
                          }
                    }
                  >
                    <BoardingPassCard pass={pass} onSelect={setSelected} />
                  </motion.div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col gap-4 md:grid md:grid-cols-[20rem_1fr] md:items-start md:gap-8">
            <div className="md:sticky md:top-8">
              <SearchForm onSearch={handleSearch} />
            </div>

            <div className="flex flex-col gap-4">
              {status === 'idle' && (
                <div className="hidden rounded-2xl border border-dashed border-separator p-10 text-center text-label-secondary md:block">
                  Choose a route to see available flights.
                </div>
              )}

              {status === 'loading' && (
                <>
                  <FlightSkeleton />
                  <FlightSkeleton />
                </>
              )}

              {status === 'error' && (
                <div className="rounded-2xl bg-surface p-6 text-center ring-1 ring-separator">
                  <p className="font-medium">Couldn't reach the server</p>
                  <p className="mt-1 text-sm text-label-secondary">
                    Check that the API is running, then search again.
                  </p>
                </div>
              )}

              {status === 'success' && results.length === 0 && (
                <p className="text-center text-label-secondary">
                  No flights found for that route.
                </p>
              )}

              {status === 'success' &&
                results.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    onSelect={setBookingFlight}
                  />
                ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <PassSheet
            key={selected.id}
            pass={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {bookingFlight && (
          <BookingSheet
            key={bookingFlight.id}
            flight={bookingFlight}
            onClose={() => setBookingFlight(null)}
            onConfirm={handleConfirm}
          />
        )}
      </AnimatePresence>

      <Toast message={toast} />
    </div>
  )
}

export default App