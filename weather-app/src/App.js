
import './App.css';
import React from 'react';
import Weather from './app_component/weather.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import "weather-icons/css/weather-icons.css";
import { Component } from 'react';


const API_key = "96c876694bfaa16cb0af1b3c058f607f";


class App extends React.Component{
  constructor(){
    super();
    this.state = {
      city: undefined,
      country: undefined,
      minTemp: undefined,
      maxTemp: undefined,
      celsius: undefined,
      description: "",
      weathericon: undefined,
    };
    this.getWeather();
    this.weatherIcon={
      Thunderstorm: "wi-thunderstorm"
    }

  }

  calCelsius(temp){
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  getWeather = async() =>{
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_key}`);
    const response = await api_call.json();
    console.log(response);

    this.setState({
      
        city: response.name,
        country: response.sys.country,
        minTemp: this.calCelsius(response.main.temp_min),
        maxTemp: this.calCelsius(response.main.temp_max),
        celsius: this.calCelsius(response.main.temp),
        description: response.weather[0].description,
        error:false,
    })
  };

  render(){
    return(
    <div className="App">
     <Weather city={this.state.city}
              country={this.state.country} 
              min_Temp={this.state.minTemp} 
              celsuis_temp={this.state.celsius} 
              max_Temp={this.state.maxTemp} 
              description={this.state.description}
              weatherIcon={this.state.weathericon}
      />
    </div>
    );
  }
};

export default App;
