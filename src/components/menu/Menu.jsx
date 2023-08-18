import React from "react";
import styles from "./menu.module.css";
import DarkMode from "../darkmode/DarkMode";
import { useSession } from "next-auth/react";

const Menu = ({ isClick }) => {

  const session = useSession();

  return (
    <div className={isClick ? styles.continer : styles.continer2 }>
    {!isClick && (
      <div className={styles.mn}>
        Menu
      </div>
    )
    }
      
      {isClick ? (
        <div className={styles.menu}>
        <span className={styles.exit}>X</span>
          <ul>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            { session.status === "authenticated" && 
            (<li>
              <a href="/my-list">My List</a>
            </li>)
            }
            <li className={styles.darklink}>
              <DarkMode />
            </li>
          </ul>
         
        </div>
      ) : null}
    </div>
  );
};

export default Menu;