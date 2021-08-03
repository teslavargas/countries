import { useEffect } from 'react';
import { connect } from "react-redux";
import styles from '../countryDetails/CountryDetails.module.css';
import { getDetailCountry } from '../../store/actions/countryActions';
import { Link } from 'react-router-dom';


function CountryDetails({match, nombreAccionEnComponente, country}) {
  
    useEffect(() => {
        nombreAccionEnComponente(match.match.params.id);
        console.log(match.match.params.id);
      }, [nombreAccionEnComponente]);

    console.log(country.activityId);   

    
    return (


      <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.card_details}>
              <div className={styles.titleCard}>
                <h1>
                  {country?.name}
                </h1>
              </div>
              <div className={styles.imgContainer}>
                <img src={country?.flag} alt="Flag"/>
              </div>
              <p>Continent: <span>{country?.region} </span></p>
              <p>Subregion: <span>{country?.subregion}</span></p>
              <p>Capital: <span>{country?.capital}</span>{" "}</p>
              <p>Area: <span>{country?.area}</span> km²</p>
              <p>Population: <span>{country?.population} </span></p>
              



              <div className={styles.activityBorder}>
                 <h1>Activities</h1>

                  {
                    country?.activityId?.length > 0 ? country.activityId.map((activity) => {
                      return <div>
                                <h5 className={styles.nameActivity}>Name of activity: <span>{activity.name}</span></h5> 
                                <h5>CreatedAt: {activity.createdAt}.</h5> 
                                <h5>Difficulty: {activity.difficulty}.</h5> 
                                <h5>Duration: {activity.duration}.</h5> 
                                <h5>Season: {activity.season}.</h5> 
                            </div>
                    }) : <h5>No activities for this country</h5>
                  }

              </div>



            </div>



  




          </div>

         <div>
            <div className={styles.containerBtn}>
                <Link to="/home"><button className={styles.btnVolver}>Go back</button></Link>
            </div>
         </div>

      </div>


    )
  }

const mapStateToProps = (state) => {
    return {
        country: state.country
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        nombreAccionEnComponente: (country) => {
            dispatch(getDetailCountry(country))
        }

      
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryDetails)

