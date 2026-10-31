import type { BoardingPass, Flight } from '../types/flight'

export const API_URL = import.meta.env.VITE_API_URL

export async function searchFlights(from: string, to: string): Promise<Flight[]> {
  const res = await fetch(`${API_URL}/api/flights?from=${from}&to=${to}`)

  if (!res.ok) {
    throw new Error('Failed to fetch flights')
  }

  return res.json()
}

export async function getPasses(): Promise<BoardingPass[]> {
  const res = await fetch(`${API_URL}/api/passes`)
  if (!res.ok) throw new Error('Could not load passes')
  return res.json()
}

export async function createPass(
  flightId: string,
  passenger: string
): Promise<BoardingPass> {
  const res = await fetch(`${API_URL}/api/passes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ flightId, passenger }),
  })
  if (!res.ok) throw new Error('Could not create pass')
  return res.json()
}