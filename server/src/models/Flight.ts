import { Schema, model } from 'mongoose'

export const airportSchema = new Schema(
  {
    code: { type: String, required: true },
    city: { type: String, required: true },
  },
  { _id: false }
)

const flightSchema = new Schema(
  {
    airline: { type: String, required: true },
    flightNumber: { type: String, required: true },
    from: { type: airportSchema, required: true },
    to: { type: airportSchema, required: true },
    departure: { type: String, required: true },
    arrival: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { toJSON: { virtuals: true, versionKey: false } }
)

export const Flight = model('Flight', flightSchema)
