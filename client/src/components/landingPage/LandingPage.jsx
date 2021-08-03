import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getCountries } from '../../store/actions/countryActions';

import styles from '../landingPage/LandingPage.module.css'; 

export function LandingPage({getCountries}){

    useEffect(() => {
        getCountries();
    }, []);


    return (

        <>
           <div className={styles.conteiner}>
                <div>
                    <h1>HenryCountries</h1>
                </div>
                <div>
                    <Link to="/home">
                        <button className={styles.btn}>Entrar</button>
                    </Link>

                    <div className={styles.icon}>
                        <box-icon name='world' size='lg' color='#00e4ba'></box-icon>

                    </div>    


                </div>

               

                
           </div>


        </>


    )
}

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCountries: (country) => {
            dispatch(getCountries(country))
        },
        

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)