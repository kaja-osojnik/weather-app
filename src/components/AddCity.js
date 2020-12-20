import React, {useContext, useState}  from "react";
import WeatherContext from "../context/weatherContext";


const  AddCity= () => {
    const weatherContext = useContext(WeatherContext);
    const { closeSearchCities, searchCity, alert, clearAlert, cities, alreadyExists } = weatherContext;
    const [cityName, setCityName] = useState('')

    const onSumbit = (e) => {
        e.preventDefault();
        let checkCities = false;
        for (let i = 0; i<cities.length; i++){
            if(cities[i].name === cityName)
                checkCities = true
        }

        if(!checkCities){
            searchCity(cityName);
            setCityName("");
        } else {
            alreadyExists()
        }

    }



    const onChange = (e) => {
        setCityName(e.target.value);
        clearAlert();
    }

    return(
        <div className="add-city-modal">
            <span className="cancel" onClick={closeSearchCities}>&#10005;</span>
            <form onSubmit={onSumbit}>
                <input
                    type="text"
                    name="text"
                    value={cityName}
                    placeholder="Enter a city name..."
                    onChange={onChange}
                />
                {alert.length ?
                <small>{alert}</small>
                    :
                    ""
                }
                <button className="add-btn" type="submit">Add</button>
            </form>
        </div>
    )
}


export default (AddCity);
