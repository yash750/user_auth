// connect to database
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config(
    {
        path: "../.env",
    }
);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;