
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';



const api ={
    key:"f40bc5f0396aa3777072fbd2a3dcff0d",
    base:"https://api.openweathermap.org/data/2.5/"
}
   
function Takss(props) {
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState({});
    /*
    Search button is pressed. Make a fetch call to the Open Weather Map API.
  */ 
    const searchPressed = () => {
        fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
        });
      };
    
 return (
     <div>
        <Navbar className="navbar" />
        <div class="header-for-bg" style={{ marginTop: 0 }}>
          <div class="background-header position-relative">
            <div class="title-on-header">
              {/* <div class="data-block">
                {/* <h2>Learn and Enjoy!</h2> 
              </div> */}
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
         <div class="header-for-bg">
            <div class="background-header position-relative">
               <img src="images/page-img/profile-bg1.jpg" class="img-fluid w-100 rounded rounded" alt="header-bg"/>
               <div class="title-on-header">
                  <div class="data-block">
                     <h2>Weather</h2>
                     
  {/* Search Box - Input + Button  */}
  <div class="iq-search-bar">
    <form action="#" class="searchbox">
      <input 
      class="text search-input"
        value={search}
        onChange={event => setSearch(event.target.value)}
        onKeyPress={searchPressed}
        placeholder='Enter Location'
        type='text' />
      <a class="search-link" href="#"><i class="ri-search-line"></i></a>
    </form>
  </div>
                  </div>
               </div>
            </div>
         </div>
         <header className="App-header" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  {/* HEADER  */}
  <h1>Weather forecast for :</h1>


  {/* If weather is not undefined display results from API */}
  {typeof weather.main !== "undefined" ? (
    <div class="col-lg-3">
      <div class="iq-card iq-card-block iq-card-stretch iq-card-height bg-primary rounded">
        <div class="iq-card-body p-4">
          <div class="text-center">
            <div class="d-flex align-items-center justify-content-center">
              <i class="ri-cloud-line font-size-32"></i>
              <div class="text-left pl-3">
                <h6 class="text-black">{weather.name}</h6>
                <p class="text-black">{weather.weather[0].main}</p>
                <p class="mb-0">({weather.weather[0].description})</p>
              </div>
            </div>
            <div class="main-temp">
              <p class="text-black">{weather.main.temp}°C</p>
            </div>
            <ul class="d-flex align-items-center justify-content-between list-inline m-0 p-0">
              <li>
                <p class="text-black mb-0">Wind Speed</p>
                <i class="ri-cloud-windy-line font-size-18"></i>
                <h6 class="text-black">{weather.wind.speed.toFixed()} MPH </h6>
              </li>
              <li>
                <p class="text-black mb-0">Feels Like</p>
                <i class="ri-showers-line font-size-18"></i>
                <h6 class="text-black">{weather.main.feels_like.toFixed()}°F</h6>
              </li>
              <li>
                <p class="text-black mb-0">Humidity</p>
                <i class="ri-sun-cloudy-line font-size-18"></i>
                <h6 class="text-black">{weather.main.humidity}%</h6>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  )}
</header>

 
    <footer class="bg-white iq-footer">
         <div class="container-fluid">
            <div class="row">
               <div class="col-lg-6">
                  <ul class="list-inline mb-0">
                     <li class="list-inline-item"><a href="privacy-policy.html">Privacy Policy</a></li>
                     <li class="list-inline-item"><a href="terms-of-service.html">Terms of Use</a></li>
                  </ul>
               </div>
               <div class="col-lg-6 text-right">
                  Copyright 2020 <a href="#">SocialV</a> All Rights Reserved.
               </div>
            </div>
         </div>
      </footer>
  </div>
  
 
    );
}

export default Takss;