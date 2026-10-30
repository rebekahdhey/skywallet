import { useState } from "react";
import { airports } from "../data/airports";

interface SearchProps {
  onSearch: (from: string, to: string) => void
}

function SearchForm({ onSearch }: SearchProps) {
  const [from, setFrom] = useState('MNL')
  const [to, setTo] = useState('SIN')


  return (
    <div className="rounded-2xl bg-surface p-5 ring-1 ring-separator">
      <label
        htmlFor="from"
        className="text-xs uppercase tracking-wide text-label-secondary"
      >
        From
      </label>
      <select
        id="from"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="mt-1 w-full rounded-xl bg-background px-4 py-3 text-label"
      >
        {airports.map((a) => (
          <option key={a.code} value={a.code}>
            {a.city} ({a.code})
          </option>
        ))}
      </select>

      <div className="mt-4">
        <label
          htmlFor="to"
          className="text-xs uppercase tracking-wide text-label-secondary"
        >
          To
        </label>
        <select
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="mt-1 w-full rounded-xl bg-background px-4 py-3 text-label"
        >
          {airports.map((a) => (
            <option key={a.code} value={a.code}>
              {a.city} ({a.code})
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => onSearch(from, to)}
        disabled={from === to}
        className="mt-5 w-full rounded-full bg-accent py-3 font-medium text-white transition-opacity disabled:opacity-40"
      >
        Search Flights
      </button>
    </div>
  )
}

export default SearchForm