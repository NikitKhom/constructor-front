import { useState, useEffect } from 'react'
import styles from './AccountPage.module.css'

export default function AccountPage() {
  const [form, setForm] = useState({
    email: '',
    username: '',
    avatar: '',
    password: ''
  })

  const [initialForm, setInitialForm] = useState(form)

  useEffect(() => {
    const fakeUser = {
      email: 'dev@example.com',
      username: 'devuser',
      avatar: 'https://i.pravatar.cc/100'
    }
    setForm({ ...fakeUser, password: '' })
    setInitialForm({ ...fakeUser, password: '' })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const hasChanges = JSON.stringify(form) !== JSON.stringify(initialForm)

  return (
    <div className={styles.wrapper}>
      <h2>Аккаунт</h2>
      <form className={styles.form}>
        <label>
          Email:
          <input name="email" value={form.email} onChange={handleChange} />
        </label>
        <label>
          Username:
          <input name="username" value={form.username} onChange={handleChange} />
        </label>
        <label>
          Avatar URL:
          <input name="avatar" value={form.avatar} onChange={handleChange} />
        </label>
        <label>
          Новый пароль:
          <input name="password" value={form.password} onChange={handleChange} type="password" />
        </label>
        {hasChanges && <button type="submit">Сохранить</button>}
      </form>
    </div>
  )
}
