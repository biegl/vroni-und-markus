import React, { useRef, useEffect, useState } from 'react';

import ActionSheet, { ActionSheetRef } from 'actionsheet-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import geojson from '../data/geojson.json';
import styles from './Map.module.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYmllZ2wiLCJhIjoiY2wxNHdhZDBvMHU5djNkcGR6djgwdHl5aSJ9.Zv3cstywn-xt5qbcifYlfw';

const style = {
  content: {
    maxWidth: '400px',
  },
};

const initialZoom =
  typeof window !== 'undefined' && window.document.body.clientWidth > 767
    ? 14
    : 13;

const initialLongitude = 12.590121360621342;
const initialLatitude = 47.80701831861277;

function openMaps(coordinates: any) {
  const isIOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/i);
  const protocol = isIOS ? 'maps' : 'https';

  window.open(
    `${protocol}://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${coordinates[1]},${coordinates[0]}`
  );
}

const Map = () => {
  const actionSheet = useRef<ActionSheetRef>();
  const mapContainer = useRef(null);
  const map: any = useRef(null);
  const [lng, setLng] = useState(initialLongitude);
  const [lat, setLat] = useState(initialLatitude);
  const [zoom, setZoom] = useState(initialZoom);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);

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
        setSelectedMarker(marker);
        actionSheet.current?.open();
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
    setSelectedMarker(null);
    setZoom(initialZoom);
  }

  function handleActionSheetClosing() {
    document.body.style.overflow = 'auto';
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
      <ActionSheet
        ref={actionSheet}
        touchEnable={false}
        mouseEnable={false}
        sheetTransition="transform 0.3s ease-in-out 0s"
        onClose={handleActionSheetClosing}
        sheetStyle={{
          display: 'flex',
          justifyContent: 'center',
          maxHeight: '80vh',
        }}
      >
        <button
          className="absolute right-5 top-3 h-10 w-10 text-center"
          onClick={() => {
            actionSheet.current?.close();
            handleActionSheetClosing();
          }}
          title="Schließen"
        >
          x
        </button>
        {selectedMarker && (
          <div className="p-5" style={style.content}>
            <div className="flex">
              <img
                src={selectedMarker.properties.icon}
                className="bc-gold mr-3 h-14 w-14 rounded-full border-4"
                alt="Icon"
              />
              <h3>{selectedMarker.properties.message}</h3>
            </div>
            <div className="mt-3">
              {selectedMarker.properties.url && (
                <div>
                  Website:{' '}
                  <a
                    href={selectedMarker.properties.url}
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    {selectedMarker.properties.url}
                  </a>
                </div>
              )}
              {selectedMarker.properties.phone && (
                <div>
                  Telefon:{' '}
                  <a
                    href={`tel:${selectedMarker.properties.phone}`}
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    {selectedMarker.properties.phone}
                  </a>
                </div>
              )}
              {selectedMarker.geometry.coordinates && (
                <div className="mt-5 flex justify-center">
                  <button
                    className="bg-gold mr-2 mb-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
                    onClick={() => {
                      openMaps(selectedMarker.geometry.coordinates);
                    }}
                  >
                    Maps öffnen
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </ActionSheet>
    </div>
  );
};

export default Map;
