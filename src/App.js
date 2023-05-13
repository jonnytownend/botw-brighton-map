import './App.css'
import sheikahTopSlate from '../src/imgs/sheika-slate-top.png'
import sheikahBottomSlate from '../src/imgs/sheika-slate-bottom.png'
import { useGeolocated } from "react-geolocated"
import { MainMap } from './components/MainMap'
import { useEffect, useState } from 'react'

const LocationTester = () => {
  const [coords, setCoords] = useState("None")

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords(`${position.coords.latitude}, ${position.coords.longitude}`)
    })
  }, [])

  return <div><p>Location: {coords}</p></div>
}

function App() {
  return (
    <div>
      <MainMap />
      <img className='overlay' src={sheikahTopSlate} />
      <img className='overlay' src={sheikahBottomSlate} style={{ bottom: 0 }} />
    </div>
  );
}

export default App;
