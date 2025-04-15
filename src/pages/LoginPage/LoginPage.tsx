import AuthPageTemplate from './../../components/AuthPageTemplate/AuthPageTemplate'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('http://localhost:3000/signin', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (res.ok) {
      alert('Успешный вход!')
      // redirect?
    } else {
      const data = await res.json()
      alert(data.message || 'Ошибка авторизации')
    }
  }

  return (
    <AuthPageTemplate
      title="Вход"
      subtitle="Введите почту и пароль"
      footer={<p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>}
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit} type="submit">
        Войти
      </button>
    </AuthPageTemplate>
  )
}
