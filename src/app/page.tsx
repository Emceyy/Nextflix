import Image from 'next/image'
import styles from './page.module.css'
import Cards from '../components/cards/Cards'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.posterContainer}>
      <Image src="/../public/movie.jpg" fill={true} className={styles.poster} alt="poster" />
      </div>
      <div className={styles.cardcontainer}>
        <Cards/>
      </div>
    </div>
  )
}
