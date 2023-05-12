import { useCallback } from "react"
import { Map, GoogleApiWrapper } from "google-maps-react"
import { useGeolocated } from "react-geolocated"
import { mapStyle  } from "../mapStyle"
import { apiKey, icons, locations } from "../constants"
import { getPosition, getMarker } from "../helpers"

const MainMapContainer = ({ google }) => {
    // Location
    const { coords } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: true,
            },
            userDecisionTimeout: 5000,
    })

    const onReady = useCallback((mapProps, map) => {
        map.setOptions({
            styles: mapStyle,
            streetViewControl: false,
            disableDefaultUI: true,
        })
    }, [])

    return (
        <Map
            google={google}
            zoom={15}
            initialCenter={getPosition(locations.home)}
            onReady={onReady}>
                {getMarker(locations.home, icons.homeIcon)}
                {getMarker(locations.i360, icons.sheikahTowerIcon)}
                {getMarker(locations.merryGoRound, icons.stableIcon)}
                {getMarker(locations.stAnnsWellPark, icons.kokokIcon)}
                {getMarker(locations.templeOfTime, icons.templeOfTimeIcon)}
                {getMarker(locations.gerudoCity, icons.sideQuestIcon)}
                {coords && getMarker(`${coords.latitude}, ${coords.longitude}`, icons.questIcon)}
            </Map>
    )
}

export const MainMap = GoogleApiWrapper({ apiKey })(MainMapContainer)
