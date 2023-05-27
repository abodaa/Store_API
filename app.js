// ************ Requires ************ //
const express = require("express");
const app = express();
const errorMiddleWare = require("./middleware/error-handler");
const routNotFoundMiddleWare = require("./middleware/not-found");
const dbConnect = require('./db/connect')
const routes = require('./routes/products')
// json parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require environment vars
require("dotenv").config();

// Port Var
port = process.env.PORT || 3000;

// Route
app.use("/api/v1/products", routes);

// Start Function
const start = async () => {
  try {
    // connect to DB
    const dbConnection = await dbConnect(process.env.MONGO_URI);
    console.log("Database connected");

    app.listen(port, () => {
      console.log(`App is listening to port ${port} ...`);
    });
  } catch (error) {
    console.log(error)
  }
};

// Error and Router error uses
app.use(errorMiddleWare);
app.use(routNotFoundMiddleWare);

start()