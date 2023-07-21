import mongoose from "mongoose";

export  function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    const uri = `mongodb+srv://purwarlakshya:gocorona_30@cluster0.npaoy0c.mongodb.net/?retryWrites=true&w=majority`
    return mongoose.connect(uri);
  }
}