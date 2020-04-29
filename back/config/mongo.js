const mongoose = require("mongoose");
const mongo_uri = process.env.MONGO_URI;
mongoose.connect(mongo_uri, function (err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});
