import { useGeolocated } from "react-geolocated"
import {
    apiKey,
    baseUrl,
    locations,
    icons
} from '../constants'
import { useMemo } from "react"

function getMarker(location, icon) {
    return `anchor:center|icon:${icon}|size:small|${location}`
}

export const MapImage = ({ alpha }) => {
    const url = new URL(baseUrl)

    // Location
    const { coords } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: true,
            },
            userDecisionTimeout: 5000,
        });
    
    const location = useMemo(() => {
        if (coords != undefined && coords.latitude != undefined && coords.longitude != undefined) {
            return `${coords.latitude}, ${coords.longitude}`
        } else {
            return "50.82208780355824, -0.14893591378744991"
        }
    }, [coords])

    // url.searchParams.append("center", "50.82208780355824, -0.14893591378744991")
    url.searchParams.append("center", location)

    // Zoom
    url.searchParams.append("zoom", "14")
    url.searchParams.append("scale", "2")

    // Styles
    url.searchParams.append("style", "feature:poi|element:labels|visibility:off")
    url.searchParams.append("style", "feature:road|element:labels|visibility:off")
    url.searchParams.append("style", "feature:transit|visibility:off")
    url.searchParams.append("style", "feature:water|color:0x6f7c86")
    url.searchParams.append("style", "feature:poi.park|color:0x6E5F3B")
    url.searchParams.append("style", "feature:landscape.natural|color:0xA2924F")
    url.searchParams.append("style", "feature:landscape.man_made|color:0x77651D")
    url.searchParams.append("style", "feature:road.arterial|color:0xa49c6f")
    url.searchParams.append("style", "feature:road.highway|color:0xa49c6f")

    // Markers
    url.searchParams.append("markers", getMarker(locations.merryGoRound, icons.stableIcon))
    url.searchParams.append("markers", getMarker(locations.i360, icons.sheikahTowerIcon))
    url.searchParams.append("markers", getMarker(locations.stAnnsWellPark, icons.kokokIcon))
    url.searchParams.append("markers", getMarker(locations.home, icons.kokokIcon))

    // API key
    url.searchParams.append("key", apiKey)
    
    return <img src={url.toString()} opacity={alpha ?? 1} />
}
