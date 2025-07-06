const express = require("express");
const connectDB = require("./utils/db-connection");
//handle cookies
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");
dotenv.config();

connectDB();
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Welcome to System");
});
app.use("/api/auth", require("./routes/auth.route"));

app.listen(
    PORT, () => console.log(`Server started on port ${PORT}`)
);



