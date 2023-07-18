import { useEffect, useState } from "react";
import "./App.css";

const backEndURL = `https://p8prada-orange-invention-pxw6xq57w96fr5jx-5001.preview.app.github.dev/`;

const dn = new Date();
var AmOrPm = dn.getHours() >= 12 ? 'PM' : 'AM';

function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [current, setCurrent] = useState({});
  const [location, setLocation] = useState({});
  const [forecast, setForecast] = useState({});


  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${backEndURL}geeks-firebase-72e6d/us-central1/getDayWeather `
      );

      const data = await res.json();

      setCurrent(data.data.current);
      setLocation(data.data.location);
      setForecast(data.data.forecast.forecastday[0]);

      console.log(location);


      setDataLoaded(true);

      console.log("The res: ", data);
    })();
  }, []);


  if (!dataLoaded ) return <p>...loading</p>

  return (
    <div className="App">
      <header className="App-header">
        
        <div className="infoContainer">
          <div id='current'>
            <img className='icon' src={current.condition.icon} alt="weather icon"/>
            <p className="currentTemp">{current.temp_f}°F</p>
          </div>
        
        <div className="location">
          <i class="fa-solid fa-location-dot"></i> {location.name}, {location.region}
        </div>
          {current.condition.text}

          {(!!forecast) && 
          <p className="minAndMax">
            {forecast.day.mintemp_f}° / {forecast.day.maxtemp_f}° Feels Like {current.feelslike_f}°
          </p>}

            <div className="forecastHour">
              <div className="hourLine">
                {(dn.getHours()-1)%12 + " " + AmOrPm}
                <img className="hourIcon" src={forecast.hour[dn.getHours()-1].condition.icon} alt="hour icon"/>
                {forecast.hour[dn.getHours()-1].temp_f}°
              </div>
            </div>

            <div className="forecastHour">
              <div className="hourLine">
                {(dn.getHours())%12 + " " + AmOrPm}
                <img className="hourIcon" src={forecast.hour[dn.getHours()].condition.icon} alt="hour icon"/>
                {forecast.hour[dn.getHours()].temp_f}°
              </div>
            </div>

            <div className="forecastHour">
              <div className="hourLine">
                {(dn.getHours()+1)%12 + " " + AmOrPm}
                <img className="hourIcon" src={forecast.hour[dn.getHours()+1].condition.icon} alt="hour icon"/>
                {forecast.hour[dn.getHours()+1].temp_f}°
              </div>
            </div>

            <div className="forecastHour">
              <div className="hourLine">
                {(dn.getHours()+2)%12 + " " + AmOrPm}
                <img className="hourIcon" src={forecast.hour[dn.getHours()+2].condition.icon} alt="hour icon"/>
                {forecast.hour[dn.getHours()+2].temp_f}°
              </div>
            </div>

            <div className="forecastHour">
              <div className="hourLine">
                {(dn.getHours()+3)%12 + " " + AmOrPm}
                <img className="hourIcon" src={forecast.hour[dn.getHours()+3].condition.icon} alt="hour icon"/>
                {forecast.hour[dn.getHours()+3].temp_f}°
              </div>
            </div>

        </div>


      </header>
    </div>
  );
}

export default App;
