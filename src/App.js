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
      <img src={sheikahTopSlate} style={{ position: 'absolute', width: "100%" }} />
      <img src={sheikahBottomSlate} style={{ position: 'absolute', bottom: 0, width: "100%" }} />
    </div>
  );
}

export default App;
