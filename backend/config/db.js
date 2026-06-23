const mongoose = require("mongoose");

const connectDB = async () => {
  try {
     await mongoose.connect(process.env.MONGO_URI, {
      useFindAndModify: false,
    });
    console.log("MongoDB Connected", mongoose.connection.name);
  } catch (error) {
    console.log("DB Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
