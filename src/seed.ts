import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from './config/db'
import { Flight } from './models/Flight'
import { BoardingPass } from './models/BoardingPass'

const passes = [
  {
    id: '1',
    airline: 'Skyline Air',
    flightNumber: 'SK 482',
    from: { code: 'MNL', city: 'Manila' },
    to: { code: 'SIN', city: 'Singapore' },
    departure: '2026-11-14T08:30:00',
    gate: 'B12',
    seat: '14A',
    terminal: '3',
    passenger: 'Rebekah Dhey',
    color: '#0a84ff',
  },
  {
    id: '2',
    airline: 'Pacific Airways',
    flightNumber: 'PA 215',
    from: { code: 'MNL', city: 'Manila' },
    to: { code: 'NRT', city: 'Tokyo' },
    departure: '2026-11-15T10:45:00',
    gate: 'A08',
    seat: '22C',
    terminal: '3',
    passenger: 'Alexandra Reyes',
    color: '#30b0c7',
  },
  {
    id: '3',
    airline: 'Emirates',
    flightNumber: 'EK 337',
    from: { code: 'MNL', city: 'Manila' },
    to: { code: 'DXB', city: 'Dubai' },
    departure: '2026-11-16T18:20:00',
    gate: 'D05',
    seat: '8F',
    terminal: '1',
    passenger: 'Daniel Santos',
    color: '#ff453a',
  },
  {
    id: '4',
    airline: 'Cebu Pacific',
    flightNumber: '5J 803',
    from: { code: 'MNL', city: 'Manila' },
    to: { code: 'CEB', city: 'Cebu' },
    departure: '2026-11-17T06:15:00',
    gate: 'C14',
    seat: '19B',
    terminal: '3',
    passenger: 'Sophia Garcia',
    color: '#ffd60a',
  },
  {
    id: '5',
    airline: 'Qatar Airways',
    flightNumber: 'QR 929',
    from: { code: 'MNL', city: 'Manila' },
    to: { code: 'DOH', city: 'Doha' },
    departure: '2026-11-18T23:50:00',
    gate: 'E09',
    seat: '5A',
    terminal: '1',
    passenger: 'Michael Cruz',
    color: '#bf5af2',
  },
  {
    id: '6',
    airline: 'Singapore Airlines',
    flightNumber: 'SQ 917',
    from: { code: 'SIN', city: 'Singapore' },
    to: { code: 'HKG', city: 'Hong Kong' },
    departure: '2026-11-19T13:40:00',
    gate: 'F22',
    seat: '11D',
    terminal: '2',
    passenger: 'Isabella Tan',
    color: '#32d74b',
  },
  {
    id: '7',
    airline: 'Korean Air',
    flightNumber: 'KE 624',
    from: { code: 'MNL', city: 'Manila' },
    to: { code: 'ICN', city: 'Seoul' },
    departure: '2026-11-20T12:10:00',
    gate: 'G07',
    seat: '16K',
    terminal: '1',
    passenger: 'Ethan Lim',
    color: '#5e5ce6',
  },
  {
    id: '8',
    airline: 'Japan Airlines',
    flightNumber: 'JL 746',
    from: { code: 'MNL', city: 'Manila' },
    to: { code: 'HND', city: 'Tokyo' },
    departure: '2026-11-21T09:25:00',
    gate: 'B18',
    seat: '3A',
    terminal: '3',
    passenger: 'Olivia Martinez',
    color: '#ff9f0a',
  },
  {
    id: '9',
    airline: 'Cathay Pacific',
    flightNumber: 'CX 912',
    from: { code: 'HKG', city: 'Hong Kong' },
    to: { code: 'BKK', city: 'Bangkok' },
    departure: '2026-11-22T15:55:00',
    gate: 'A21',
    seat: '20F',
    terminal: '1',
    passenger: 'Noah Williams',
    color: '#ff375f',
  },
  {
    id: '10',
    airline: 'AirAsia',
    flightNumber: 'AK 583',
    from: { code: 'MNL', city: 'Manila' },
    to: { code: 'KUL', city: 'Kuala Lumpur' },
    departure: '2026-11-23T07:00:00',
    gate: 'C06',
    seat: '25D',
    terminal: '3',
    passenger: 'Ava Thompson',
    color: '#ff453a',
  },
  {
    id: '11',
    airline: 'Turkish Airlines',
    flightNumber: 'TK 85',
    from: { code: 'MNL', city: 'Manila' },
    to: { code: 'IST', city: 'Istanbul' },
    departure: '2026-11-24T21:30:00',
    gate: 'D16',
    seat: '7C',
    terminal: '1',
    passenger: 'Liam Anderson',
    color: '#ff6961',
  },
]

const flights = [
  {
    airline: 'Skyline Air',
    flightNumber: 'SK 482',
    from: { code: 'MNL', city: 'Manila' },
    to: { code: 'SIN', city: 'Singapore' },
    departure: '2026-11-14T08:30:00',
    arrival: '2026-11-14T12:05:00',
    price: 189,
  },
  {
    airline: 'Nimbus',
    flightNumber: 'NB 210',
    from: { code: 'MNL', city: 'Manila' },
    to: { code: 'SIN', city: 'Singapore' },
    departure: '2026-11-14T14:10:00',
    arrival: '2026-11-14T17:50:00',
    price: 164,
  },
  {
    airline: 'Skyline Air',
    flightNumber: 'SK 115',
    from: { code: 'MNL', city: 'Manila' },
    to: { code: 'CEB', city: 'Cebu' },
    departure: '2026-11-15T07:00:00',
    arrival: '2026-11-15T08:15:00',
    price: 72,
  },
  // later: add the rest of your mock flights here, without ids
]

async function seed() {
  await connectDB()
  await Flight.deleteMany({})
  await Flight.insertMany(flights)

  await BoardingPass.deleteMany({})
  await BoardingPass.insertMany(passes)

  console.log(`Seeded ${flights.length} flights and ${passes.length} boarding passes`)

  await mongoose.disconnect()
}

seed()
