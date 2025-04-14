import Sidebar from '../../components/Sidebar/Sidebar'
import Header from '../../components/Header/Header'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.css'

export default function MainLayout() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.mainArea}>
        <Header />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
