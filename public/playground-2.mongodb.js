/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'upstores';
const collection = 'stores';

// Create a new database.
use(database);
// Create a new collection.
db.createCollection('stores');
db.stores.insertMany([
    {
        name: "UP1",
        location: {
            type: "Point",
            coordinates: [81.82986472209274, 25.453120571911654]
        }
    },
    {
        name: "UP2",
        location: {
            type: "Point",
            coordinates: [81.83584085984211, 25.456434173737122]
        }
    },
    {
        name: "UP3",
        location: {
            type: "Point",
            coordinates: [81.83314738930642, 25.460066870909003]
        }
    },
    {
        name: "UP4",
        location: {
            type: "Point",
            coordinates: [81.83062226068051, 25.45844053050169]
        }
    },
    {
        name: "UP5",
        location: {
            type: "Point",
            coordinates: [81.84617228518704, 25.457048534662974]
        }
    },
    {
        name: "UP6",
        location: {
            type: "Point",
            coordinates: [81.84158840637821, 25.4613090089927]
        }
    },
    {
        name: "UP7",
        location: {
            type: "Point",
            coordinates: [81.8434291147388, 25.452096729412034]
        }
    },
    {
        name: "UP8",
        location: {
            type: "Point",
            coordinates: [81.84501724358631, 25.45745018368511]
        }
    },
    {
        name: "UP9",
        location: {
            type: "Point",
            coordinates: [81.8468435835481, 25.463926587277385]
        }
    },
    {
        name: "UP10",
        location: {
            type: "Point",
            coordinates: [81.84088810036809, 25.46612514011167]
        }
    },
    {
        name: "UP11",
        location: {
            type: "Point",
            coordinates: [81.85197853395658, 25.465408218899213]
        }
    },
    {
        name: "UP12",
        location: {
            type: "Point",
            coordinates: [81.8514491576729, 25.4674155701003]
        }
    },
    {
        name: "UP13",
        location: {
            type: "Point",
            coordinates: [81.84668330997573, 25.47245769471725]
        }
    },
    {
        name: "UP14",
        location: {
            type: "Point",
            coordinates: [81.85216235450116, 25.473150671995484]
        }
    },
    {
        name: "UP15",
        location: {
            type: "Point",
            coordinates: [81.85705908277578, 25.474918939297694]
        }
    },
    {
        name: "UP16",
        location: {
            type: "Point",
            coordinates: [81.85393576270803, 25.477212870828453]
        }
    },
    {
        name: "UP17",
        location: {
            type: "Point",
            coordinates: [81.85639736242206, 25.476567707008783]
        }
    },
    {
        name: "UP18",
        location: {
            type: "Point",
            coordinates: [81.85041541042841, 25.47790582070573]
        }
    }
]);

