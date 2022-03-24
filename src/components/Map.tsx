import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styles from './Map.module.css';
import geojson from '../data/geojson.json';

mapboxgl.accessToken =
    'pk.eyJ1IjoiYmllZ2wiLCJhIjoiY2wxNHdhZDBvMHU5djNkcGR6djgwdHl5aSJ9.Zv3cstywn-xt5qbcifYlfw';

const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(12.590121360621342);
    const [lat, setLat] = useState(47.80701831861277);
    const [zoom, setZoom] = useState(14);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/biegl/cl154dn03009t14m49jijiicj',
            center: [lng, lat],
            zoom: zoom,
        });

        map.current.scrollZoom.disable();

        for (const marker of geojson.features) {
            // Create a DOM element for each marker.
            const el = document.createElement('div');
            const width = marker.properties.iconSize[0];
            const height = marker.properties.iconSize[1];
            el.className = 'marker';
            el.style.backgroundColor = 'white';
            el.style.backgroundPosition = 'center';
            el.style.backgroundRepeat = 'no-repeat';
            el.style.backgroundImage = 'url(' + marker.properties.icon + ')';
            el.style.borderRadius = '50%';
            el.style.border = '3px solid #fff';
            el.style.boxShadow = '0 0 10px rgba(0,0,0,0.25)';
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
            el.style.backgroundSize = '100%';

            el.addEventListener('click', () => {
                const { message, url, phone } = marker.properties;
                const text = [message, url, phone].join('\n');
                window.alert(text);
            });

            // Add markers to the map.
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .addTo(map.current);
        }
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            if (!map) return;
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <div>
            <div ref={mapContainer} className={styles.map_container} />
        </div>
    );
};

export default Map;
