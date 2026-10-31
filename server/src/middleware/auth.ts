import type { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../config/jwt'

export interface AuthRequest extends Request {
  userId?: string
}

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization

  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Please log in' })
    return
  }

  const token = header.slice('Bearer '.length)

  try {
    req.userId = verifyToken(token)

    next()
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' })
    return
  }
}