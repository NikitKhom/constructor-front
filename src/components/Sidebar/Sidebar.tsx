import styles from './Sidebar.module.css'
import IconLink from '../IconLink/IconLink'
import { FaPaintRoller } from "react-icons/fa"
import { FaClipboardList } from "react-icons/fa"
import { MdAccountCircle } from "react-icons/md"
import { MdOutlineStorage } from "react-icons/md"
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Link to='/welcome' className={styles.title}>FormBuilder</Link>
      <nav>
        <ul className={styles.list}>
          <li><IconLink to='/account' icon={<MdAccountCircle size={18}/>} label={'Аккаунт'} /></li>
          <li><IconLink to={'/styles'} icon={<FaPaintRoller size={18}/>} label={'Стили'} /></li>
          <li><IconLink to={'/structure'} icon={<FaClipboardList size={18}/>} label={'Формы'} /></li>
          <li><IconLink to={'/storage'} icon={<MdOutlineStorage size={18}/>} label={'Архив'} /></li>
        </ul>
      </nav>
    </aside>
  )
}