const URL = 'http://localhost:3000'

export async function checkAuth(): Promise<boolean> {
  try {
    const res = await fetch(`${URL}/users/me`, { credentials: 'include' })
    return res.ok;
  } catch (error) {
    console.error('Ошибка при проверке авторизации:', error);
    return false;
  }
  
}

export async function login(email: string, password: string) {
  try {
    const res = await fetch(`${URL}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
    return res.ok;
  } catch (error) {
    console.error('Ошибка входа:', error);
    return false;
  }
}

export async function register(data: { email: string, password: string, name: string }) {
  try {
    const res = await fetch(`${URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    })
    if (res.ok) {
      const user = await res.json();
      return user;
    }
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    return false;
  }
}

export async function logout() {
  await fetch(`${URL}/logout`, {
    method: 'POST',
    credentials: 'include'
  })
}

