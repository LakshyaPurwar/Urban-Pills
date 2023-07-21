import {mongooseConnect} from "@/lib/mongoose";
import { Driver } from "@/models/Drivers";

export default async function handler(req, res) {
  // Extract the coordinate and radius from the request body
  const {  longitude, latitude, radius } = req.body;

  try {
    // Connect to the MongoDB database
    await mongooseConnect();

    // Convert the radius to radians (for MongoDB's $geoWithin operator)
    const radiusInRadians = radius / 6371;

    // Find drivers within the specified radius
    const drivers = await Driver.find({
      coordinates: {
        $geoWithin: {
          $centerSphere: [[longitude, latitude], radiusInRadians]
        }
      }
    }).select('name coordinates');

    // Return the list of drivers as the API response
    res.status(200).json(drivers);
  } catch (error) {
    console.error('Error retrieving drivers:', error);
    res.status(500).json({ error: 'Internal Server Error : Mere taraf se hai' });
  }
}
