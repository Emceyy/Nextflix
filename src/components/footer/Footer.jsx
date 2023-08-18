"use client"

import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
    <div className={styles.container}>
      <div className={styles.text}>©2023 EMCEY. All rights reserved.</div>
      <div className={styles.social}>
        <Image src="/../public/mail.png" width={20} height={20} className={styles.icon} alt="mail"  />
        <Image src="/../public/twiter.png" width={20} height={20} className={styles.icon} alt="twiter"  />
        <Image src="/../public/instagram.png" width={20} height={20} className={styles.icon} alt="instagram"  />
        <Link key="4" href="/contact" className={styles.footer}> Contact Us </Link>
      </div>
      
    </div>
    </div>
  );
};

export default Footer;