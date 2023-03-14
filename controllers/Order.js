const Order = require("../models/order");
const Payment = require("../models/payment");
const OrderDetails = require("../models/orderdetails")
const Product = require("../models/producat")
const { sendError, sendSuccess } = require("../helpers/index")

const GetOrderByUserId = async (req, res,) => {
    try {
        const order = await Order.find({ user_id: req.params.id }).populate("order_details_id")
        res.status(200).json(order)
    } catch (e) {
        return sendError(res, 403, "Something went wrong", e);
    }
}

const GetOrderByOrderId = async (req, res,) => {
    try {
        const order = await Order.findOne({ _id: req.params.id }).populate("order_details_id")
        res.status(200).json(order)
    } catch (e) {
        return sendError(res, 403, "Something went wrong", e);
    }
}

const GetAllOrder = async (req, res,) => {
    try {
        const order = await Order.find().populate("order_details_id")
        res.status(200).json(order)
    } catch (e) {
        return sendError(res, 403, "Something went wrong", e);
    }
}

const GetLimitedOrder = async (req, res,) => {
    console.log("bgfjhbdgjh")
    try {
        const order = await Order.find().populate("order_details_id").limit(5)
        res.status(200).json(order)
    } catch (e) {
        console.log(e)
        return sendError(res, 403, "Something went wrong", e)
    }
}

const topsellingproduct = async (req, res, next) => {
    try {
        const topselling = await OrderDetails.aggregate([
            { "$group": { _id: "$product_id", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product_details",
                }
            }
        ])
        res.status(200).json(topselling)
    } catch (error) {
        console.log(error)
    }
}

const CreateOrder = async (req, res) => {
    let { cart } = req.body;
    const OrderDate = new Date();

    try {
        const newOrder = new Order({
            order_id: req.body.oid,
            user_id: req.body.user_id,
            status: "Paid",
            date: OrderDate,
            total_price: req.body.finalPrice,
            discount: req.body.discount,
            shippingCharge: req.body.shippingCharge,
            contact_info: req.body.contact_info,
            shipping_info: req.body.Data
        });

        await newOrder.save().then(async (order) => {
            cart.map(async (item) => {
                const orderDetails = await OrderDetails.create({
                    order_id: order._id,
                    product_id: item.variation_id.product_id,
                    product_info: item.subVariation,
                    price: item.subVariation.price - (item.subVariation.price * item.subVariation.discount / 100),
                    quantity: item.cart_quantity,
                    discount: item.subVariation.discount,
                    total: (item.subVariation.price - (item.subVariation.price * item.subVariation.discount / 100)) * (item.cart_quantity)
                })
                await Order.updateOne(
                    { _id: order._id },
                    { $push: { order_details_id: orderDetails._id } }
                );
            })
        })
        const saveOrder = await newOrder.save();
        res.status(200).json(saveOrder)
    } catch (e) {
        return sendError(res, 403, "Something went wrong", e);
    }
}

const GetPaymentInfoByOrderId = async (req, res) => {
    try {
        const paymentDetails = await Payment.findOne({ order_id: req.body.id })
        res.status(200).json(paymentDetails)
    } catch (e) {
        return sendError(res, 403, "Something went wrong", e);
    }
}

module.exports = { GetOrderByUserId, GetOrderByOrderId, GetAllOrder, GetLimitedOrder, topsellingproduct, CreateOrder, GetPaymentInfoByOrderId }
