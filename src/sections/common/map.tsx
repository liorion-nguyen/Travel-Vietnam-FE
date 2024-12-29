import React, { useState, useEffect } from 'react';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css'; 
import { MapContainer, TileLayer, Circle, useMapEvents } from 'react-leaflet';
import { Box, Button } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';

function ResizableCircle({ center, color }: { center: LatLngTuple; color: string }) {
    const map = useMapEvents({});
    const [radius, setRadius] = useState(500);

    useEffect(() => {
        const handleZoom = () => {
            const zoomLevel = map.getZoom();
            const newRadius = Math.max(500 / (zoomLevel / 2), 100);
            setRadius(newRadius);
        };

        map.on('zoom', handleZoom);
        handleZoom();

        return () => {
            map.off('zoom', handleZoom);
        };
    }, [map]);

    return (
        <Circle
            center={center}
            radius={radius}
            pathOptions={{ color: color, fillColor: color, fillOpacity: 0.4 }}
        />
    );
}

function MapEvents({ setMapInstance }: { setMapInstance: (map: any) => void }) {
    const map = useMapEvents({});
    useEffect(() => {
        setMapInstance(map);
    }, [map, setMapInstance]);

    return null;
}

export default function Maps({ destination }: { destination: LatLngTuple }) {
    const { t } = useTranslation();
    const [center, setCenter] = useState<LatLngTuple>([21.03029206227961, 105.76805458681068]);
    const [mapInstance, setMapInstance] = useState<any>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCenter([latitude, longitude]); // Update current position
            },
        );
    }, []);

    const handleFocusCurrentLocation = () => {
        if (mapInstance) {
            mapInstance.setView(center, 12); // Đặt lại vị trí tâm và mức zoom
        }
    };

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '600px',
                '.leaflet-bottom': {
                    display: 'none',
                },
            }}
        >
            <MapContainer
                center={center}
                zoom={12}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer
                    url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=c9R2t7djj3ThOMuQjEWU"
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                />
                <ResizableCircle center={center} color="orange" /> 
                <ResizableCircle center={destination} color="blue" />
                <MapEvents setMapInstance={setMapInstance} />
            </MapContainer>
            <Button
                variant="contained"
                color="inherit"
                onClick={handleFocusCurrentLocation}
                sx={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 1000,
                }}
                title={t(tokens.common.currentLocation)}
            >
                <MyLocationIcon />
            </Button>
        </Box>
    );
}