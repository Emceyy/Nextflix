"use client"

import styles from './card.module.css';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from "next-auth/react";


const Card = ({ movie, isInList, removeMovie }) => {
  
  const { data: session, status } = useSession();

  const useremail = session?.user?.email;
  
  const movieId = movie.id.toString();
  
  const [isAdded, setIsAdded] = useState(isInList);

  useEffect(() => {
    if (status === "authenticated") { 
      const storedValue = localStorage.getItem(movieId); 
      
      setIsAdded(storedValue ? JSON.parse(storedValue) : isInList); 
    } else {
      localStorage.clear(); 
      setIsAdded(false); 
    }
      
  }, [status, isInList,movieId]); 
  
  

  const handleToggle = async () => {
    
    if (status === "authenticated") { 
  

      if (isAdded) {
        const response = await fetch(`http://localhost:3000/api/my_list`, { 
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ useremail, movieId }) 
        });
        if (response.status === 200) {
          if (removeMovie) {
            removeMovie(Number(movieId));
          }
          setIsAdded(false);
          localStorage.setItem(movieId, JSON.stringify(false));
        }
      } else {
        const response = await fetch(`http://localhost:3000/api/my_list`, { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ useremail, movieId })
        });
        if (response.status === 200) {
          setIsAdded(true);
          localStorage.setItem(movieId, JSON.stringify(true));
        }
      }
    } else {
    
      alert("You need to log in to add or remove movies from your list.");
    }
    
  };
  
  return (
    <div className={`${styles.container} ${isAdded ? styles.add : ""}`}>
      <Image
        className={styles.cardi}
        src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt="card image"
        width={200}
        height={300}
      />
      <div className={styles.detail}>
        <div className={styles.top}>
          <h1 className={styles.title}>{movie.title.substring(0, 26)}</h1>
        </div>
        <div className={styles.bottom}>
          <span className={styles.rating}>IMDB: {movie.vote_average.toFixed(1)}</span>
          <p className={styles.desc}>
            {movie.overview?.substring(0, 120)}...
          </p>
          <button className={styles.addButton} onClick={handleToggle}>
            {isAdded ? "✓" : "+"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;


