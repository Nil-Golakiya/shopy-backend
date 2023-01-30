const Order = require("../models/order");
const { sendError, sendSuccess } = require("../helpers/index")

const GetOrderByUserId = async (req, res,) => {
    try {
        const order = await Order.find({ user_id: req.params.id })
        res.status(200).json(order)
    } catch (e) {
        console.log(e)
        return sendError(res, 403, "Something went wrong", e);
    }
}

const DeleteCart = async (req, res) => {
    try {
        const deleteCart = await Cart.findById(req.params.id)
        try {
            await deleteCart.delete()
            res.status(200).json("Your Product Has Been Deleted...!")
        } catch (e) {
            console.log(e)
        }
    } catch (e) {
        console.log(e)
    }
}

const ClearCart = async (req, res) => {
    try {
        const ClearCartItems = await Cart.deleteMany({ user_id: req.params.id })
        try {
            res.status(200).json("Your Cart Has Been Cleared...!")
        } catch (e) {
            console.log(e)
        }
    } catch (e) {
        console.log(e)
    }
}


const UpdateCart = async (req, res) => {
    try {
        const UpdatedCart = await Cart.updateOne(
            { _id: req.params.id },
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(UpdatedCart);
    } catch (e) {
        console.log('nhjunj', e)
    }
}

module.exports = { GetOrderByUserId }
