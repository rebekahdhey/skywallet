import jwt from 'jsonwebtoken'

function getSecret(): string {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET is missing from .env')
  return secret
}

export function signToken(userId: string): string {
  return jwt.sign({ sub: userId }, getSecret(), { expiresIn: '7d' })
}

export function verifyToken(token: string): string {
  const payload = jwt.verify(token, getSecret())
  if (typeof payload === 'string' || !payload.sub) {
    throw new Error('Invalid token')
  }
  return payload.sub
}