import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { connectDB } from './config/db'
import flightRoutes from './routes/flightRoutes'
import passRoutes from './routes/passRoutes'
import authRoutes from './routes/authRoutes' // new

const app = express()
const PORT = process.env.PORT || 4000

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is missing from .env') // new
}

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/auth', authRoutes) // new
app.use('/api/flights', flightRoutes)
app.use('/api/passes', passRoutes)

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'skywallet-api',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})

async function start() {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`)
  })
}

start()