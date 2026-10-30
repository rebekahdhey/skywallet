import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import BoardingPassCard from './components/BoardingPassCard'
import PassSheet from './components/PassSheet'
import SegmentedControl, { type View } from './components/SegmentedControl'
import SearchForm from './components/SearchForm'
import FlightCard from './components/FlightCard'
import BookingSheet from './components/BookingSheet'
import { mockPasses } from './data/mockPasses'
import { mockFlights } from './data/mockFlights'
import type { BoardingPass, Flight } from './types/flight'

function App() {
  const [selected, setSelected] = useState<BoardingPass | null>(null)
  const [view, setView] = useState<View>('wallet')
  const [results, setResults] = useState<Flight[] | null>(null)
  const [bookingFlight, setBookingFlight] = useState<Flight | null>(null)
  const reduceMotion = useReducedMotion()

  function handleSearch(from: string, to: string) {
    setResults(
      mockFlights.filter((f) => f.from.code === from && f.to.code === to)
    )
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
            <SegmentedControl value={view} onChange={setView} />
          </div>
        </header>

        {view === 'wallet' ? (
          <div className="relative md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {mockPasses.map((pass, index) => (
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
        ) : (
          <div className="flex flex-col gap-4 md:grid md:grid-cols-[20rem_1fr] md:items-start md:gap-8">
            <div className="md:sticky md:top-8">
              <SearchForm onSearch={handleSearch} />
            </div>

            <div className="flex flex-col gap-4">
              {results === null && (
                <div className="hidden rounded-2xl border border-dashed border-separator p-10 text-center text-label-secondary md:block">
                  Choose a route to see available flights.
                </div>
              )}

              {results && results.length === 0 && (
                <p className="text-center text-label-secondary">
                  No flights found for that route.
                </p>
              )}

              {results &&
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
            onConfirm={(details) => {
              console.log('Booking details:', details)
              setBookingFlight(null)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App