import './App.css';
import CitiesList from "./components/CitiesList";
import WeatherState from "./context/weatherState";

function App() {
  return (
      <WeatherState>
          <div className="App">
              <h1>Urban Weather</h1>
              <CitiesList />
          </div>
      </WeatherState>
  );
}

export default App;
