import { Schema, model } from 'mongoose'
import { airportSchema } from './Flight'

const passSchema = new Schema(
  {
    airline: { type: String, required: true },
    flightNumber: { type: String, required: true },
    from: { type: airportSchema, required: true },
    to: { type: airportSchema, required: true },
    departure: { type: String, required: true },
    gate: { type: String, required: true },
    terminal: { type: String, required: true },
    passenger: { type: String, required: true },
    seat: { type: String, required: true },
    color: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true, versionKey: false } }
)

export const BoardingPass = model('BoardingPass', passSchema)