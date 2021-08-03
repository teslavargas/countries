import React, { useEffect, useState } from 'react';
import NavBar from '../navBar/NavBar';
import styles from './Activity.module.css'; 
import { getCountries, postActivity } from '../../store/actions/countryActions';
import { connect } from 'react-redux';


function Activity({countries, getCountries, postActivity}){


    const [selectedCountries] = useState([]);

    const [estadoActualForm, setEstado] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        country: [],
    });

    const [errors, setErrors] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        country: "",
        wrong : ""
      });
    
    const [notifications, setNotifications] = useState({
    success: "",
    
    });


    
    useEffect(() => {
        getCountries()
    }, []);


    function handleSelectedCountries(event) {
        if(event.target.value === "") {
          setErrors({ ...errors, country: "Error in selected country"});
          return;
        }
        setErrors({ ...errors, country: "" });
        const countryExists = estadoActualForm.country.find(
          (item) => item === event.target.innerText
        );
    
        if (!countryExists) {
    
          setEstado({
            ...estadoActualForm,
            country: [...estadoActualForm.country, event.target.value],
          });
        }
      }

    function handleDeleteCountry(event) {
    const filterCountry = estadoActualForm.country.filter(
        (item) => item !== event.target.innerText
    );

    setEstado({ ...estadoActualForm, country: filterCountry });
    }  


    function handleChange(event) {

        if (event.target.id === "" && !event.target.value) {
            setErrors({ ...errors, name: "Invalid name" });
            setEstado({ ...estadoActualForm, name: "" });
        }

        if (event.target.id === "difficulty" && event.target.value <= 0) {
            setEstado({ ...estadoActualForm, difficulty: "" });
        }
        if (event.target.id === "duration" && event.target.value <= 0) {
            setEstado({ ...estadoActualForm, duration: "" });
        }
        console.log(estadoActualForm);
        if (event.target.id === "season" && event.target.value === "Selected") {
            setErrors({ ...errors, season: "Invalid season " });
            setEstado({ ...estadoActualForm, season: "" });
        }

        let form = { ...estadoActualForm };

        form[event.target.id] = event.target.value;

        setEstado(form);

        setErrors({ ...errors, name: "", season: "" });
        setNotifications({ ...notifications, success: "", wrong: "" });
        }

        function handleSubmit(event) {
            event.preventDefault();
        
            setEstado({ ...estadoActualForm, country: selectedCountries });
        
            if (
              estadoActualForm.name !== null &&
              estadoActualForm.difficulty > 0 &&
              estadoActualForm.season !== "" &&
              estadoActualForm.duration > 0 &&
              estadoActualForm.country.length > 0
            ) {
              setNotifications({
                ...notifications,
                success: "Successfully sent",
              });
        
              postActivity(estadoActualForm)
        
              setEstado({
                ...estadoActualForm,
                name: "",
                difficulty: "",
                duration: "",
                season: "",
                country: [],
              });
              event.target.reset();
            } else {
              setErrors({
                ...errors,
                wrong: "Something went wrong",
              });
              event.target.reset();
            }
          }

    return (
        <div>

            <NavBar/>
            <h1>Create a tourism activity</h1>

            <div className={styles.container}>
                <div className={styles.activity}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.activity}>

                        <div>
                            <label className={styles.label}>Name </label>
                            <input
                                onChange={handleChange}
                                value={estadoActualForm.name}
                                type="text"
                                id="name"
                                placeholder="Put a name"
                                className={styles.input}
                                required
                            />
                        </div>

                       
                        <div>
                            <label className={styles.label}>Difficulty </label>
                            <input
                                onChange={handleChange}
                                value={estadoActualForm.difficulty}
                                id="difficulty"
                                type="number"
                                placeholder="Select difficulty"
                                className={styles.input}
                                min="1"
                                max="5"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className={styles.label}>{'Duration (in months)'}</label>
                            <input
                                onChange={handleChange}
                                value={estadoActualForm.duration}
                                id="duration"
                                type="number"
                                placeholder="Select duration"
                                className={styles.input}
                                min="1"
                                max="12"
                                required
                            />
                        </div>
                        
                       <div>
                        <label className={styles.errors, styles.label}>{errors.name}</label>
                            <label className={styles.label} for="season">Season </label>
                                <select required onChange={handleChange} id="season" className={styles.select}>
                                    <option value="Selected" selected>
                                        {"Select"}
                                    </option>
                                    <option value="Summer">Summer</option>
                                    <option value="Autumn">Autumn</option>
                                    <option value="Winter">Winter</option>
                                    <option value="Spring">Spring</option>
                                </select>
                       </div>
                        
                        <div>
                        <label className={styles.label}>Country </label>
                        <select 
                            onChange={handleSelectedCountries}
                            className={styles.select}
                            required

                        >
                        <option value="" selected>
                            Select
                        </option>

                            {   countries &&
                                countries.map((item) => {
                                return <option value={item.id}>{item.name}</option>;
                                })
                            }
                        </select>

                        </div>
                            
                     <div>
                        <label className={styles.errors, styles.label}>
                            {errors.country} {errors.season}
                        </label>
                    </div>       

                    <div className={styles.countrydelete}>
                        {estadoActualForm.country &&
                        estadoActualForm.country.map((item) => {
                            return (
                            <div className={styles.countrydelete}>
                                <label className={styles.label}>ID of the selected country:</label>
                                <div className={styles.btncountrydelete} onClick={handleDeleteCountry}>
                                     {item}
                                </div>
                            </div>
                            );
                        })} 
                    </div> 
                
                
                    </div>

                    <label className={styles.notifications, styles.label}>{notifications.success}</label>
                    <label className={styles.errors, styles.label}>{errors.wrong}</label>
                    <div className={styles.btn}>
                    <button type="submit">Done</button>
                    </div>

                </form>
            </div>
                
        </div>
    </div> 
    )
}


const mapStateToProps = (state) => {
    return { countries: state.countries };
  };
  
const mapDispatchToProps = (dispatch) => {
return {
    postActivity: (form) => dispatch(postActivity(form)),
    getCountries: () => dispatch(getCountries()),
};
};
export default connect(mapStateToProps, mapDispatchToProps)(Activity);