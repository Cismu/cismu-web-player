import styles from './styles.module.css'

export default function Sidebar() {
  return (
    <div className={styles['sidebar']}>
      <ul>
        <li>
          <div className={styles['sidebar-item']}>
            Musica
          </div>
        </li>
        <li>
          <div className={styles['sidebar-item']}>
            Explorar
          </div>
        </li>
        <li>
          <div className={styles['sidebar-item']}>
            Favoritos
          </div>
        </li>
      </ul>
    </div>
  )
}
