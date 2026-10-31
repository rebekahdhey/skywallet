import type { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { BoardingPass } from '../models/BoardingPass'
import { Flight } from '../models/Flight'

const COLORS = ['#0a84ff', '#3a3a3c', '#008299', '#8944ab', '#248a3d', '#c93400']

export async function getPasses(req: Request, res: Response) {
  try {
    const passes = await BoardingPass.find().sort({ createdAt: 1 })
    res.json(passes)
  } catch {
    res.status(500).json({ message: 'Could not load passes' })
  }
}

export async function createPass(req: Request, res: Response) {
  try {
    const { flightId, passenger } = req.body ?? {}

    if (!flightId || !isValidObjectId(flightId)) {
      res.status(400).json({ message: 'Invalid flight ID' })
      return
    }

    if (typeof passenger !== 'string' || !passenger.trim()) {
      res.status(400).json({ message: 'Passenger name is required' })
    }

    const flight = await Flight.findById(flightId)
    if (!flight) {
      res.status(404).json({ message: 'Flight not found' })
      return
    }

    const count = await BoardingPass.countDocuments()

    const pass = await BoardingPass.create({
      airline: flight.airline,
      flightNumber: flight.flightNumber,
      from: flight.from,
      to: flight.to,
      departure: flight.departure,
      gate: 'TBA',
      seat: 'TBA',
      terminal: 'TBA',
      passenger: passenger.trim(),
      color: COLORS[count % COLORS.length],
    })

    res.status(201).json(pass)
  } catch {
    res.status(500).json({ message: 'Could not create pass' })
  }
}