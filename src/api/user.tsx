const API_URL = 'http://localhost:3000';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export async function getUser(): Promise<User | null> {
  try {
    const res = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      return await res.json() as User;
    }
    return null;
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error);
    return null;
  }
}

interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
}

interface UpdateUserResponse {
  name: string;
  email: string;
  avatar: string;
}

export async function updateUser(data: UpdateUserData): Promise<UpdateUserResponse | null> {
  try {
    const res = await fetch(`${API_URL}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      return await res.json() as UpdateUserResponse;
    }
    return null;
  } catch (error) {
    console.error('Ошибка при обновлении данных пользователя:', error);
    return null;
  }
}