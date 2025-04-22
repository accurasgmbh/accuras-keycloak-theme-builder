import {useEffect, useRef} from "react";
import mapboxgl from "mapbox-gl";


export const MapBackground = () => {

    const mapRef = useRef<mapboxgl.Map>()
    const mapContainerRef = useRef<any>()

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWVmZnRpbmciLCJhIjoiY2p2cW5ob2NuMGxtZTRhbzhvcjRoOHM5bCJ9.zYJDfnLbN7vP0eDihT9pOQ'
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/aeffting/cm9n3qvue001v01qr5r9i5uj5",
            center: [11.577329, 48.137586],
            zoom: 16,
        });

        return () => {
            mapRef.current?.remove()
        }
    }, [])

    return <div
        id={"map-container"}
        ref={mapContainerRef}
        style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
            zIndex: -5
        }}/>
}