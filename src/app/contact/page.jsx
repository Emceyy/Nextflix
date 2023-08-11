"use client"

import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { motion } from "framer-motion"


export const metadata = {
  title: "Netflix Contact Information",
  description: "Netflix contact page",
};

const Contact = () => {

    
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
     className={styles.container}>
    <div className={styles.dumb}></div>
      <h1 className={styles.title}>Connect with Us</h1>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
         <Image
            src="/Contactpng.png"
            alt=""
            fill={true}
            className={styles.image}
          />
        </div>
        <form className={styles.form}>
          <input type="text" placeholder="name" className={styles.name} />
          <input type="text" placeholder="email" className={styles.email} />
          <textarea
            className={styles.textArea}
            placeholder="message"
            cols="30"
            rows="10"
          ></textarea>
        </form>
      </div>
    </motion.div>
  );
};

export default Contact;