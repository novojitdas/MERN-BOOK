import express, { response } from "express";
import mongoose from "mongoose";
import { PORT, MONGODB } from "./config.js";
import { Book } from "./models/bookModel.js";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";
const app = express();

////////////////
// MIDDLEWARE //
////////////////
// middleware for parsing request body
app.use(express.json());

//middleware for handling cors policy
//option 1: allow all cors with default of all cors (*)
app.use(cors());
// option 2: allow custom origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowHeaders: ["Content-Type"],
//   })
// );

/////////////
// Route //
//////////
app.use("/books", bookRoute);

app.get("/", (req, res) => {
  res.status(234);
  // res.redirect("/books");
  res.send("Welcome to MERN-BookStore Project");
});

//////////////
// SERVER ///
////////////

// Connect to mongo
mongoose
  .connect(MONGODB)
  .then(() => {
    console.log("App is connected to database.");
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
