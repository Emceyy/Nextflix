import React, { useContext } from 'react';
import styles from './genre.module.css';
import { Context } from '@/context/DarkMode';
import { SearchContext } from '../../context/SearchContext';
import Select from 'react-select';



export default function Genre() {

  const { dispatch} = useContext(SearchContext);

  const { mode } = useContext(Context); 

  
  const handleChange = (option) => {
    if (option) {
      dispatch({ type: 'ADD_GENRE', payload: option.value });
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: 14,
      color:"black",
      cursor: "pointer",
    }),
  };
  

  return (
    <div className={styles.container}>
      <Select
        id="select"
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
