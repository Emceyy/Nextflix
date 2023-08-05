"use client"

import styles from './card.module.css';
import { useContext } from 'react';
import { FavoriteContext } from '../../context/FavoriteContext';
import Image from 'next/image';
import { signOut, useSession } from "next-auth/react";

export interface CardProps {
    movie: {
        id: number;
        poster_path?: string;
        title: string;
        overview: string;
        vote_average: number;
        release_date: string;
    };
}


 const Card = ({ movie }: CardProps) => {

    const { dispatch } = useContext(FavoriteContext);

    const session = useSession();

    return (
        <div className={styles.container}>
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
                    <p className={styles.desc}>{movie.overview?.substring(0, 120)}
                    ...
                    </p>

                    { session.status === "unauthenticated" && 
                        (<button
                            className={styles.addButton}
                            onClick={() => dispatch({ type: 'ADD_MOVIE', payload: movie })}
                        >
                            ✓
                        </button>)
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default Card;


