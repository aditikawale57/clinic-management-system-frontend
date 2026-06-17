import { apiClient } from '@/api/client'
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from '@/types'

export function login(payload: LoginPayload): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>('/auth/login', payload, { auth: false })
}

export function register(payload: RegisterPayload): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>('/auth/register', payload, {
    auth: false,
  })
}

export function getCurrentUser(): Promise<User> {
  return apiClient.get<User>('/auth/me')
}
