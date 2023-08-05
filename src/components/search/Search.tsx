import styles from './search.module.css';
import React, { useContext, useState } from 'react';
import { SearchContext } from '../../context/SearchContext';
import Image from 'next/image'

export interface SearchProps {
    className?: string;
}

 const Search = ({ className }: SearchProps) => {
    const [input, setInput] = useState('');
    const { dispatch } = useContext(SearchContext);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: 'ADD_QUERY', payload: input });
        setInput("");
    };
    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <input
                value={input}
                className={styles.inputcls}
                placeholder="Search..."
                onChange={(e) => {
                setInput(e.currentTarget.value);
                }}
            />
            <button className={styles.btncls} type="submit">
            <Image src="/../public/Search.png"  width={30} height={30} alt="icon" />
            </button>
        </form>
    );
};

export default Search;