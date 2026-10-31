import type { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { signToken } from '../config/jwt'
import { User } from '../models/User'
import type { AuthRequest } from '../middleware/auth'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function publicUser(user: { id: string; name: string; email: string }) {
  return { id: user.id, name: user.name, email: user.email }
}

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body ?? {}

    if (typeof name !== 'string' || !name.trim()) {
      res.status(400).json({ message: 'Name is required' })
      return
    }
    if (typeof email !== 'string' || !EMAIL_PATTERN.test(email.trim())) {
      res.status(400).json({ message: 'A valid email is required' })
      return
    }
    if (typeof password !== 'string' || password.length < 8) {
      res.status(400).json({ message: 'Password must be at least 8 characters' })
      return
    }

    const normalizedEmail = email.trim().toLowerCase()

    const existing = await User.findOne({ email: normalizedEmail })
    if (existing) {
      res.status(409).json({ message: 'An account with that email already exists' })
      return
    }

    const passwordHash = await bcrypt.hash(password, 12)
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
    })

    res.status(201).json({ token: signToken(user.id), user: publicUser(user) })
  } catch (err) {
    if ((err as { code?: number }).code === 11000) {
      res.status(409).json({ message: 'An account with that email already exists' })
      return
    }
    res.status(500).json({ message: 'Could not create account' })
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body ?? {}

    if (typeof email !== 'string' || typeof password !== 'string') {
      res.status(400).json({ message: 'Email and password are required' })
      return
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() })

    const passwordMatches = user
      ? await bcrypt.compare(password, user.passwordHash)
      : false

    if (!user || !passwordMatches) {
      res.status(401).json({ message: 'Invalid email or password' })
      return
    }

    res.json({ token: signToken(user.id), user: publicUser(user) })
  } catch {
    res.status(500).json({ message: 'Could not log in' })
  }
}

export async function getMe(req: AuthRequest, res: Response) {
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      res.status(401).json({ message: 'Account not found' })
      return
    }
    res.json(publicUser(user))
  } catch {
    res.status(500).json({ message: 'Could not load account' })
  }
}