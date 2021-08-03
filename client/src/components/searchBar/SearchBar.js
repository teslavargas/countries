import React from "react";
import styles from "./SearchBar.module.css";
import { connect } from "react-redux";
import { searchCountry } from "../../store/actions/countryActions"; 

export function SearchBar({estadoActualForm, setEstado }) {
  
  function handleChange(event) {
    setEstado(event.target.value.toLowerCase());
    console.log(event.target.value);
  }

  return (
    <div className={styles.container}>
      <form className={styles.formContainer}>
       <div>
            <div className={styles.input}>
                <input
                  type="text"
                  placeholder="Search country by name"
                  value={estadoActualForm}
                  onChange={handleChange}
                ></input>
            </div>




       </div>

      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return { searchCountry: (name) => dispatch(searchCountry(name)) };
};

export default connect(null, mapDispatchToProps)(SearchBar);