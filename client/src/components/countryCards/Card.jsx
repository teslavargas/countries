import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../countryCards/Card.module.css'; 

export default function Card ({ name, id, region, flag, population }) {
    return (
      <Link to={`/countries/${id}`}>
      <div className={styles.flex}>

        <div className={styles.container}>
        <div className={styles.card}>  
            <div className={styles.cardBody}>
                <img src={flag} alt="flag" />
                <h3 className={styles.cardTitle}>{name}</h3>
                <h5>{region}</h5>
                <h5>{population}</h5>
            </div>
        </div>
        </div>
        
      </div>
      
      </Link>
    );
};
