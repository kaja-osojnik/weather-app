import React  from "react";


const  CityItem= ({ city }) => {

    return(
        <li>
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
