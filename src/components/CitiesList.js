import React, {Fragment, useContext, useEffect} from "react";
import AddCity from "./AddCity";
import CityItem from "./CityItem";
import WeatherContext from "../context/weatherContext";


const  CitiesList= () => {
    const weatherContext = useContext(WeatherContext);
    const { cities, openSearch, openSearchCities,loadSavedCities } = weatherContext;

    useEffect(() => {
        loadSavedCities();
        // eslint-disable-next-line
    }, []);

    return(
        <Fragment>
            {openSearch &&
                <AddCity />
            }
        <div className="city-list">
            {cities.length ?
                <ul>
                    {
                        cities.map((city, index) =>
                            <CityItem city={city} key={index}/>
                        )
                    }

                </ul>
                :
                <p>No cities added yet</p>
            }

            {!openSearch &&
            <button className="add-btn" onClick={openSearchCities}>Add a City</button>
            }
        </div>
        </Fragment>
    )
}


export default (CitiesList);
