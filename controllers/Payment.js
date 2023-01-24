// // const Category = require("../models/category");
// const { sendError, sendSuccess } = require("../helpers/index")
// const { instance } = require("../index")

// const Checkout = async (req, res) => {

//     const options = {
//         amount: 50000,  // amount in the smallest currency unit
//         currency: "INR",
//     };
//     const order = await instance.orders.create(options)

//     console.log("order", order)
//     res.status(200).json({
//         success: true,
//     })

// }




// module.exports = { Checkout }