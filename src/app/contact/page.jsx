"use client"

import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { motion } from "framer-motion"
import { Helmet } from "react-helmet";

export const metadata = {
  title: "Netflix Contact Information",
  description: "Netflix contact page",
};

const handleSubmit = (e) => {
  e.preventDefault();
  e.target[0].value = "";
  e.target[1].value = "";
  e.target[2].value = "";
}

const Contact = () => {

    
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
     className={styles.container}>
     <Helmet>
        <title>Contact Page</title>
     </Helmet>
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
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="text" placeholder="name" className={styles.name} />
          <input type="text" placeholder="email" className={styles.email} />
          <textarea
            className={styles.textArea}
            placeholder="message"
            cols="30"
            rows="10"
          ></textarea>
          <button className={styles.btn}>Send</button>
        </form>
      </div>
    </motion.div>
  );
};

export default Contact;