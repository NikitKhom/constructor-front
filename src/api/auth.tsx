const URL = 'http://localhost:3000/'

export async function checkAuth() {
  const res = await fetch(`${URL}/account`, { credentials: 'include' })
  if (!res.ok) throw new Error('Не авторизован')
  return res.json()
}

export async function login(email: string, password: string) {
  const res = await fetch(`${URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) throw new Error('Ошибка входа')
  return res.json()
}

export async function register(data: { email: string, password: string, username: string, avatar?: string }) {
  const res = await fetch(`${URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error('Ошибка регистрации')
  return res.json()
}
