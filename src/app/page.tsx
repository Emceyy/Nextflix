"use client"

import Image from 'next/image'
import styles from './page.module.css'
import Cards from '../components/cards/Cards'
import { motion } from "framer-motion"

export default function Home() {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className={styles.container}>
      <div className={styles.posterContainer}>
      <Image src="/../public/movie.jpg" fill={true} className={styles.poster} alt="poster" />
      </div>
      <div className={styles.cardcontainer}>
        <Cards/>
      </div>
    </motion.div>
  )
}
