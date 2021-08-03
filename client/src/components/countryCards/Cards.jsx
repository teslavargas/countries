import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCountries, getAllActivities } from '../../store/actions/countryActions';
import SearchBar from "../searchBar/SearchBar"; 
import Card from './Card'; 
import styles from './Card.module.css';
import NavBar from '../navBar/NavBar';

function CountryCards({countries, getCountries, activities, getAllActivities}){
    
    useEffect(() => {
        getCountries();
        getAllActivities(); 
    }, []);

   

    const [activitySelected, setActivitySelected] = useState('All'); 

    const [continentSelected, setContinentSelected] = useState('All'); 

    const [actualCountries, setActualCountries] = useState([]);

    const [estadoActualForm, setEstado] = useState("");
    
    const countriesPerPage = 10;
    
    const numberOfPages = countries.length / countriesPerPage;
    
    const [actualPage, setActualPage] = useState(0);

    const [populationSelected, setPopulationSelected] = useState(); 

    const [alphabeticSelected, setAlphabeticSelected] = useState(); 

    const pages = (pageNumber) => {
        const aux =
        pageNumber === 0
            ? pageNumber + 1 * countriesPerPage
            : pageNumber * countriesPerPage + 1;
            setActualCountries(countries.slice(aux - countriesPerPage, aux)); // define la seccion que renderizo en la pagina
        // define cual es el indice del principio y el final
        setActualPage(pageNumber);
    };

  
    useEffect(() => {
        pages(0);
    }, [countries]); //ejecuto el paginate


    useEffect(() => {
        setActualCountries(countries.filter((country) => {
            return country.name.toLowerCase().includes(estadoActualForm);
        }))
    }, [estadoActualForm])

    const continents = ['All', 'Asia', 'Americas', 'Oceania', 'Africa', 'Europe', 'Polar']; 

    useEffect(() => {
        if(continentSelected !== 'All'){
            setActualCountries(countries.filter((country) => {
                return country.region === continentSelected; 
            }))
        } else {
            setActualCountries(countries); 
        }
    }, [continentSelected])

    useEffect(() => {
        if(activitySelected !== 'All'){
            setActualCountries(countries.filter((country) => {
                return country.activityId.find((activity) => {
                    console.log(activitySelected)
                    return activity.id === activitySelected;
                })  
            }))
        } else {
            setActualCountries(countries); 
        }
    }, [activitySelected])

    useEffect(() => {
        if(populationSelected === 'Lower population'){
            setActualCountries(countries.sort(function(a, b){return a.population - b.population}))
        } else if(populationSelected === 'Higher population'){
            setActualCountries(countries.sort(function(a, b){return b.population - a.population}))
        } else {
            setActualCountries(countries); 
        }
        
    }, [populationSelected])


    useEffect(() => {
        if(alphabeticSelected === 'Ascendant'){
            setActualCountries(countries.sort(function(a, b){return a.id - b.id}))
        } else if (alphabeticSelected === 'Descendant'){
            setActualCountries(countries.sort(function(a, b){ return b.id - a.id}))
        } else {
            setActualCountries(countries);
        }
    }, [alphabeticSelected])

  

    return (

            <div className={styles.cards}>
                <div>

                <NavBar />
                <SearchBar estadoActualForm={estadoActualForm} setEstado={setEstado} />

                <select onChange={(e) => setPopulationSelected(e.target.value)} value={populationSelected}>
                    <option value={'Filter by population'}>Filter by population</option>
                    <option value={'Lower population'}>Lower population</option>
                    <option value={'Higher population'}>Higher population</option>
                </select>

                <select onChange={(e) => setAlphabeticSelected(e.target.value)} value={alphabeticSelected}>
                    <option value={'Filter alphabetically'}>Filter alphabetically</option>
                    <option value={'Ascendant'}>A - Z</option>
                    <option value={'Descendant'}>Z - A</option>
                </select>


                <select onChange={(e) => setContinentSelected(e.target.value)} value={continentSelected}>
                    {continents.map((continent) => <option value={continent}>{continent}</option>)}
                </select>


                <select onChange={(e) => setActivitySelected(e.target.value)} value={activitySelected}>
                    <option value={'All'}>All</option>
                    {activities.map((activity) => <option value={activity.id}>{activity.name}</option>)}
                </select>


                <div className={styles.btnRes}>
                    <button 
                        onClick={
                            () => 
                                {   
                                    getCountries();
                                    setContinentSelected('All'); 
                                    setActivitySelected('All'); 
                                    setPopulationSelected('Filter by population'); 
                                    setAlphabeticSelected('Filter alphabetically')
                                }
                                
                                }
                    >Reset filters
                    </button>
                </div>

                <div>
                    <button 
                        className={styles.buttonPage}
                        onClick={() => pages(actualPage >= 1 ? actualPage - 1 : actualPage)}>{'<'}
                    </button>

                    <button
                        className={styles.buttonPage} 
                        onClick={() => pages(actualPage < numberOfPages ? actualPage + 1 : actualPage)}>{'>'}
                    </button>

                </div>  


                    {   
                        actualCountries &&
                        actualCountries.map((country) => (
                            <div key={country.id}>
                                <Card
                                    key={country.id}
                                    id={country.id}
                                    name={country.name}
                                    region={country.region}
                                    flag={country.flag}
                                />
                            </div>

                        ))
                    
                    }

                </div>


                    

            </div>



        
    );
     
    
}
    
const mapStateToProps = (state) => {
    return {
        countries: state.countries,
        activities: state.activities,
        countriesA: state.countriesA
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCountries: (country) => {
            dispatch(getCountries(country))
        },
        getAllActivities: (activity) => {
            dispatch(getAllActivities(activity))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryCards)