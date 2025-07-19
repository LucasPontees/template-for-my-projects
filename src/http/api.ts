// lib/api.ts
import ky from 'ky'

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // para cookies HttpOnly
})
