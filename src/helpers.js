import { InfoWindow, Marker } from "google-maps-react"
import { useCallback, useState } from "react"

export function getPosition(string) {
    return {
        lat: string.split(", ")[0],
        lng: string.split(", ")[1],
    }
}

export function GetMarker(position, icon, label, onClick) {
    return (
        <Marker
            title="Test"
            label={label}
            position={getPosition(position)}
            icon={{
                url: icon,
            }}
            onClick={onClick}
        />
    )
}