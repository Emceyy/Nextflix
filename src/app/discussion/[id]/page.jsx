"use client"

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import useSWR from 'swr';
import { Helmet } from "react-helmet";
import { motion } from "framer-motion"


const DiscussionPost =  ({ params }) => {


const { data, error } = useSWR(`http://localhost:3000/api/posts/${params.id}`, async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}, {
    revalidateIfStale: false, 
    revalidateOnFocus: false, 
    revalidateOnReconnect: false
});




if (error) return <div className={styles.loading}>Failed to load</div>;
  if (!data) return <div className={styles.loading}>Loading...</div>
  
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
     className={styles.Container}>
     <Helmet>
     <title>{data.title}</title>
      <meta name="description" content={data.desc} />
      <meta name="author" content={data.username} />
      <meta name="date" content=  "2023"/>
     </Helmet>
      <div className={styles.dumb}></div>  
    <div className={styles.dumb}></div>
    <div className={styles.Container}>
      <div className={styles.top}>
      <div className={styles.imageContainer}>
          <Image
            src={data.img}
            alt=""
            fill={true}
            className={styles.image}
          />
        </div>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>
            {data.desc}
          </p>
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
         {data.content}
        </p>
      </div>
      <div className={styles.author}>
            <Image
              src={data.userimg}
              alt=""
              width={100}
              height={100}
              className={styles.avatar}
            />
            <span className={styles.username}>{data.username}</span>
            <Image src="/../public/mail.png" width={20} height={20} className={styles.icon} alt="mail" />
            <Image src="/../public/twiter.png" width={20} height={20} className={styles.icon} alt="twiter" />
            <Image src="/../public/instagram.png" width={20} height={20} className={styles.icon} alt="instagram" />
          </div>
    </div>
    </motion.div>
  );
    };

export default DiscussionPost;