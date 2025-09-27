
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");


dotenv.config();


connectDB(process.env.MONGO_URI);

const app = express();


app.use(cors());
app.use(express.json()); 


app.get("/health", (req, res) => res.json({ status: "ok" }));


app.get("/", (req, res) => res.send("Blog backend is running"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
