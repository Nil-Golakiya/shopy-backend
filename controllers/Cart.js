const Cart = require("../models/cart");
const { sendError, sendSuccess } = require("../helpers/index")
const fs = require("fs");

const CreateCart = async (req, res,) => {
    try {
        const newcart = new Cart(req.body);
        const savecart = await newcart.save();
        res.status(200).json(savecart)
    } catch (e) {
        return sendError(res, 403, "Something went wrong", e);
    }
}

const GetCartDetails = async (req, res,) => {
    try {
        const cart = await Cart.find().populate("subVariation_id")
        res.status(200).json(cart)
    } catch (e) {
        console.log(e)
        return sendError(res, 403, "Something went wrong", e);
    }
}

module.exports = { CreateCart, GetCartDetails }