use('upstores');
db.stores.createIndex({ location: "2dsphere" });
db.createCollection('store_stock');
db.store_stock.insertMany([
    {
        store_name: "UP1",
        medicines: [
            { name: "Paracetamol", quantity: 7, price: 12 },
            { name: "Aspirin", quantity: 3, price: 15 },
            { name: "Ibuprofen", quantity: 6, price: 10 },
            { name: "Loratadine", quantity: 2, price: 18 },
            { name: "Omeprazole", quantity: 5, price: 20 },
            { name: "Metformin", quantity: 9, price: 16 },
            { name: "Simvastatin", quantity: 7, price: 22 },
            { name: "Amoxicillin", quantity: 4, price: 25 },
            { name: "Prednisone", quantity: 1, price: 8 },
            { name: "Atorvastatin", quantity: 10, price: 30 }
        ]
    },
    {
        store_name: "UP2",
        medicines: [
            { name: "Cetirizine", quantity: 8, price: 14 },
            { name: "Diazepam", quantity: 5, price: 13 },
            { name: "Metoprolol", quantity: 4, price: 11 },
            { name: "Ranitidine", quantity: 9, price: 17 },
            { name: "Fluoxetine", quantity: 3, price: 21 },
            { name: "Amlodipine", quantity: 6, price: 19 },
            { name: "Warfarin", quantity: 2, price: 23 },
            { name: "Ciprofloxacin", quantity: 7, price: 26 },
            { name: "Metronidazole", quantity: 10, price: 9 },
            { name: "Tramadol", quantity: 1, price: 31 }
        ]
    },
    {
        store_name: "UP3",
        medicines: [
            { name: "Paracetamol", quantity: 9, price: 15 },
            { name: "Aspirin", quantity: 2, price: 13 },
            { name: "Ibuprofen", quantity: 7, price: 11 },
            { name: "Loratadine", quantity: 3, price: 17 },
            { name: "Omeprazole", quantity: 8, price: 21 },
            { name: "Metformin", quantity: 4, price: 19 },
            { name: "Simvastatin", quantity: 6, price: 23 },
            { name: "Amoxicillin", quantity: 1, price: 26 },
            { name: "Prednisone", quantity: 10, price: 9 },
            { name: "Atorvastatin", quantity: 5, price: 31 }
        ]
    },
    {
        store_name: "UP4",
        medicines: [
            { name: "Cetirizine", quantity: 6, price: 16 },
            { name: "Diazepam", quantity: 9, price: 14 },
            { name: "Metoprolol", quantity: 1, price: 12 },
            { name: "Ranitidine", quantity: 4, price: 18 },
            { name: "Fluoxetine", quantity: 10, price: 22 },
            { name: "Amlodipine", quantity: 2, price: 20 },
            { name: "Warfarin", quantity: 3, price: 24 },
            { name: "Ciprofloxacin", quantity: 5, price: 27 },
            { name: "Metronidazole", quantity: 8, price: 10 },
            { name: "Tramadol", quantity: 7, price: 32 }
        ]
    },
    {
        store_name: "UP5",
        medicines: [
            { name: "Paracetamol", quantity: 4, price: 17 },
            { name: "Aspirin", quantity: 1, price: 15 },
            { name: "Ibuprofen", quantity: 8, price: 13 },
            { name: "Loratadine", quantity: 10, price: 19 },
            { name: "Omeprazole", quantity: 2, price: 23 },
            { name: "Metformin", quantity: 3, price: 21 },
            { name: "Simvastatin", quantity: 5, price: 25 },
            { name: "Amoxicillin", quantity: 7, price: 28 },
            { name: "Prednisone", quantity: 6, price: 11 },
            { name: "Atorvastatin", quantity: 9, price: 33 }
        ]
    },
    {
        store_name: "UP6",
        medicines: [
            { name: "Cetirizine", quantity: 3, price: 18 },
            { name: "Diazepam", quantity: 10, price: 16 },
            { name: "Metoprolol", quantity: 2, price: 14 },
            { name: "Ranitidine", quantity: 5, price: 20 },
            { name: "Fluoxetine", quantity: 7, price: 24 },
            { name: "Amlodipine", quantity: 6, price: 22 },
            { name: "Warfarin", quantity: 1, price: 26 },
            { name: "Ciprofloxacin", quantity: 8, price: 29 },
            { name: "Metronidazole", quantity: 4, price: 12 },
            { name: "Tramadol", quantity: 9, price: 34 }
        ]
    },
    {
        store_name: "UP7",
        medicines: [
            { name: "Paracetamol", quantity: 2, price: 19 },
            { name: "Aspirin", quantity: 5, price: 17 },
            { name: "Ibuprofen", quantity: 10, price: 15 },
            { name: "Loratadine", quantity: 6, price: 21 },
            { name: "Omeprazole", quantity: 1, price: 25 },
            { name: "Metformin", quantity: 9, price: 23 },
            { name: "Simvastatin", quantity: 4, price: 27 },
            { name: "Amoxicillin", quantity: 3, price: 30 },
            { name: "Prednisone", quantity: 8, price: 13 },
            { name: "Atorvastatin", quantity: 7, price: 35 }
        ]
    },
    {
        store_name: "UP8",
        medicines: [
            { name: "Cetirizine", quantity: 5, price: 20 },
            { name: "Diazepam", quantity: 2, price: 18 },
            { name: "Metoprolol", quantity: 7, price: 16 },
            { name: "Ranitidine", quantity: 1, price: 22 },
            { name: "Fluoxetine", quantity: 8, price: 26 },
            { name: "Amlodipine", quantity: 4, price: 24 },
            { name: "Warfarin", quantity: 6, price: 28 },
            { name: "Ciprofloxacin", quantity: 3, price: 31 },
            { name: "Metronidazole", quantity: 9, price: 14 },
            { name: "Tramadol", quantity: 10, price: 36 }
        ]
    },
    {
        store_name: "UP9",
        medicines: [
            { name: "Paracetamol", quantity: 10, price: 21 },
            { name: "Aspirin", quantity: 6, price: 19 },
            { name: "Ibuprofen", quantity: 1, price: 17 },
            { name: "Loratadine", quantity: 5, price: 23 },
            { name: "Omeprazole", quantity: 3, price: 27 },
            { name: "Metformin", quantity: 8, price: 25 },
            { name: "Simvastatin", quantity: 2, price: 29 },
            { name: "Amoxicillin", quantity: 4, price: 32 },
            { name: "Prednisone", quantity: 7, price: 15 },
            { name: "Atorvastatin", quantity: 9, price: 37 }
        ]
    },
    {
        store_name: "UP10",
        medicines: [
            { name: "Cetirizine", quantity: 1, price: 22 },
            { name: "Diazepam", quantity: 7, price: 20 },
            { name: "Metoprolol", quantity: 6, price: 18 },
            { name: "Ranitidine", quantity: 3, price: 24 },
            { name: "Fluoxetine", quantity: 9, price: 28 },
            { name: "Amlodipine", quantity: 10, price: 26 },
            { name: "Warfarin", quantity: 4, price: 30 },
            { name: "Ciprofloxacin", quantity: 2, price: 33 },
            { name: "Metronidazole", quantity: 5, price: 16 },
            { name: "Tramadol", quantity: 8, price: 38 }
        ]
    },
    {
        store_name: "UP11",
        medicines: [
            { name: "Paracetamol", quantity: 3, price: 23 },
            { name: "Aspirin", quantity: 8, price: 21 },
            { name: "Ibuprofen", quantity: 5, price: 19 },
            { name: "Loratadine", quantity: 1, price: 25 },
            { name: "Omeprazole", quantity: 10, price: 29 },
            { name: "Metformin", quantity: 2, price: 27 },
            { name: "Simvastatin", quantity: 4, price: 31 },
            { name: "Amoxicillin", quantity: 6, price: 34 },
            { name: "Prednisone", quantity: 9, price: 17 },
            { name: "Atorvastatin", quantity: 7, price: 39 }
        ]
    },
    {
        store_name: "UP12",
        medicines: [
            { name: "Cetirizine", quantity: 9, price: 24 },
            { name: "Diazepam", quantity: 1, price: 22 },
            { name: "Metoprolol", quantity: 10, price: 20 },
            { name: "Ranitidine", quantity: 2, price: 26 },
            { name: "Fluoxetine", quantity: 4, price: 30 },
            { name: "Amlodipine", quantity: 5, price: 28 },
            { name: "Warfarin", quantity: 7, price: 32 },
            { name: "Ciprofloxacin", quantity: 6, price: 35 },
            { name: "Metronidazole", quantity: 3, price: 18 },
            { name: "Tramadol", quantity: 8, price: 40 }
        ]
    },
    {
        store_name: "UP13",
        medicines: [
            { name: "Paracetamol", quantity: 8, price: 25 },
            { name: "Aspirin", quantity: 4, price: 23 },
            { name: "Ibuprofen", quantity: 9, price: 21 },
            { name: "Loratadine", quantity: 6, price: 27 },
            { name: "Omeprazole", quantity: 1, price: 31 },
            { name: "Metformin", quantity: 7, price: 29 },
            { name: "Simvastatin", quantity: 5, price: 33 },
            { name: "Amoxicillin", quantity: 10, price: 36 },
            { name: "Prednisone", quantity: 2, price: 19 },
            { name: "Atorvastatin", quantity: 3, price: 41 }
        ]
    },
    {
        store_name: "UP14",
        medicines: [
            { name: "Cetirizine", quantity: 7, price: 26 },
            { name: "Diazepam", quantity: 6, price: 24 },
            { name: "Metoprolol", quantity: 3, price: 22 },
            { name: "Ranitidine", quantity: 10, price: 28 },
            { name: "Fluoxetine", quantity: 2, price: 32 },
            { name: "Amlodipine", quantity: 1, price: 30 },
            { name: "Warfarin", quantity: 8, price: 34 },
            { name: "Ciprofloxacin", quantity: 9, price: 37 },
            { name: "Metronidazole", quantity: 4, price: 20 },
            { name: "Tramadol", quantity: 5, price: 42 }
        ]
    },
    {
        store_name: "UP15",
        medicines: [
            { name: "Paracetamol", quantity: 5, price: 27 },
            { name: "Aspirin", quantity: 10, price: 25 },
            { name: "Ibuprofen", quantity: 2, price: 23 },
            { name: "Loratadine", quantity: 7, price: 29 },
            { name: "Omeprazole", quantity: 4, price: 33 },
            { name: "Metformin", quantity: 1, price: 31 },
            { name: "Simvastatin", quantity: 9, price: 35 },
            { name: "Amoxicillin", quantity: 8, price: 38 },
            { name: "Prednisone", quantity: 3, price: 21 },
            { name: "Atorvastatin", quantity: 6, price: 43 }
        ]
    },
    {
        store_name: "UP16",
        medicines: [
            { name: "Cetirizine", quantity: 4, price: 28 },
            { name: "Diazepam", quantity: 3, price: 26 },
            { name: "Metoprolol", quantity: 8, price: 24 },
            { name: "Ranitidine", quantity: 5, price: 30 },
            { name: "Fluoxetine", quantity: 1, price: 34 },
            { name: "Amlodipine", quantity: 9, price: 32 },
            { name: "Warfarin", quantity: 10, price: 36 },
            { name: "Ciprofloxacin", quantity: 6, price: 39 },
            { name: "Metronidazole", quantity: 7, price: 22 },
            { name: "Tramadol", quantity: 2, price: 44 }
        ]
    },
    {
        store_name: "UP17",
        medicines: [
            { name: "Paracetamol", quantity: 2, price: 29 },
            { name: "Aspirin", quantity: 7, price: 27 },
            { name: "Ibuprofen", quantity: 4, price: 25 },
            { name: "Loratadine", quantity: 9, price: 31 },
            { name: "Omeprazole", quantity: 5, price: 35 },
            { name: "Metformin", quantity: 6, price: 33 },
            { name: "Simvastatin", quantity: 1, price: 37 },
            { name: "Amoxicillin", quantity: 3, price: 40 },
            { name: "Prednisone", quantity: 10, price: 23 },
            { name: "Atorvastatin", quantity: 8, price: 45 }
        ]
    },
    {
        store_name: "UP18",
        medicines: [
            { name: "Cetirizine", quantity: 6, price: 30 },
            { name: "Diazepam", quantity: 5, price: 28 },
            { name: "Metoprolol", quantity: 2, price: 26 },
            { name: "Ranitidine", quantity: 7, price: 32 },
            { name: "Fluoxetine", quantity: 10, price: 36 },
            { name: "Amlodipine", quantity: 8, price: 34 },
            { name: "Warfarin", quantity: 3, price: 38 },
            { name: "Ciprofloxacin", quantity: 1, price: 41 },
            { name: "Metronidazole", quantity: 9, price: 24 },
            { name: "Tramadol", quantity: 4, price: 46 }
        ]
    }
]);

