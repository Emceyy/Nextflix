"use client"

import Link from "next/link";
import React, { useContext, useState, useEffect }from "react";
import styles from "./navbar.module.css";
import { Context } from "@/context/DarkMode";
import DarkMode from "../darkmode/DarkMode";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Menu from "../menu/Menu";
import Search from "../search/Search";
import Genre from "../genre/Genre";
import { usePathname } from 'next/navigation';



const links = [
    {
        id: 1,
        title: "Discussion",
        url: "/discussion",
    },
   
    {
        id: 4,
        title: "Contact",
        url: "/contact",
    },
]

export default function Navbar() {

var pathname = usePathname(); 

const { toggle, mode } = useContext(Context);

const session = useSession();

const [click, setclick] = useState(false);

const toggleClick = () =>{
    setclick(!click)

}

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
   <div className={`${styles.container0} ${scrolled ? (mode == 'light' ? styles.scrollight : styles.scroll) : ""}`}>
    
    <div className={`${pathname == "/" ? styles.container : styles.container2}`}>
        <Link href="/">
            <h1 className={`${pathname == "/" ? styles.nextflix : styles.nextflix2}`}>NEXTFLIX</h1>
        </Link>
        <div className={`${pathname == "/" ? styles.links : styles.links2}`}>

            {links.map(link => (
                <Link key={link.id} href={link.url} className={ styles.link}  shallow>
                    {link.title}
                </Link>
            ))}
            { session.status === "authenticated" && 
            <Link key="5" href="/my-list" className={styles.link} >
                    My List
                </Link>
            }
            <div className={styles.dark}>
            <DarkMode/>
            </div>
        </div>

        <div onClick={toggleClick} className={`${pathname == "/" ? styles.menu : styles.menu2}`}>
        <Menu isClick={click}/>
        </div>

        <div className={styles.secondnav}>
          <div className={styles.search}>
          <Search/>
          </div>
       
       <Genre/>

        {session.status === "authenticated" ? (
            <button  onClick={signOut} className={`${pathname == "/" ? styles.btn : styles.btn2}`}>log out</button>
        ) : (<Link key="3" href="/login">
            <button  className={`${pathname == "/" ? styles.btn : styles.btn2}`}>log in</button>
         </Link>
         )}
        
        </div>
    </div>
    </div>
    
  )
}
