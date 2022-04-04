import React, { useRef, useEffect, useState } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import geojson from '../data/geojson.json';
import styles from './Map.module.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYmllZ2wiLCJhIjoiY2wxNHdhZDBvMHU5djNkcGR6djgwdHl5aSJ9.Zv3cstywn-xt5qbcifYlfw';

const Map = () => {
  const mapContainer = useRef(null);
  const map: any = useRef(null);
  const [lng, setLng] = useState(12.590121360621342);
  const [lat, setLat] = useState(47.80701831861277);
  const [zoom, setZoom] = useState(14);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/biegl/cl154dn03009t14m49jijiicj',
      center: [lng, lat],
      zoom,
    });

    map.current.scrollZoom.disable();

    geojson.features.forEach((marker) => {
      // Create a DOM element for each marker.
      const el = document.createElement('div');
      const width = marker.properties.iconSize[0];
      const height = marker.properties.iconSize[1];
      el.className = styles.marker || '';
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.backgroundImage = `url(${marker.properties.icon})`;

      el.addEventListener('click', () => {
        const { message, url, phone } = marker.properties;
        const text = [message, url, phone].join('\n');
        console.log(text);
      });

      const coords: any = marker.geometry.coordinates;
      // Add markers to the map.
      new mapboxgl.Marker(el).setLngLat(coords).addTo(map.current);
    });
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
