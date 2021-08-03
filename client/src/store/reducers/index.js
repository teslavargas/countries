import { GET_ACTIVITIES, GET_COUNTRIES, GET_DETAIL, SEARCH_COUNTRY, GET_ALL_ACTIVITIES, GET_ALPHABETICALLY } from '../actions/countryActions';

const initialState = {
    countries: [],
    continent: [],
    country: {},
    activity: {},
    activities: [],
    
  };

const reducer = (state = initialState, action) => {

    console.log(action); 

    switch (action.type) {
        case GET_COUNTRIES:
        return {
            ...state,
            countries: [...action.payload]
        };

        case GET_DETAIL:
            return {
                ...state,
                country: action.payload
            };
        case SEARCH_COUNTRY:
            return {
                ...state,
                countries: action.payload 
            };    

        case GET_ACTIVITIES:
            return { 
                ...state, 
                activity: { ...action.payload } 
            };    

        case GET_ALL_ACTIVITIES:
            return { 
                ...state, 
                activities: action.payload 
            };
        case GET_ALPHABETICALLY: 
            return {
                ...state,
                countries: [...action.payload]
            }            
        
    
        default:
            return {
                ...state,
            };
    }
}

export default reducer; 