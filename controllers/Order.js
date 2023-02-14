const Order = require("../models/order");
const { sendError, sendSuccess } = require("../helpers/index")

const GetOrderByUserId = async (req, res,) => {
    try {
        const order = await Order.find({ user_id: req.params.id }).populate("order_details_id")
        res.status(200).json(order)
    } catch (e) {
        console.log(e)
        return sendError(res, 403, "Something went wrong", e);
    }
}

const GetOrderByOrderId = async (req, res,) => {
    try {
        const order = await Order.findOne({ _id: req.params.id }).populate("order_details_id")
        res.status(200).json(order)
    } catch (e) {
        console.log(e)
        return sendError(res, 403, "Something went wrong", e);
    }
}

const GetAllOrder = async (req, res,) => {
    try {
        const order = await Order.find()
        res.status(200).json(order)
    } catch (e) {
        console.log(e)
        return sendError(res, 403, "Something went wrong", e);
    }
}

module.exports = { GetOrderByUserId, GetOrderByOrderId, GetAllOrder }
