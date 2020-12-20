import React, {useReducer} from 'react';
import axios from 'axios';
import WeatherContext from "./weatherContext";
import WeatherReducer from "./weatherReducer";
import {
    SEARCH_CITIES,
    OPEN_SEARCH_CITIES,
    CLOSE_SEARCH_CITIES,
    SET_LOADING,
    CITY_NOT_FOUND,
    CLEAR_ALERT,
    LOAD_CITIES
} from "./types";

const WeatherState = props => {
    const initialState = {
        cities: [],
        openSearch: false,
        loading: false,
        alert: ''
    }

    const [state, dispatch] = useReducer(WeatherReducer, initialState);

    // Open Search City Modal
    const openSearchCities = () => {
        dispatch ({ type: OPEN_SEARCH_CITIES })
    }

    // Close Search City Modal
    const closeSearchCities = () => {
        dispatch ({ type: CLOSE_SEARCH_CITIES })
    }

    //Search Cities
    const searchCity = async cityName => {
        setLoading(true)
       try{
           const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=b296986cc6760f0d001dfcfa6840d29e`);

           const cityData = {
               name: res.data.name,
               temperature: Math.round(res.data.main.temp),
               humidity: res.data.main.humidity,
               description: res.data.weather[0].description.replace(/^\w/, (c) => c.toUpperCase())
           }

           dispatch({
               type: SEARCH_CITIES,
               payload: cityData
           })

       } catch (err) {
           console.error(err)
           dispatch({
               type: CITY_NOT_FOUND,
               payload: "City not found, please try again..."
           })
       }

    }

    const setLoading = () => dispatch ({ type: SET_LOADING });

    const clearAlert = () => dispatch ({ type: CLEAR_ALERT });

    //Load saved cities on reload
    const loadSavedCities = async () => {
        if (localStorage.savedCities) {
            const savedCities = localStorage.getItem('savedCities');
            const savedCitiesSlice = savedCities.slice(1, -1);
            const savedCitiesSplit = savedCitiesSlice.split(",")

            for (let i = 0; i < savedCitiesSplit.length; i++) {
                const cityName = savedCitiesSplit[i].slice(1, -1)

                const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=b296986cc6760f0d001dfcfa6840d29e`);

                const cityData = {
                    name: res.data.name,
                    temperature: Math.round(res.data.main.temp),
                    humidity: res.data.main.humidity,
                    description: res.data.weather[0].description.replace(/^\w/, (c) => c.toUpperCase())
                }

                dispatch({
                    type: LOAD_CITIES,
                    payload: cityData
                })
            }

        }
    }

    return <WeatherContext.Provider
        value={{
            cities: state.cities,
            openSearch: state.openSearch,
            loading: state.loading,
            alert: state.alert,
            openSearchCities,
            closeSearchCities,
            searchCity,
            setLoading,
            clearAlert,
            loadSavedCities
    }}>
        {props.children}
    </WeatherContext.Provider>
}

export default WeatherState;