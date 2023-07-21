import React, { useEffect, useState } from 'react'
import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import Title from "@/components/Title";
import Map from '@/components/Map';
import axios from 'axios';
import { compiler } from '@/next.config';

const closestDriver = async (coordinates) => {
  return new Promise((resolve, reject) => {
    axios.post('/api/getDriver', { longitude: coordinates[0], latitude: coordinates[1], radius: 1000 })
      .then(async (response) => {
        console.log("This is the response of driver api received in the front")
        console.log(response)
        const drivers = response.data;
        let coordinatesString = "";
        let sourcesIndicesString = "";
        drivers.forEach((driver, index) => {
          coordinatesString += driver.coordinates[0] + "," + driver.coordinates[1] + ';';
          sourcesIndicesString += index + ";";
        });
        let destination = drivers.length;

        try {
          const matrixResponse = await axios.get('https://api.mapbox.com/directions-matrix/v1/mapbox/driving/' + coordinatesString + coordinates[0] + ',' + coordinates[1] + '?sources=' + sourcesIndicesString.substring(0, sourcesIndicesString.length - 1) + '&destinations=' + destination + '&annotations=distance,duration&access_token=pk.eyJ1IjoibGFrc2h5YS1wdXJ3YXIiLCJhIjoiY2xqOXB2cGpvMDBnOTNlcWhvMjlhejZ1cCJ9.r8ts-mjB_CxveuRbhnMhaQ');
          console.log("Response of the matrix api for driver positions")
          console.log(matrixResponse)
          const durations = matrixResponse.data.durations;
          let minDuration = durations[0][0];
          let minDurationDriver = drivers[0];
          durations.forEach((duration, index) => {
            if (duration[0] < minDuration) {
              minDuration = duration[0];
              minDurationDriver = drivers[index];
            }
          });
          console.log(minDurationDriver)
          console.log(" is the min duration driver!")
          resolve({
            driver: minDurationDriver,
            duration: minDuration
          });
        } catch (error) {
          console.log("Error fetching matrix for drivers: " + error);
          reject(error);
        }
      })
      .catch((error) => {
        console.log("There is an error retrieving the closest driver in front: " + error);
        reject(error);
      });
  });
};


