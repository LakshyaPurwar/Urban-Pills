import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf'
import 'mapbox-gl/dist/mapbox-gl.css';
import styled from "styled-components";

const StyledMap = styled.div`
height:35rem;
width:50rem;
border : 5px solid #9162fc;
border-radius : 2rem;
`;
const Map = ({pickupCoordinates , deliveryBoyCoordinates=[81.862959, 25.461255]}) => {
    const mapContainer = useRef(null);
    useEffect(() => {

        mapboxgl.accessToken = 'pk.eyJ1IjoibGFrc2h5YS1wdXJ3YXIiLCJhIjoiY2xqZmw0MDBmMDI5ODNlb2RuN2VyNGVrdSJ9.pUyXi1Rv7R0nO3NC6nOvZA';

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/lakshya-purwar/cljr0ljc1010o01p58vacfe10', // or any other Mapbox style URL
            center: [81.8552089, 25.4720811], // coordinates of the map center
            zoom: 14, // initial zoom level
        });

        const errorCallback = (error) => {
            console.log(error);
        };

        const successCallback = (position) => {
            console.log("Setting up the marker right now ! ")
            console.log(position.coords.longitude + " " + position.coords.latitude)
            localStorage.setItem("lat", position.coords.latitude + "");
            localStorage.setItem("long", position.coords.longitude);
            const markerElement = document.createElement('div');
            markerElement.className = 'custom-marker';
            markerElement.style.backgroundColor = '#00FFFF';
            markerElement.style.width = '20px';
            markerElement.style.height = '20px';
            markerElement.style.borderRadius = '100%';
            markerElement.style.border = "2px solid gray";

            const marker = new mapboxgl.Marker(markerElement)
                .setLngLat([position.coords.longitude, position.coords.latitude])
                .addTo(map);

            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>Mera Ghar</h3>');
            marker.setPopup(popup);
        };


        map.on('load', async () => {
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

            // const deliveryBoyCoordinates = [81.862959, 25.461255];
            const pickupStoreCoordinates = [...pickupCoordinates];
            let pickupCoordinatesString = pickupStoreCoordinates[0][0]+","+pickupStoreCoordinates[0][1];
            if(pickupStoreCoordinates.length==2)
            {
                pickupCoordinatesString += ";" + pickupStoreCoordinates[1][0]+","+pickupStoreCoordinates[1][1];
            }
            const destinationCoordinates = [81.854464, 25.4738432];

            // Convert coordinates to GeoJSON format
            // const deliveryBoyPoint = turf.point(deliveryBoyCoordinates);
            // const pickupStorePoints = pickupStoreCoordinates.map(coord => turf.point(coord));
            // const destinationPoint = turf.point(destinationCoordinates);

            // Create feature collections
            // const pickups = turf.featureCollection(pickupStorePoints);

            // Create a feature collection with the delivery boy, pickup stores, and destination
            // const features = turf.featureCollection([
            //     turf.feature(deliveryBoyPoint),
            //     pickups,
            //     turf.feature(destinationPoint)
            // ]);
            // const coordinates = features.features.map(feature => {
            //     if (feature.geometry && feature.geometry.type === 'Point') {
            //         return feature.geometry.coordinates;
            //     } else {
            //         //   throw new Error('Invalid geometry type');
            //     }
            // }).join(';');
            // console.log(coordinates)
            const longitude = localStorage.getItem("long");
            const latitude = localStorage.getItem("lat")
            const deliveryBoyCoordinatesString = deliveryBoyCoordinates[0] + "," + deliveryBoyCoordinates[1]+";";
            const optimizationRequest = await fetch(
                "https://api.mapbox.com/optimized-trips/v1/mapbox/driving/"+deliveryBoyCoordinatesString+pickupCoordinatesString+";" + longitude + "," + latitude + "?overview=full&steps=true&geometries=geojson&roundtrip=false&source=first&destination=last&access_token=pk.eyJ1IjoibGFrc2h5YS1wdXJ3YXIiLCJhIjoiY2xqOXB2cGpvMDBnOTNlcWhvMjlhejZ1cCJ9.r8ts-mjB_CxveuRbhnMhaQ"
            );
            const optimizationData = await optimizationRequest.json();
            console.log(optimizationData)
            const optimizedRoute = optimizationData?.trips[0]?.geometry;

            // Add the optimized route to the map
            map.addLayer({
                id: 'optimized-route',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        geometry: optimizedRoute
                    }
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#CC00FF',
                    'line-width': 2
                }
            });
            map.addLayer(
                {
                    id: 'routearrows',
                    type: 'symbol',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            geometry: optimizedRoute
                        }
                    },
                    layout: {
                        'symbol-placement': 'line',
                        'text-field': '▶',
                        'text-size': ['interpolate', ['linear'], ['zoom'], 12, 24, 22, 60],
                        'symbol-spacing': ['interpolate', ['linear'], ['zoom'], 12, 30, 22, 160],
                        'text-keep-upright': false
                    },
                    paint: {
                        // 'text-color': '#00ff00',
                        'text-halo-color': '#b8005c',
                        'text-halo-width': 2
                    }
                },
                'waterway-label'
            );

            const customMarker = document.createElement('div');
            customMarker.style.backgroundImage = 'url(/motorcycle.png)';
            customMarker.style.width = '30px';
            customMarker.style.height = '30px';

            const deliveryBoyMarker = new mapboxgl.Marker(customMarker)
                .setLngLat(deliveryBoyCoordinates)
                .addTo(map);
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>Mera Delivery boy</h3>');
            deliveryBoyMarker.setPopup(popup);


            pickupStoreCoordinates.forEach(coord => {
                const customStoreMarker = document.createElement('div');
                customStoreMarker.style.backgroundImage = 'url(/location.png)';
                customStoreMarker.style.width = '30px';
                customStoreMarker.style.height = '30px';

                new mapboxgl.Marker(customStoreMarker)
                    .setLngLat(coord)
                    .addTo(map);
            });

            // const bounds = turf.bbox(features);
            // map.fitBounds(bounds, { padding: 50 });
        });







        // });

        return () => map.remove();
    }, []);

    return <StyledMap ref={mapContainer} />;
};

export default Map;
