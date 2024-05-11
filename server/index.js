require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cityList = require("./routers/cityListRoute");
const collectionList = require("./routers/collection");
const hotelList = require("./routers/hotel");

// fixing cor issue

const corsOptions = {
  credentials: true,
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  origin: "http://localhost:3000",
  allowedHeaders: ["Content-Type", "Authorization"],
};

// middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

// paths
app.use("/", cityList);
app.use("/", collectionList);
app.use("/", hotelList);


// port
const portNo = process.env.PORT_NO;

app.listen(portNo, () => {
  console.log(`server is runnig on ${portNo}`);
});
