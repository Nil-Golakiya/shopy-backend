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
        console.log(req.params.id)
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
            return sendError(res, 403, "Something went wrong", e);
        }
    } catch (e) {
        return sendError(res, 403, "Something went wrong", e);
    }
}

const ClearCart = async (req, res) => {
    try {
        const ClearCartItems = await Cart.deleteMany({ user_id: req.params.id })
        try {
            res.status(200).json("Your Cart Has Been Cleared...!")
        } catch (e) {
            return sendError(res, 403, "Something went wrong", e);
        }
    } catch (e) {
        return sendError(res, 403, "Something went wrong", e);
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
        return sendError(res, 403, "Something went wrong", e);
    }
}

module.exports = { CreateCart, GetCartDetails, DeleteCart, UpdateCart, ClearCart }
