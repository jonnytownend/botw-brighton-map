import { useCallback, useState } from "react"
import { Map, InfoWindow, GoogleApiWrapper } from "google-maps-react"
import { useGeolocated } from "react-geolocated"
import { mapStyle  } from "../mapStyle"
import { apiKey, icons, locations } from "../constants"
import { getPosition, GetMarker } from "../helpers"
import { markers } from "../markers"

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

    const [activeMarker, setActiveMarker] = useState(undefined)

    const handleLabelTap = useCallback((marker) => {
        setActiveMarker(marker)
    }, [setActiveMarker])

    return (
        <Map
            google={google}
            zoom={15}
            initialCenter={getPosition(locations.home)}
            onReady={onReady}>
                {markers.map(marker => GetMarker(marker.location, marker.icon, () => handleLabelTap(marker)))}
                {coords && GetMarker(`${coords.latitude}, ${coords.longitude}`, icons.questIcon)}
                {activeMarker && activeMarker.location && (
                    <InfoWindow
                        options={{ maxWidth: 300 }}
                        ma
                        position={{
                            lat: Number(getPosition(activeMarker.location).lat) + 0.001,
                            lng: getPosition(activeMarker.location).lng,
                        }}
                        visible
                    >
                        <div>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <img src={activeMarker.icon} style={{ paddingRight: 8 }} />
                                <h1>{activeMarker.text}</h1>
                            </div>
                            <p style={{ marginTop: -8 }}>{activeMarker.body}</p>
                        </div>
                    </InfoWindow>
                )}
            </Map>
    )
}

export const MainMap = GoogleApiWrapper({ apiKey })(MainMapContainer)
