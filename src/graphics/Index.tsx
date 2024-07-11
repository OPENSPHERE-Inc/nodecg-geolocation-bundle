import Leaflet, { LatLng } from "leaflet";
import moment from "moment";
import React, { useEffect } from 'react';
import "./index.scss";
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useAsset } from "../components/Asset";
import { useReplicant } from "../components/Replicant";
import { GeolocationReplicant } from "../types/schemas";


const MapComponent = ({ value }: { value?: GeolocationReplicant}) => {
	const map = useMap();

	useEffect(() => {
		if (!value?.position) {
			return;
		}
		map.setView(new LatLng(value.position[0], value.position[1]));
	}, [value?.position]);

	return null;
};


export function Index() {
	const { value } = useReplicant();
	const { value: markers } = useAsset();

	return value ? (
		<section className="section">
			<div className="container">
				<div className="content">
					<div className="stream-overlay">
						<MapContainer
							center={ new LatLng(value.position?.[0] ?? 0,  value.position?.[1] ?? 0) }
							zoom={ 15 }
							scrollWheelZoom={ false }
							zoomControl={ false }
						>
							<MapComponent value={ value }/>
							<TileLayer
								attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>

							{ markers?.[0] ? <Marker
								position={ new LatLng(value.position?.[0] ?? 0,  value.position?.[1] ?? 0) }
								icon={ Leaflet.icon({
									iconUrl: markers[0].url,
									iconSize: [ 48, 48 ],
									iconAnchor: [ 24, 24 ],
									className: "marker-icon"
								} )}
							/> : null }
						</MapContainer>

						<div className="timestamp">
							<span className="is-size-1 has-text-white">
								{ moment(value.timestamp).format("YYYY/MM/DD HH:mm") }
							</span>
						</div>

						<div className="address">
							<span className="is-size-2 has-text-white">{ value.address }</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	) : null;
}
