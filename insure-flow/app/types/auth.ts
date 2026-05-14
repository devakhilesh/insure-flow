export interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

export interface RegisterForm {
  fullName: string
  email: string
  mobile: string
  password: string
  confirmPassword: string
}

export interface User {
  id: number
  username: string
  email: string
  accessToken: string
  refreshToken: string
}