const tracking = () => {
  const orderedItems = JSON.parse(localStorage.getItem("orderedItems"));
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [pickupCoordinates, setPickupCoordinates] = useState(null);
  const [deliveryBoyCoordinates, setDeliveryBoyCoordinates] = useState(null);
  useEffect(() => {
    if (orderedItems.length > 0) {
      axios.post('/api/cart', { ids: orderedItems })
        .then(response => {
          const medicineNames = response.data.map((singleProduct) => {
            return singleProduct.title;
          });
          setOrderedProducts(medicineNames);
          console.log(medicineNames)


        })
    } else {
      setOrderedProducts([]);
    }
  }, []);

  useEffect(() => {
    if (orderedProducts.length > 0) {

      axios.post('/api/tracking', { medicines: orderedProducts, mode: 'single' })
        .then((response) => {
          console.log("This is the data received in the tracking page from api")
          console.log(response)
          const stores = response.data;
          const availableCoordinates = response.data.map((store) => {
            return store.location.coordinates;
          });
          if (availableCoordinates.length > 0) {

            let combinedCoordinatesString = "";
            let sources = "";
            let i = 0;
            const availableCoordinatesString = availableCoordinates.map((coordinate) => {
              combinedCoordinatesString = combinedCoordinatesString + (coordinate[0] + "," + coordinate[1]) + ";";
              sources = sources + (i + ";");
              i++;
              return coordinate[0] + "," + coordinate[1];
            });






            axios.get('https://api.mapbox.com/directions-matrix/v1/mapbox/driving-traffic/' + combinedCoordinatesString + '81.854464,25.4738432?sources=' + sources.substring(0, sources.length - 1) + '&destinations=' + i + '&annotations=distance,duration&access_token=pk.eyJ1IjoibGFrc2h5YS1wdXJ3YXIiLCJhIjoiY2xqOXB2cGpvMDBnOTNlcWhvMjlhejZ1cCJ9.r8ts-mjB_CxveuRbhnMhaQ')
              .then((response) => {
                console.log(response.data)
                const durations = response.data.durations;
                const indexDurationMap = durations.map((duration, index) => {
                  return {
                    duration: duration[0] / 60.0,
                    index: index
                  };
                });

                const closestDriverPromises = stores.map((store, index) => {
                  return closestDriver(store.location.coordinates);
                });
                Promise.all(closestDriverPromises).then((closestDrivers) => {
                  let minCombinedDuration = Infinity;
                  let minCombinedStore = "Not yet found ! "
                  let selectedStoreDriver = { name: "Not decided yet", coordinates: [0, 0] };
                  closestDrivers.forEach((closestDriver, index) => {
                    const currentDuration = closestDriver.duration + durations[index][0];
                    const currentDriverName = closestDriver.driver.name;
                    if (currentDuration < minCombinedDuration) {
                      minCombinedDuration = currentDuration;
                      minCombinedStore = stores[index];
                      selectedStoreDriver = closestDriver.driver;
                    }

                    console.log("This is the final decided result in order of store and driver")
                    console.log(minCombinedStore);
                    console.log(selectedStoreDriver);
                    console.log(minCombinedDuration)
                    setPickupCoordinates([minCombinedStore.location.coordinates]);
                    setDeliveryBoyCoordinates(selectedStoreDriver.coordinates);


                  });
                })

                // indexDurationMap.sort((a, b) => (a.duration - b.duration));
                // console.log("Finally! , this has been found")
                // console.log(minCombinedStore)
                // console.log(minCombinedDuration)



              })
              .catch(e => (console.log("Matrix gave some error")))


          }
          else {

            axios.post('/api/tracking', { medicines: orderedProducts, mode: 'double' })
              .then((response) => {
                console.log("This is the data received in the tracking page from api in double mode")
                console.log(response)
                let uniqueStorePairs = {};
                let storePairs = [];
                response.data.forEach((pair)=>{
                  pair = pair.pair;
                  if(pair!=null)
                  {
                    console.log("Inside for each")
                    console.log(pair)
                     let store1 = pair.store1;
                     let store2 = pair.store2;
                     const key1 = store1+" "+store2;
                     const key2 = store2 + " " + store1;
                     if(!uniqueStorePairs.hasOwnProperty(key1) && !uniqueStorePairs.hasOwnProperty(key2))
                     {
                      console.log("pushing it")
                        uniqueStorePairs[key1] = 1;
                        uniqueStorePairs[key2] = 1;
                        storePairs.push(pair);

                     }
                  }
                });
                let storesArray = [];
                let storeIndexMap = {};
                let storeIndex = 0;
                for (let i = 1; i < response.data.length - 1; i++) {

                  let pair = response.data[i].pair;
                  if (pair == null) {
                    continue;
                  }
                  // console.log(pair)
                  let store1 = pair.store1;
                  let store2 = pair.store2;
                  if (!storeIndexMap.hasOwnProperty(store1)) {
                    storeIndexMap[store1] = storeIndex++;
                    storesArray.push(store1);
                  }
                  if (!storeIndexMap.hasOwnProperty(store2)) {
                    storeIndexMap[store2] = storeIndex++;
                    storesArray.push(store2);
                  }
                }
                let storeCoordinates = {};
                console.log("This is the stores array in frontend")
                console.log(storesArray)

                axios.post('/api/tracking', { names: storesArray, mode: 'getCoordinates' })
                  .then(
                    (response) => {
                      console.log("Response in getCoordinates mode")
                      console.log(response)
                      storeCoordinates = response.data;

                      let coordinateString = '';

                      storesArray.forEach((storeName) => {
                        let coords = storeCoordinates[storeName];
                        coordinateString = coordinateString + coords[0] + "," + coords[1] + ";";
                      });
                      console.log(coordinateString);
                      console.log("Calling the multipoint matrix api here : ")
                      axios.get('https://api.mapbox.com/directions-matrix/v1/mapbox/driving/' + coordinateString + '81.854464,25.4738432?annotations=distance,duration&access_token=pk.eyJ1IjoibGFrc2h5YS1wdXJ3YXIiLCJhIjoiY2xqOXB2cGpvMDBnOTNlcWhvMjlhejZ1cCJ9.r8ts-mjB_CxveuRbhnMhaQ')
                        .then((response) => {
                          console.log(response.data)
                          const adjacencyMatrix = response.data.durations;
                          let pairDurations = [];
                          console.log("This is the storePairs object that we are counting on")
                          console.log(storePairs)
                          console.log("This is the adjacency matrix")
                          console.log(adjacencyMatrix)
                          //At this point , we have our durations matrix :
                          let storeClosestDriverMap = {};
                          const closestDriverPromises = storesArray.map((storeName, index) => {
                            return closestDriver(storeCoordinates[storeName]);
                          });
                          Promise.all(closestDriverPromises).then((closestDrivers) => {
                            closestDrivers.map((driver, index) => {
                              storeClosestDriverMap[storesArray[index]] = driver;
                            });

                            //Once the duration of the closest driver and duration of all stores have
                            //been revealed , then we go out hunting for the best combination.
                            for (let i = 1; i < storePairs.length - 1; i++) {
                              const pair = storePairs[i];
                              if (pair == null) {
                                continue;
                              }
                              console.log(i+ " pair to push")
                              console.log(pair)
                              const a = pair.store1;
                              const b = pair.store2;
                              const index_a = storeIndexMap[a];
                              const index_b = storeIndexMap[b];
                              const destinationIndex = adjacencyMatrix.length - 1;
                              const duration_a_b = adjacencyMatrix[index_a][index_b];
                              const duration_b_a = adjacencyMatrix[index_b][index_a];
                              const duration_a_d = adjacencyMatrix[index_a][destinationIndex];
                              const duration_b_d = adjacencyMatrix[index_b][destinationIndex];
                              const driver_a = storeClosestDriverMap[a];
                              const driver_b = storeClosestDriverMap[b];

                              const path1 = driver_a.duration + duration_a_b + duration_b_d;
                              const path2 = driver_b.duration + duration_b_a + duration_a_d;
                              const minTime = Math.min(path1, path2);
                              pairDurations.push(
                                {
                                  store1: {
                                    name: a,
                                    location: storeCoordinates[a]
                                  },
                                  store2: {
                                    name: b,
                                    location: storeCoordinates[b]
                                  },
                                  driver: path1 < path2 ? driver_a : driver_b,
                                  bestTime: minTime
                                }
                              );
                            }

                            console.log("This is the pair duration array  before sorting for every pair!")
                            console.log(pairDurations)
                            pairDurations.sort((a, b) => {
                              return a.bestTime - b.bestTime;
                            });
                            console.log("This is the pair duration array !")
                            console.log(pairDurations)
                            console.log("This is the best store combination that we have found ! ")
                            console.log(pairDurations[0]);
                            //Sorted Pairs duration is here
                            console.log("The final answer to the double mode")
                            console.log(pairDurations[1])
                            setPickupCoordinates([pairDurations[0].store2.location, pairDurations[0].store1.location]);
                            setDeliveryBoyCoordinates(pairDurations[0].driver.driver.coordinates);



                          });







                          // indexDurationMap.sort((a, b) => (a.duration - b.duration));
                          // setPickupCoordinates(availableCoordinates[indexDurationMap[0].index]);
                        })
                        .catch(e => (console.log("Matrix gave some error ,but why ? " + e)))



                    }
                  )
                  .catch(error => console.log("Could not retrieve coordinates  : " + error))




              })
              .catch(error => {
                // Handle any errors

                console.error(error);
              });

            // fetch('/api/tracking' , {

            // })
            //   .then(response => response.json())
            //   .then(data => {
            //     // Handle the response data
            //     console.log("Trying to get the data from teh geolocation apoi")
            //     console.log(data);
            //     setPickupCoordinates(data[0].location.coordinates);
            //   })

          }
        })
    }


  }, [orderedProducts]);


  console.log("Ordered Items received in the Map")
  console.log(orderedItems)
  return (
    <>
      <Header />
      <Center>
        <Title>Order Tracking</Title>
        {pickupCoordinates ? <Map pickupCoordinates={pickupCoordinates} deliveryBoyCoordinates={deliveryBoyCoordinates} /> : <div><img src='map_search.gif' /></div>}
      </Center>
    </>
  )
}

export default tracking