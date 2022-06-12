import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import ChangeMapView from './ChangeMapView';
import "./style.css"
function App() {
  const [inputvalue , setInputValue] = useState({value:''});
  const [ipAddress, setIpAddress] = useState("8.8.8.8")
  const [api , setApi] = useState();
  const [position , setPosition] = useState({lat:"45.4", lng:"-75.7"})
  
  useEffect(()=>{
    (async ()=>{
      const key = process.env.REACT_APP_GEOLOCATION_API_KEY
          const adress = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${key}&ipAddress=${ipAddress}`)
          setApi(adress)
          
    })()
    return () => {
      
      // this now gets called when the component unmounts
    };
  },[ipAddress])
  function handleInputChange(event){
    setInputValue({value: event.target.value})
  }
  function handleSubmit(event){
    setIpAddress(inputvalue.value)
  setPosition(()=>{
    return(
      {
      lat: api?.data.location.lat,
      lng: api?.data.location.lng
    }
    )  
      
  })
  }
  
  return (
    <div className="App">
      <div className="header-section"> 
      <h1 className="title" >IP Address Tracker</h1>
      <div className="input-div">
      <input type="text" value={inputvalue.value} onChange={handleInputChange} placeholder="Search for any IP address or domain" className="input-field"/>
      <div onClick={handleSubmit} className="submit-button"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6"/></svg></div>
      </div>
      <div className="infos">
        <div className="info-section-divs">
          <p className="infos-title">IP ADDRESS</p>
          <p className="info-text">{api?.data.ip}</p>
        </div>
        <div className="info-section-divs">
          <p className="infos-title">LOCATION</p>
          <p className="info-text">{api?.data.location.country}, {api?.data.location.region}</p>
        </div>
        <div className="info-section-divs">
          <p className="infos-title">TIMEZONE</p>
          <p className="info-text">UTC {api?.data.location.timezone}</p>
        </div>
        <div className="info-section-divs">
         <p className="infos-title">ISP</p>
         <p className="info-text">{api?.data.isp}</p>
        </div>
      </div>
      </div>
      <MapContainer  center={[position.lat , position.lng]} zoom={12}>
      <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[position.lat , position.lng]}>
      <Popup>
        You are here.
      </Popup>
    </Marker>
    <ChangeMapView coords={[position.lat , position.lng]} />
    </MapContainer>
    </div>
  );
}

export default App;
