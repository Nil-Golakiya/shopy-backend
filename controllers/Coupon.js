const Coupon = require("../models/coupons");
const { sendError, sendSuccess } = require("../helpers/index")

const CreateCoupon = async (req, res) => {
    try {
        const newCoupon = new Coupon(req.body);
        const saveCoupon = await newCoupon.save();
        res.status(200).json(saveCoupon)
    } catch (e) {
        return sendError(res, 403, "Something went wrong", e);
    }
}

const GetCouponDetails = async (req, res) => {
    try {
        const coupon = await Coupon.find()
        res.status(200).json(coupon)
    } catch (e) {
        console.log(e)
        return sendError(res, 403, "Something went wrong", e);
    }
}

const GetOneCouponDetails = async (req, res) => {
    try {
        const coupon = await Coupon.findOne({ code: req.params.code })
        res.status(200).json(coupon)
    } catch (e) {
        console.log(e)
        return sendError(res, 403, "Something went wrong", e);
    }
}

const DeleteCoupon = async (req, res) => {
    try {
        const deleteCoupon = await Coupon.findById(req.params.id)
        try {
            await deleteCoupon.delete()
            res.status(200).json("Your Coupon Has Been Deleted...!")
        } catch (e) {
            return sendError(res, 403, "Something went wrong", e);
        }
    } catch (e) {
        return sendError(res, 403, "Something went wrong", e);

    }
}

const UpdateCoupon = async (req, res) => {
    try {
        const UpdatedCoupon = await Coupon.updateOne(
            { code: req.params.code },
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(UpdatedCoupon);
    } catch (e) {
        return sendError(res, 403, "Something went wrong", e);
    }
}

module.exports = { CreateCoupon, GetCouponDetails, GetOneCouponDetails, DeleteCoupon, UpdateCoupon }
