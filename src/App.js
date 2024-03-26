import {useState, useEffect} from 'react'
import './App.css';

function App() {

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const[country, setCountry] = useState("")
  const[state, setState] = useState("")
  const[city, setCity] = useState("")

  const getCountries = async() => {
    try{
    const response = await fetch('https://crio-location-selector.onrender.com/countries')
    const data = await response.json();
    setCountries(data)}
    catch(e){
      console.log(e)
    }
  }

  const getStates = async() => {
    try{
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${country}/states`)
      const data = await response.json()
      setStates(data)
    }catch(err){
      console.log(err);
    }
  }

  const getCities = async() => {
    try{
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`)
      const data = await response.json()
      setCities(data)
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getCountries()
  },[])

  useEffect(()=>{
    getStates()
  },[country])

  useEffect(()=>{
    getCities()
  },[state])

  return (
    <>
      <h1>Select Location</h1>   

      <select name="country" id="country" onChange={(e) => setCountry(e.target.value)}>
        <option value="" selected disabled>Select a country</option>
        {countries.map((e) => {
          return(
            <option key={e} value={e}>{e}</option>
          )
        })}
    </select>

    <select name="states" id="states" disabled = {country ? false : true} onChange={(e) => setState(e.target.value)}>
      <option value="" selected disabled>Select a state</option>
      {country && 
        states.map((state)=>{
          return (
            <option key={state} value={state}>{state}</option>
          )
        })
      }
    </select>

    <select name="cities" id="cities" disabled = {state ? false : true} onChange={(e) => setCity(e.target.value)}>
      <option value="" selected disabled>Select a city</option>
      {states && 
        cities.map((city)=>{
          return (
            <option key={city} value={city}>{city}</option>
          )
        })
      }
    </select>

    <br/>
    {(country && state && city) ? <p>You selected {city}, {state}, {country}</p> : null}
    </>
  );
}

export default App;
