import {
    SEARCH_CITIES,
    OPEN_SEARCH_CITIES,
    CLOSE_SEARCH_CITIES,
    SET_LOADING,
    CITY_NOT_FOUND,
    CLEAR_ALERT,
    LOAD_CITIES
} from "./types";

export default (state, action) => {
    switch(action.type){
        case OPEN_SEARCH_CITIES:
            return {
                ...state,
                openSearch: true
            }

        case CLOSE_SEARCH_CITIES:
            return {
                ...state,
                openSearch: false
            }

        case SET_LOADING:
            return {
                ...state,
                loading: true
            }

        case LOAD_CITIES:
            return{
                ...state,
                loading: false,
                cities: [action.payload, ...state.cities]
            }

        case SEARCH_CITIES:
            var array = JSON.parse(window.localStorage.getItem("savedCities")) || [];//the "|| []" replaces possible null from localStorage with empty array
            var value = action.payload.name
            if(array.indexOf(value) === -1){
                array.push(value);
                window.localStorage.setItem("savedCities", JSON.stringify(array));
            }
            return{
                ...state,
                loading: false,
                alert: "",
                cities: [action.payload, ...state.cities]
            }

        case CITY_NOT_FOUND:
            return{
                ...state,
                alert: action.payload,
                loading: false,
            }

        case CLEAR_ALERT:
            return{
                ...state,
                alert: ""
            }


        default:
            return state;
    }
}