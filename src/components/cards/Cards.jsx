"use client"

import styles from './cards.module.css';
import { useContext } from 'react';
import { SearchContext } from '@/context/SearchContext';
import  Card  from '../card/Card';
import useSWR from 'swr'; 
import axios from 'axios';
import {  useSession } from "next-auth/react";



async function fetcher(url) {
    const response = await axios.get(url);
    return response.data.results;
  }

 
  const fetcher2 = url => fetch(url).then(res => res.json())

const Cards = () => {

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    const { data: session } = useSession();

    const useremail = session?.user?.email;

    const { state } = useContext(SearchContext);

    const { sortBy, genre, query } = state;

    const { data:dataid, error:errorid } = useSWR( useremail ?` http://localhost:3000/api/my_list?useremail=${useremail}` : null, fetcher2 );
    

    const { data, error } = useSWR(
      query !== ''
        ? `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`
        : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&sort_by=${sortBy}`,
      fetcher
    );
  
    
    if (error) return <div className={styles.notfound}>failed to load</div>;
    if (!data) return <div className={styles.notfound}>loading...</div>;
    return (
      <div className={styles.container}>
        {data.length > 0 ? (
          data.map((movie) => <Card movie={movie} isInList={dataid?.includes(movie.id.toString())}
          key={movie.id} />)
        ) : (
          <p className={styles.notfound}>Your search was not found please try again</p>
        )}
      </div>
    );
  };
  
  export default Cards;
  