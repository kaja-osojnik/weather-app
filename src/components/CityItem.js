import React, {useContext} from "react";
import WeatherContext from "../context/weatherContext";


const  CityItem= ({ city }) => {
    const weatherContext = useContext(WeatherContext);
    const { removeCity } = weatherContext;

    const onClick = () => {
        removeCity(city.name)
    }

    return(
        <li>
            <span className="delete" onClick={onClick}>&#10005;</span>
            <div className="temperature">
                <h2>{city.name}</h2>
                <h2>{city.temperature}°</h2>
             </div>
            <span className="humidity">{city.description} | </span>
            <span className="humidity">{city.humidity}% humidity</span>

        </li>
    )
}


export default (CityItem);