use('upstores')
db.stores.aggregate([
    {
        $geoNear: {

            near: {
                type: "Point",
                coordinates: [81.854464, 25.4738432]
            },
            distanceField: "distance",
            maxDistance: 3000, // distance in meters (3 km = 3000 meters)
            distanceMultiplier: 0.001,
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
            "stock.medicines": {
                $all: [
                    { $elemMatch: { name: "Paracetamol" } },
                    { $elemMatch: { name: "Aspirin" } }
                ]
            }
        },

    },
    {
        $project: {
            _id: 0,
            name: 1,
            location: 2,
            distance: 3
        }
    }
]);
use('upstores')
db.stores.aggregate([
    {
        $geoNear: {

            near: {
                type: "Point",
                coordinates: [81.854464, 25.4738432]
            },
            distanceField: "distance",
            maxDistance: 2000, // distance in meters (3 km = 3000 meters)
            distanceMultiplier: 0.001,
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
            $or: [
                { "stock.medicines.name": "Paracetamol" },
                { "stock.medicines.name": "Cetrizine" }
            ]
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
    //   $project: {
    //     // _id: 0,
    //     store1: "$pair.store1",
    //     store2: "$pair.store2"
    //   }
    // }
]);

db.stores.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [81.854464, 25.4738432]
        },
        distanceField: "distance",
        maxDistance: 2000,
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
        $or: [
          { "stock.meds.medicineName": "Paracetamol" },
          { "stock.meds.medicineName": "Cetrizine" }
        ]
      }
    },
    {
      $group: {
        _id: null,
        stores: { $push: { name: "$name", coordinates: "$location.coordinates" } }
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
                            { $ne: ["$$store1.name", "$$store2.name"] },
                            {
                              store1: "$$store1",
                              store2: "$$store2",
                              distance: {
                                $subtract: [
                                  { $indexOfArray: ["$stores", "$$store1"] },
                                  { $indexOfArray: ["$stores", "$$store2"] }
                                ]
                              }
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
      $match: {
        "pairs.store1": { $ne: null },
        "pairs.store2": { $ne: null }
      }
    },
    {
      $sort: { "pairs.distance": 1 }
    },
    {
      $project: {
        _id: 0,
        store1: "$pairs.store1.name",
        coordinates1: "$pairs.store1.coordinates",
        store2: "$pairs.store2.name",
        coordinates2: "$pairs.store2.coordinates",
        distance: "$pairs.distance"
      }
    },
    {
      $limit: 10
    }
  ]);

  db.drivers.insertMany([
    {
      name: "D3",
      coordinates: [81.85526464639793, 25.464695614937767],
      status: "unavailable"
    },
    {
      name: "D5",
      coordinates: [81.85672661185748, 25.460449745644723],
      status: "available"
    },
    {
      name: "D6",
      coordinates: [81.85910102016135, 25.46509154969705],
      status: "available"
    },
    {
      name: "D7",
      coordinates: [81.86001612842352, 25.463300969626886],
      status: "unavailable"
    },
    {
      name: "D8",
      coordinates: [81.85309236058816, 25.46701620285603],
      status: "available"
    },
    {
      name: "D10",
      coordinates: [81.85094304901901, 25.463269546007922],
      status: "available"
    },
    {
      name: "D11",
      coordinates: [81.84690896619486, 25.47209493073842],
      status: "available"
    },
    {
      name: "D12",
      coordinates: [81.86071402237314, 25.486711501993597],
      status: "available"
    },
    {
      name: "D13",
      coordinates: [81.83530733126804, 25.458342119908295],
      status: "available"
    },
    {
      name: "D18",
      coordinates: [81.84848824620286, 25.45023535333887],
      status: "available"
    },
    {
      name: "D20",
      coordinates: [81.86248891525395, 25.4801226422952],
      status: "available"
    }
  ]);
  
  






// The prototype form to create a collection:
/* db.createCollection( <name>,
  {
    capped: <boolean>,
    autoIndexId: <boolean>,
    size: <number>,
    max: <number>,
    storageEngine: <document>,
    validator: <document>,
    validationLevel: <string>,
    validationAction: <string>,
    indexOptionDefaults: <document>,
    viewOn: <string>,
    pipeline: <pipeline>,
    collation: <document>,
    writeConcern: <document>,
    timeseries: { // Added in MongoDB 5.0
      timeField: <string>, // required for time series collections
      metaField: <string>,
      granularity: <string>,
      bucketMaxSpanSeconds: <number>, // Added in MongoDB 6.3
      bucketRoundingSeconds: <number>, // Added in MongoDB 6.3
    },
    expireAfterSeconds: <number>,
    clusteredIndex: <document>, // Added in MongoDB 5.3
  }
)*/

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/
