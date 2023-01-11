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
        const cart = await Cart.find({ user_id: req.params.id }).populate("variation_id")
        res.status(200).json(cart)
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

const UpdateCart = async (req, res) => {
    try {
        const UpdatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(UpdatedCart);
    } catch (e) {
        console.log(e)
    }
}

module.exports = { CreateCart, GetCartDetails, DeleteCart, UpdateCart }
