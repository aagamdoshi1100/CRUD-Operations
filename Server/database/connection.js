const mongoose = require("mongoose");

const Connection = async () => {
  try {
    await mongoose.connect(process.env.MongoURI, {});
    console.log("Connected to database");
  } catch (e) {
    console.error(e);
  }
};

module.exports = Connection;
