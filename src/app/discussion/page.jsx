"use client"

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import useSWR from 'swr';
import { Helmet } from "react-helmet";
import { motion } from "framer-motion"



const Discussion = () => {
  const { data, error } = useSWR('http://localhost:3000/api/posts', async (url) => {
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
  
  
    if (error) return <div>Failed to load</div>;
    if (!data) return <div className={styles.loading}>Loading...</div>

    return (
      <motion.div
       initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
       className={styles.Container}>
      <Helmet>
        <title>Discussion</title>
      </Helmet>
        <div className={styles.dumb}></div>
        {data.map((item, index) => (
          <div key={item.id || index} className={styles.item}>
            <div className={styles.content}>
              <h1 className={styles.title}>{item.title}</h1>
              <p className={styles.desc}>{item.desc}</p>
            </div>
            <a  key={item.id || index} href={`/discussion/${item._id}`} className={styles.imgcontainer}>
              <div className={styles.imgContainer}>
                <Image src={item.img} alt="" fill={true} className={styles.image} />
              </div>
            </a>
          </div>
        ))}
      </motion.div>
    );    
};

export default Discussion;
