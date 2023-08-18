"use client"

import {  useCallback ,useEffect, useState  } from 'react';
import styles from './page.module.css'
import  Card  from 'src/components/card/Card';
import {  useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion"
import useSWR from 'swr';
import { Helmet } from "react-helmet";



export default function Page() {

  const { data: session, status } = useSession();

  const useremail = session?.user?.email;

  const router = useRouter();

  const [movies, setMovies] = useState([]); 

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    
  const fetcher = url => fetch(url).then(res => res.json())
  
        
  
  const { data:owndata, error } = useSWR( useremail ?` http://localhost:3000/api/my_list?useremail=${useremail}` : null, fetcher );


  const removeMovie = (movieId) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
  };

  

  const fetchMovies = useCallback(() => {
    if (owndata) { 
      Promise.all(owndata.map(movieId => 
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`) 
        .then(res => res.json()) 
      ))
      .then(moviesData => setMovies(moviesData)) 
      .catch(error => console.error(error)) 
    }
  }, [owndata, apiKey]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }else{
      fetchMovies();
    }
  }, [status, router, fetchMovies]);
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
    <Helmet>
      <title>My List</title>
    </Helmet>
      <div className={styles.dumb}></div>
      <div className={styles.container}>
        <div className={styles.cardcontainer}>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <Card movie={movie} isInList={true} key={movie.id} removeMovie={removeMovie} />
            ))
          ) : (
            <p className={`${styles.listempty} ${movies.length === 0 ? styles.show : ''}`}>
                    Your list is empty
              </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

  
