import { useCallback, useState } from "react"
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react"
import { useGeolocated } from "react-geolocated"
import { mapStyle  } from "../mapStyle"
import { apiKey, icons, locations } from "../constants"
import { getPosition, GetMarker } from "../helpers"

const markers = [
    { text: "Home", location: locations.home, icon: icons.homeIcon },
    { text: "i360", location: locations.i360, icon: icons.sheikahTowerIcon },
    { text: "St Anns Well Park", location: locations.stAnnsWellPark, icon: icons.kokokIcon },
    { text: "Stables", location: locations.merryGoRound, icon: icons.stableIcon },
    { text: "Temple of Time", location: locations.templeOfTime, icon: icons.templeOfTimeIcon },
    { text: "Gerudo City", location: locations.gerudoCity, icon: icons.sideQuestIcon },
    { text: "Goddess Statue", location: locations.statue, icon: icons.goddessStatueIcon },
    { text: "Goddess Statue", location: locations.statue, icon: icons.goddessStatueIcon },
    { text: "Korok Challenge 1", location: locations.korokChallenge1, icon: icons.kokokIcon },
    { text: "Korok Challenge 2", location: locations.korokChallenge2, icon: icons.kokokIcon },
    { text: "No Catch", location: locations.foodNoCatch, icon: icons.cookingPot },
]

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

    const [labels, setLabels] = useState(markers.map(label => ({ ...label, visible: false })))

    const handleLabelTap = useCallback((location) => {
        const newLabels = labels.map(label => ({
            ...label,
            visible: label.location == location ? !label.visible : false,
        }))
        setLabels(newLabels)
    }, [labels, setLabels])

    const getLabel = useCallback((location) => {
        const label = labels.find((label) => label.location == location)
        return label.visible ? label.text : null
    }, [labels])

    return (
        <Map
            google={google}
            zoom={15}
            initialCenter={getPosition(locations.home)}
            onReady={onReady}>
                {markers.map(marker => GetMarker(marker.location, marker.icon, getLabel(marker.location), () => handleLabelTap(marker.location)))}
                {/* {GetMarker(locations.home, icons.homeIcon, getLabel(locations.home), () => handleLabelTap(locations.home))}
                {GetMarker(locations.i360, icons.sheikahTowerIcon, getLabel(locations.i360), () => handleLabelTap(locations.i360))}
                {GetMarker(locations.merryGoRound, icons.stableIcon)}
                {GetMarker(locations.stAnnsWellPark, icons.kokokIcon)}
                {GetMarker(locations.templeOfTime, icons.templeOfTimeIcon)}
                {GetMarker(locations.gerudoCity, icons.sideQuestIcon)}
                {GetMarker(locations.statue, icons.goddessStatueIcon)}
                {GetMarker(locations.korokChallenge1, icons.kokokIcon)}
                {GetMarker(locations.korokChallenge2, icons.kokokIcon)}
                {GetMarker(locations.foodNoCatch, icons.cookingPot)} */}
                {coords && GetMarker(`${coords.latitude}, ${coords.longitude}`, icons.questIcon)}
            </Map>
    )
}

export const MainMap = GoogleApiWrapper({ apiKey })(MainMapContainer)
