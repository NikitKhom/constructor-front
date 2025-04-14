import { Link } from 'react-router-dom'
import styles from './Avatar.module.css'
import avatar from './../../assets/images/DefaultAvatar.png'

interface AvatarProps {
  source?: string
}

export default function Avatar({ source  }: AvatarProps) {
  return (
    <Link to='/account' className={styles.avatar}>
      <img className={styles.image} src={source || avatar} alt='Пользовательский аватар'/>
    </Link>
  )
}