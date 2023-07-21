import mongoose , {model, models, Schema} from "mongoose";

const storeSchema = new mongoose.Schema({
  name: String,
  location: String,
  // Other fields in your stores collection
});

// module.exports = mongoose.model('Store', storeSchema);
export const Store = models.Store || model('Store', storeSchema , 'stores');