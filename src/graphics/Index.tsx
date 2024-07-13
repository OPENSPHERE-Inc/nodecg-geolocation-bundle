import Leaflet, { LatLng } from "leaflet";
import moment from "moment";
import React, { useEffect } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { useGeolocationReplicant } from "../hooks/GeolocationReplicant";
import { useMarkerAsset } from "../hooks/MarkerAsset";
import { GeolocationReplicant } from "../types/schemas";
import "./index.scss";
import "leaflet/dist/leaflet.css";


const MapComponent = ({ geolocation }: { geolocation: GeolocationReplicant }) => {
    const map = useMap();
    const { markers } = useMarkerAsset();

    useEffect(() => {
        if (!geolocation.position) {
            return;
        }
        map.setView(new LatLng(geolocation.position[0], geolocation.position[1]));
    }, [ geolocation.position ]);

    return (<>
        <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        { markers?.[0] ? <Marker
            position={ new LatLng(geolocation.position?.[0] ?? 0, geolocation.position?.[1] ?? 0) }
            icon={ Leaflet.icon({
                iconUrl: markers[0].url,
                iconSize: [ 48, 48 ],
                iconAnchor: [ 24, 24 ],
                className: "marker-icon"
            }) }
        /> : null }
    </>);
};

export const Index = () => {
    const { geolocation } = useGeolocationReplicant();

    return geolocation ? (
        <section className="section">
            <div className="container">
                <div className="content">
                    <div className="stream-overlay">
                        <MapContainer
                            center={ new LatLng(
                                geolocation.position?.[0] ?? 0,
                                geolocation.position?.[1] ?? 0
                            ) }
                            zoom={ 15 }
                            scrollWheelZoom={ false }
                            zoomControl={ false }
                        >
                            <MapComponent geolocation={ geolocation }/>
                        </MapContainer>

                        <div className="timestamp">
							<span className="is-size-1 has-text-white">
								{ moment(geolocation.timestamp).format("YYYY/MM/DD HH:mm") }
							</span>
                        </div>

                        <div className="address">
                            <span className="is-size-2 has-text-white">{ geolocation.address }</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    ) : null;
};
