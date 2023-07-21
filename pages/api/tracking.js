import { mongooseConnect } from '@/lib/mongoose';
import { Store } from '@/models/Store';



export default async function handler(req, res) {
  // Connect to the MongoDB database
  await mongooseConnect();

 
  const mode = req.body.mode;
  let matchConditions = [];
  // Define the MongoDB aggregation pipeline
  let pipeline = [];
  if (mode == 'single') {
    const medicines = req.body.medicines;
    matchConditions = medicines.map((medicine) => {
      return { $elemMatch: { name: medicine } }
    });
    pipeline = [
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [81.854464, 25.4738432],
          },
          distanceField: "distance",
          maxDistance: 3000,
          distanceMultiplier: 0.001,
          spherical: true,
        },
      },
      {
        $lookup: {
          from: "store_stock",
          localField: "name",
          foreignField: "store_name",
          as: "stock",
        },
      },
      {
        $match: {
          "stock.medicines": {
            $all: matchConditions,
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          location: 2,
          distance: 3,
        },
      },
    ];


    try {
      // Execute the MongoDB aggregation query
      const result = await Store.aggregate(pipeline).exec();

      // Return the result as the API response
      res.status(200).json(result);
    } catch (error) {
      console.error("Error executing MongoDB aggregation query:", error);
      res.status(500).json({ error: "Yeh hamari error hai" });
    }

  }
  else if (mode == 'double') {
    const medicines = req.body.medicines;
    matchConditions = medicines.map((medicine) => {
      return { "stock.medicines.name": medicine }
    });
    pipeline = [
      {
        $geoNear: {

          near: {
            type: "Point",
            coordinates: [81.854464, 25.4738432]
          },
          distanceField: "distance",
          maxDistance: 1000, // distance in meters (3 km = 3000 meters)
          // distanceMultiplier: 0.001,
          spherical: true
        }
      },
      {
        $lookup: {
          from: "store_stock",
          localField: "name",
          foreignField: "store_name",
          as: "stock"
        }
      },
      {
        $match: {
          $or: matchConditions,
        }
      },
      {
        $sort: {
          "pair.store1": 1,
          "pair.store2": 1
        }
      },
      {
        $group: {
          _id: null,
          stores: { $push: "$name" }
        }
      },
      {
        $project: {
          _id: 0,
          pairs: {
            $reduce: {
              input: "$stores",
              initialValue: [],
              in: {
                $concatArrays: [
                  "$$value",
                  {
                    $map: {
                      input: "$stores",
                      as: "store1",
                      in: {
                        $map: {
                          input: "$stores",
                          as: "store2",
                          in: {
                            $cond: [
                              { $ne: ["$$store1", "$$store2"] },
                              {
                                store1: "$$store1",
                                store2: "$$store2"
                              },
                              null
                            ]
                          }
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        $unwind: "$pairs"
      },
      {
        $project: {
          pair: {
            $filter: {
              input: "$pairs",
              cond: {
                $and: [
                  { $ne: ["$$this.store1", null] },
                  { $ne: ["$$this.store2", null] }
                ]
              }
            }
          }
        }
      },
      {
        $unwind: "$pair"
      },
      // {
      //   $limit: 
      // }
      // {
      //   $project: {
      //     // _id: 0,
      //     store1: "$pair.store1",
      //     store2: "$pair.store2"
      //   }
      // }
    ];

    try {
      // Execute the MongoDB aggregation query
      const result = await Store.aggregate(pipeline).exec();

      // Return the result as the API response
      res.status(200).json(result);
    } catch (error) {
      console.error("Error executing MongoDB aggregation query:", error);
      res.status(500).json({ error: "Yeh hamari error hai" });
    }
  }

  else if (mode == 'getCoordinates') {
   
    
      const names= req.body.names;

      try {
       console.log("This is the names received in backend")
        console.log(names);
        const stores = await Store.find({ name: { $in: names } }, { _id: 0, name: 1, 'location.coordinates': 1 }).lean();
        console.log("This is the stores retrieved from database")
        console.log(stores)
        console.log(stores[0].location.coordinates)

        const result = {};
        stores.forEach((store) => {
          result[store.name] = store.location.coordinates;
        });

        res.status(200).json(result);
      } catch (error) {
        console.error("Error retrieving stores:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    

  }


}