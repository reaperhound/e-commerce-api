const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const User = require("./models/User");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productsRoute = require("./routes/product")
const categoryRoute = require("./routes/category")
const cartRoute = require("./routes/cart");
const reviewRoute = require("./routes/review");


const app = express();
app.use(express.json());

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
// app.use(cors({
//   origin: 'http://localhost:5173/'
// }))
const PORT = 4000;
const MONGO_URI =
  "mongodb+srv://reaperhound69004:MinIsTheBestGirl@cluster0.cuzohej.mongodb.net/ECommerceAPI?retryWrites=true";

//   MONGODB CONNECTION
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("Connectfailed to DATABASE", err));

// Root
app.get("/", async (req, res) => {
  try {
    const data = await User.find({}).populate("cart");
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).json({ success: "true", data });
  } catch (error) {
    res.status(500).json({ error, success: "no" });
  }
});

// /auth
app.use("/auth", authRoute);

// /user
app.use("/users", userRoute);

// /products
app.use("/products", productsRoute)

// /category
app.use('/category', categoryRoute);

// /cart
app.use('/cart', cartRoute)

// /review
app.use('/review', reviewRoute)

// Listening
app.listen(3000 || process.env.PORT, () => {
  console.log(`Running in PORT ${PORT}`);
});
