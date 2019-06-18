import React, { Component } from "react";

import '../styles/Main.css';
const axios = require('axios');

const options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  
  
class Weather extends Component {
    constructor() {
        super();
        this.state = { 
            data: [],
            loading: true
        }
    
    }
    componentDidMount() {
        axios.get("https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/924938/")
                .then(res => this.setState({ data: res.data, loading: false })); 
       }
    
    render() {
        const { loading,data} = this.state;
        
        if(loading) { // if your component doesn't have to wait for an async action, remove this block 
          return <div className="loader">        
          </div>
        }
        let i = -1;
        return (
            <div className="block">
                <br/>
                <h1>Weather in {data.location_type} {data.title}!</h1>
                <p className = "to-right"><b>Time:</b>{new Date(data.time).toLocaleString("ru", options)}<br/>
                    <b>Sunset:</b>{new Date(data.sun_set).toLocaleString("ru", options)}<br/> 
                    <b>Sunrise:</b>{new Date(data.sun_rise).toLocaleString("ru", options)}<br/><br/></p>
                <div className="bigest-block">
                    {
                        data.consolidated_weather.map(el => (
                            <div className = "days" key={i++}> 
                                <b>{getDay(i,el)}</b>
                                <img src = {"https://www.metaweather.com/static/img/weather/png/64/"+el.weather_state_abbr+".png"} alt = {el.weather_state_name}/>
                                <p><b>{ el.weather_state_name}</b><br/><br/>
                                <b>min:</b> {Number(el.min_temp).toFixed(2)} C*<br/>
                                <b>max:</b> {Number(el.max_temp).toFixed(2)} C*<br/>
                                <b>wind speed:</b> {Number(el.wind_speed).toFixed(2)} m/s<br/>
                                <b>humidity:</b> {Number(el.humidity).toFixed(2)} %<br/>
                                <b>visibilily:</b> {Number(el.visibility).toFixed(2)}<br/>
                                <b>air pressure:</b>{Number(el.air_pressure).toFixed(2) }
                                </p>
                            </div>
                    ))}
                    
                </div>
            </div>
        );  
    }
    
}

function getDay(i,el){
    if(i==0)return(<h5>Today</h5>)
    else if(i==1)return (<h5>Tomorrow</h5>)
    else return(<h5>{new Date(el.applicable_date).toLocaleString("en-US",{
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        })}</h5>)
}



export default Weather;