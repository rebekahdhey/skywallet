import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import BoardingPassCard from './components/BoardingPassCard'
import PassSheet from './components/PassSheet'
import SegmentedControl, { type View } from './components/SegmentedControl'
import SearchForm from './components/SearchForm'
import FlightCard from './components/FlightCard'
import { mockPasses } from './data/mockPasses'
import { mockFlights } from './data/mockFlights'
import type { BoardingPass, Flight } from './types/flight'

const OVERLAP = 130

function App() {
  const [selected, setSelected] = useState<BoardingPass | null>(null)
  const [view, setView] = useState<View>('wallet')
  const [results, setResults] = useState<Flight[] | null>(null)
  const reduceMotion = useReducedMotion()

  function handleSearch(from: string, to: string) {
    setResults(
      mockFlights.filter((f) => f.from.code === from && f.to.code === to)
    )
  }

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto flex max-w-sm flex-col gap-6">
        <header>
          <h1 className="text-4xl font-semibold tracking-tight text-label">
            Wallet
          </h1>
          <p className="mt-1 text-label-secondary">Your upcoming flights</p>
          <div className="mt-6">
            <SegmentedControl value={view} onChange={setView} />
          </div>
        </header>

        {view === 'wallet' ? (
          <div className="relative">
            {mockPasses.map((pass, index) => (
              <motion.div
                key={pass.id}
                className="relative"
                style={{
                  marginTop: index === 0 ? 0 : -OVERLAP,
                  zIndex: index,
                }}
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
          <div className="flex flex-col gap-4">
            <SearchForm onSearch={handleSearch} />

            {results && results.length === 0 && (
              <p className="text-center text-label-secondary">
                No flights found for that route.
              </p>
            )}

            {results &&
              results.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
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
    </div>
  )
}

export default App