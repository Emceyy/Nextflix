"use client"

import React, { useContext } from 'react';
import styles from './genre.module.css';
import { SearchContext } from '../../context/SearchContext';
import { usePathname } from 'next/navigation';
import Select from "react-select"; 


export default function Genre() {

  var pathname = usePathname(); 
  

  
  const { dispatch} = useContext(SearchContext);

  
  const handleChange = (option) => {
    if (option) {
      dispatch({ type: 'ADD_GENRE', payload: option.value });
    }
  };

  const customStyles = {
    option: (provided) => ({
      ...provided,
      fontSize: 14,
      color:"black",
      cursor: "pointer",
    }),
  };
  

  return (
    <div className={` ${pathname == "/" ? styles.container : styles.container2}`}>
      <Select
        id="react-select-3-live-region"
        onChange={handleChange}
        options={[
          { label: "Action", value: "28" },
          { label: "Adventure", value: "12" },
          { label: "Comedy", value: "35" },
          { label: "Drama", value: "18" },
          { label: "Horror", value: "27" },
          { label: "Romance", value: "10749" },
          { label: "Thriller", value: "53" },
          { label: "Animation", value: "16" },
        ]}
        styles={customStyles}
      />
    </div>
  );
}
