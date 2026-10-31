import type { Request, Response } from 'express'
import { Flight } from '../models/Flight'

export async function getFlights(req: Request, res: Response) {
  try {
    const { from, to } = req.query
    const filter: Record<string, string> = {}

    if (typeof from === 'string') filter['from.code'] = from
    if (typeof to === 'string') filter['to.code'] = to

    const flights = await Flight.find(filter).sort({ departure: 1 })
    res.json(flights)
  } catch {
    res.status(500).json({ message: 'Could not load flights' })
  }
}
