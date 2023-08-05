"use client"

import Link from "next/link";
import React, { useContext, useState, useEffect  }from "react";
import styles from "./navbar.module.css";
import { Context } from "@/context/DarkMode";
import DarkMode from "../darkmode/DarkMode";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Menu from "../menu/Menu";
import Search from "../search/Search";
import Genre from "../genre/Genre";

const links = [
    {
        id: 1,
        title: "Blog",
        url: "/blog",
    },
   
    {
        id: 4,
        title: "Contact",
        url: "/contact",
    },
]

export default function Navbar() {

const { toggle, mode } = useContext(Context);

const session = useSession();

const [click, setclick] = useState(false);

const toggleClick = () =>{
    setclick(!click)

}

const handleClick = () => {
    window.location.reload();
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
   
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);


    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
   <div className={`${styles.container0} ${scrolled ? (mode == 'light' ? styles.scrollight : styles.scroll) : ''}`}>
    <div className={styles.container}>
        <Link href="/">
            <h1 className={styles.nextflix} onClick={handleClick}>NEXTFLIX</h1>
        </Link>
        <div className={styles.links}>

            {links.map(link => (
                <Link key={link.id} href={link.url} className={styles.link}>
                    {link.title}
                </Link>
            ))}
            { session.status === "unauthenticated" && 
            <Link key="5" href="/my-list" className={styles.link}>
                    My List
                </Link>
            }
            <div className={styles.dark}>
            <DarkMode/>
            </div>
        </div>

        <div onClick={toggleClick} className={styles.menu}>
        <Menu isClick={click}/>
        </div>

        <div className={styles.secondnav}>
          <div className={styles.search}>
          <Search/>
          </div>
       
       <Genre/>

        {session.status === "authenticated" ? (
            <button  onClick={signOut} className={styles.btn}>log out</button>
        ) : (<Link key="3" href="/login">
            <button  className={styles.btn}>log in</button>
         </Link>
         )}
        
        </div>
    </div>
    </div>
    
  )
}
