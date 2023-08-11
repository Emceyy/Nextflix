"use client"

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound()
  }

  return res.json();
}


export async function generateMetadata({ params }) {
  const post = await getData(params.id)
  return {
    title: post.title,
    description: post.desc,
  };
}

const DiscussionPost =  ({ params }) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(params.id);

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
          <div>
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
    </div>
        )
      )
    }
    </div>
  );
    };

export default DiscussionPost;