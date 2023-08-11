"use client"
import styles from './cards.module.css';
import { useState, useEffect, useContext } from 'react';
import { SearchContext } from '@/context/SearchContext';
import  Card  from '../card/Card';


export interface Movie {
    id: number;
    poster_path?: string;
    title: string;
    overview: string;
    vote_average: number;
    release_date: string;
}

 const Cards = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    const { state } = useContext(SearchContext);

    const { sortBy, genre, query } = state;

    useEffect(() => {
        fetch(
            query !== ''
                ? `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=18af1119f90c6b874c003319ddfac4d5`
                : `https://api.themoviedb.org/3/discover/movie?api_key=18af1119f90c6b874c003319ddfac4d5&with_genres=${genre}&sort_by=${sortBy}`
        )
            .then((response) => response.json())
            .then((data) => setMovies(data.results))
            .catch((err) => console.log(err));
    }, [genre, sortBy, query]);
    return (
        <div className={styles.container}>
               {movies.length > 0 ? (
                movies.map((movie) => <Card movie={movie} key={movie.id} />)
                    ) : (
                <p className={styles.notfound}>Your search was not found please try again</p>
            )}
        </div>
    );
};

export default Cards;