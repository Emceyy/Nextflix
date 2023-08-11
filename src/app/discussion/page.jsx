"use client"

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";


async function getData() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Discussion = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();

        setData(data);

        setLoading(false);
      } catch (error) {
        console.error(error);

        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div
     className={styles.Container}>
      <div className={styles.dumb}></div>
      {loading ? (
        <div className={styles.loading}>
          Loading...
        </div>
      ) : (
        data && (
          <div
           >
          {data.map((item) => (
        <div
         key={item.id} className={styles.item}>
        <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        <Link href={`/discussion/${item._id}`} className={styles.imgcontainer} key={item.id}>
          <div className={styles.imgContainer}>
            <Image
              src={item.img}
              alt=""
              fill={true}
              className={styles.image}
            />
          </div>
        </Link>
        </div>
      ))}
          </div>
        )
      )}
    </div>
  );
};

export default Discussion;
