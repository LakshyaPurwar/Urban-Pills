import mongoose , {model, models, Schema} from "mongoose";

// Define the driver schema
const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  },
  status: {
    type: String,
    required: true
  }
});
export const Driver = models.Driver || model('Driver', driverSchema , 'drivers');

