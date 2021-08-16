
import './App.css';
import React from 'react';
import Weather from './app_component/weather.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import "weather-icons/css/weather-icons.css";
import Form from './app_component/form.component';
import background from "./images/weather.jpeg";
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
      icon: undefined,
      error: false,
    };
    
    this.weatherIcon={
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    }

  }

  calCelsius(temp){
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  getWeatherIcon(icons,id){
      if(id>=200&&id<=232){
        this.setState({icon:this.weatherIcon.Thunderstorm});
      }
      else if(id>=300&&id<=321){
        this.setState({icon:this.weatherIcon.Drizzle});
      }
      else if(id>=500&&id<=531){
        this.setState({icon:this.weatherIcon.Rain});
      }
      else if(id>=600&&id<=622){
        this.setState({icon:this.weatherIcon.Snow});
      }
      else if(id>=701&&id<=781){
        this.setState({icon:this.weatherIcon.Atmosphere});
      }
      else if(id===800){
        this.setState({icon:this.weatherIcon.Clear});
      }
      else if(id>=801&&id<=804){
        this.setState({icon:this.weatherIcon.Clouds});
      }
  }

  getWeather = async(e) =>{
    e.preventDefault();
    const city=e.target.elements.city.value;
    const country=e.target.elements.country.value;

    if(city&&country){
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);
      const response = await api_call.json();
      console.log(response);

      this.setState({
        
          city: `${response.name},${response.sys.country}`,        
          minTemp: this.calCelsius(response.main.temp_min),
          maxTemp: this.calCelsius(response.main.temp_max),
          celsius: this.calCelsius(response.main.temp),
          description: response.weather[0].description,       
      });
      this.getWeatherIcon(this.weatherIcon,response.weather[0].id);
      }
    
      else{
        this.setState({error:true});
      }
  };

  render(){
    return(
    <div  style={{ backgroundImage: `url(${background})`,backgroundPosition: 'center', backgroundSize: 'cover',  backgroundRepeat: 'no-repeat',height:600 }}>
      <Form loadWeather={this.getWeather} error={this.state.error}/>        
      <Weather city={this.state.city}
                country={this.state.country} 
                min_Temp={this.state.minTemp} 
                celsuis_temp={this.state.celsius} 
                max_Temp={this.state.maxTemp} 
                description={this.state.description}
                weatherIcon={this.state.icon}
                
        />
      
    </div>
    );
  }
};

export default App;
