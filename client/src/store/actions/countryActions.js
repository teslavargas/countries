import axios from 'axios';
import { COUNTRY_URL } from '../../constants';
export const GET_COUNTRIES = 'GET_COUNTRIES'; 
export const GET_DETAIL = 'GET_DETAIL';
export const SEARCH_COUNTRY = 'SEARCH_COUNTRY'; 
export const POST_ACTIVITY = 'POST_ACTIVITY';
export const ACTIVITY_TO_COUNTRY = 'ACTIVITY_TO_COUNTRY';
export const GET_ACTIVITIES = 'GET_ACTIVITIES'; 
export const GET_ALL_ACTIVITIES = 'GET_ALL_ACTIVITIES'; 
export const GET_ALPHABETICALLY = 'GET_ALPHABETICALLY'; 

export function getCountries(){
    return function(dispatch){
        return axios.get(COUNTRY_URL)
            .then((response) => {
                dispatch({
                    type: GET_COUNTRIES,
                    payload: response.data,
                })
            })
    }
}

export function getDetailCountry(id) {
  return function (dispatch) {
    return axios.get(`http://localhost:3001/countries/${id}`)
      .then((response) => {
          dispatch({ 
            type: GET_DETAIL, 
            payload: response.data, 
          }); 
        });
  };
}

export function searchCountry(name) {
  return function (dispatch) {
    return axios.get(`http://localhost:3001/countries/${name}`)
      .then((response) => {
        dispatch({ 
          type: SEARCH_COUNTRY, 
          payload: response.data,
        });
      });
  };
}

export function postActivity(form) {
  return function (dispatch) {
    return axios.post(`http://localhost:3001/activities`, form)
      .then((response) => {
        console.log(response.data)
        dispatch({ 
          type: POST_ACTIVITY, 
          payload: response.data 
        });
      });
  };
  }

export function postActivityToCountry(countryId, activityId){
  return function (dispatch){
    return axios.post(`http://localhost:3001/${countryId}/activities/${activityId}`)
      .then((response) => {
        dispatch({
          type: ACTIVITY_TO_COUNTRY,
          payload: response.data
        })
      })
  }
}  

export function getActivities(id) {
  return function (dispatch) {
    return axios.get(`http://localhost:3001/activities/${id}`)
      .then((response) => {
        dispatch({ 
          type: GET_ACTIVITIES, 
          payload: response.data
          
         });
      });
  };
}

export function getAllActivities() {
  return function (dispatch) {
    return axios.get(`http://localhost:3001/activities/`)
      .then((response) => {
        dispatch({ 
          type: GET_ALL_ACTIVITIES, 
          payload: response.data
          
         });
      });
  };
}

  