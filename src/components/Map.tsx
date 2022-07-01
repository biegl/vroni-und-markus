import React, { useRef, useEffect, useState } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import geojson from '../data/geojson.json';
import styles from './Map.module.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYmllZ2wiLCJhIjoiY2wxNHdhZDBvMHU5djNkcGR6djgwdHl5aSJ9.Zv3cstywn-xt5qbcifYlfw';

const initialZoom =
  typeof window !== 'undefined' && window.document.body.clientWidth > 767
    ? 11
    : 10;

const initialLongitude = 12.704796;
const initialLatitude = 47.80159352358;

const Map = () => {
  const mapContainer = useRef(null);
  const map: any = useRef(null);
  const [lng, setLng] = useState(initialLongitude);
  const [lat, setLat] = useState(initialLatitude);
  const [zoom, setZoom] = useState(initialZoom);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/biegl/cl154dn03009t14m49jijiicj',
      center: [lng, lat],
      zoom,
      cooperativeGestures: true,
      locale: {
        'AttributionControl.ToggleAttribution': 'Toggle attribution',
        'AttributionControl.MapFeedback': '',
        'FullscreenControl.Enter': 'Gonz oder gor net',
        'FullscreenControl.Exit': 'Genui',
        'GeolocateControl.FindMyLocation': 'Wo geh i um?',
        'GeolocateControl.LocationNotAvailable': 'Do gibts nix',
        'LogoControl.Title': 'Bildl',
        'Map.Title': 'Kort',
        'NavigationControl.ResetBearing': 'Reset bearing to north',
        'NavigationControl.ZoomIn': 'Brauchsch a Brillen?',
        'NavigationControl.ZoomOut': 'Zinkn weg vom Bildschirm',
        'ScaleControl.Feet': 'ft',
        'ScaleControl.Meters': 'm',
        'ScaleControl.Kilometers': 'km',
        'ScaleControl.Miles': 'mi',
        'ScaleControl.NauticalMiles': 'nm',
        'ScrollZoomBlocker.CtrlMessage': '',
        'ScrollZoomBlocker.CmdMessage': '',
        'TouchPanBlocker.Message':
          'Verwenden sie 2 Finger um die Karte zu bewegen',
      },
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
        const url = marker.properties.booking || marker.properties.url;
        window.open(url);
        document.body.style.overflow = 'hidden';
      });

      el.addEventListener('mouseenter', () => {
        el.style.zIndex = '1';
      });

      el.addEventListener('mouseleave', () => {
        el.style.zIndex = '0';
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

  function resetMap() {
    map.current.setCenter([initialLongitude, initialLatitude]);
    map.current.setZoom(initialZoom);
    setLng(initialLongitude);
    setLat(initialLatitude);
    setZoom(initialZoom);
  }

  const needsResetButton =
    initialLatitude !== lat || initialLongitude !== lng || initialZoom !== zoom;

  return (
    <div>
      <div ref={mapContainer} className={styles.map_container}>
        {needsResetButton && (
          <button
            className="absolute top-3 right-3 z-10 px-3 text-white"
            onClick={resetMap}
          >
            Zurücksetzen
          </button>
        )}
      </div>
    </div>
  );
};

export default Map;
