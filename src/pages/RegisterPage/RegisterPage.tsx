import AuthPageTemplate from '../../components/AuthPageTemplate/AuthPageTemplate'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
  })

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (res.ok) {
      navigate('/account')
    } else {
      const data = await res.json()
      alert(data.message || 'Ошибка регистрации')
    }
  }

  return (
    <AuthPageTemplate
      title="Регистрация"
      subtitle="Создайте аккаунт"
      footer={<p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>}
    >
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="name"
        type="text"
        placeholder="Имя пользователя"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Пароль"
        value={form.password}
        onChange={handleChange}
      />
      <button onClick={handleSubmit} type="submit">
        Зарегистрироваться
      </button>
    </AuthPageTemplate>
  )
}
