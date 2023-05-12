import { Marker } from "google-maps-react"

export function getPosition(string) {
    return {
        lat: string.split(", ")[0],
        lng: string.split(", ")[1],
    }
}

export function getMarker(position, icon) {
    return (
        <Marker
            position={getPosition(position)}
            icon={{
                url: icon,
            }}
        />
    )
}