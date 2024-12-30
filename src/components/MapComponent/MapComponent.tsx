import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  Lon: number;
  Lat: number;
};

const MapComponent = ({ Lon, Lat }: Props) => {
  const position: [number, number] = [Lat, Lon];

  const ChangeView = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center);
    }, [center, map]);
    return null;
  };

  return (
    <MapContainer center={position} zoom={5} style={{ height: "100%", width: "100%" }}>
      <ChangeView center={position} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default MapComponent;