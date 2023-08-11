"use client"

import {  useContext, useEffect  } from 'react';
import styles from './page.module.css'
import { FavoriteContext } from '@/context/FavoriteContext';
import  Card  from 'src/components/card/Card';
import {  useSession } from "next-auth/react";
import { useRouter } from 'next/router';


export default function Page() {

    const session = useSession();
    const router = useRouter();

    const { state } = useContext(FavoriteContext);
    useEffect(() => {
      if (session.status === 'unauthenticated') {
        router.push('/');
      }
    }, [session, router]);

  return (
    <div>
    <div className={styles.dumb}></div>
      <div className={styles.container}>
    <div className={styles.cardcontainer}>
    {state.favorites.length > 0 ? (
                state.favorites.map((movie) => <Card movie={movie} key={movie.id} />)
                    ) : (
                <p className={styles.listempty}>Your list is empty</p>
            )}
        </div>
    </div>
    </div>
  )
}
