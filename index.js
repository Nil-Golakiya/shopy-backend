const express = require('express')
const Categoryroute = require('./routes/Category')
const SubCategoryroute = require('./routes/SubCategory')
const Productroute = require('./routes/Product.js')
const AuthRoute = require('./routes/Authentication')
const CartRoute = require('./routes/Cart')
const WishlistRoute = require('./routes/Wishlist')
const PaymentRoute = require('./routes/Payment')
const CouponRoute = require('./routes/Coupon')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require("path");
var bodyParser = require('body-parser')
// const Razorpay = require("razorpay")

dotenv.config();


// const instance = new Razorpay({
//   key_id: process.env.RAZORPAY_API_KEY,
//   key_secret: process.env.RAZORPAY_APT_SECRET,
// });

// module.exports = { instance }

const app = express();


const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected To Mongodb");
  } catch (error) {
    throw error;
  }
};


mongoose.connection.on("disconnected", () => {
  console.log("MongoDb Disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDb connected");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
// app.use(cookieParser());

app.use("/category", Categoryroute);
app.use("/subcategory", SubCategoryroute);
app.use("/product", Productroute);
app.use("/auth", AuthRoute);
app.use("/cart", CartRoute);
app.use("/wishlist", WishlistRoute);
app.use("/api", PaymentRoute);
app.use("/coupon", CouponRoute);

// app.use((err, req, res, next) => {
//   const errorStatus = err.status || 500;
//   const errorMessage = err.message || "Something went wrong!";
//   return res.status(errorStatus).json({
//     success: false,
//     status: errorStatus,
//     message: errorMessage,
//     stack: err.stack,
//   });
// });

app.listen(8800, () => {
  connect();
  console.log("Connected To Backend");
});

