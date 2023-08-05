import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div>
    <div className={styles.container}>
      <div>©2023 EMCEY. All rights reserved.</div>
      <div className={styles.social}>
        <Image src="/../public/mail.png" width={20} height={20} className={styles.icon} alt="mail" />
        <Image src="/../public/twiter.png" width={20} height={20} className={styles.icon} alt="twiter" />
        <Image src="/../public/instagram.png" width={20} height={20} className={styles.icon} alt="instagram" />
        <div className={styles.footer}>Contact Us</div>
      </div>
      
    </div>
    </div>
  );
};

export default Footer;