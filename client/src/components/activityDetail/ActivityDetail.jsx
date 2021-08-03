import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getActivities } from "../../store/actions/countryActions";
import styles from './ActivityDetail.module.css'; 

function ActivityDetail({ match, nombreAccionEnComponente, activity}) {

    

    useEffect(() => {
        nombreAccionEnComponente(match.match.params.id);
        console.log(match.match.params.id);
      }, [nombreAccionEnComponente]);

      console.log(activity.name);

  return (
    <div className={styles.activityCard}>
        <h3>Actividad</h3>
        <div className={styles.activityBody}>
            <h5>Name: {activity.name}.</h5> 
            <h5>CreatedAt: {activity.createdAt}.</h5> 
            <h5>Difficulty: {activity.difficulty}.</h5> 
            <h5>Duration: {activity.duration}.</h5> 
            <h5>Season: {activity.season}.</h5> 

        </div>

    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        activity: state.activity
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    nombreAccionEnComponente: (id) => dispatch(getActivities(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetail);