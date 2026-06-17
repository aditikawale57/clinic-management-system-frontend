// Shared domain types for the application.

export type ID = string

export interface User {
  id: ID
  name: string
  email: string
  createdAt?: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}
