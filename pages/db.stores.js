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
//   {
//     $sort: { "pairs.distance": 1 }
//   },
//   {
//     $project: {
//       _id: 0,
//       store1: "$pairs.store1.name",
//       coordinates1: "$pairs.store1.coordinates",
//       store2: "$pairs.store2.name",
//       coordinates2: "$pairs.store2.coordinates",
//       distance: "$pairs.distance"
//     }
//   },
  {
    $limit: 10
  }
]);
