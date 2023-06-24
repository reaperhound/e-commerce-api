const express = require("express");
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

const PORT = 3000;
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
app.listen(PORT, () => {
  console.log(`Running in PORT ${PORT}`);
});
