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

// const DeleteCart = async (req, res) => {
//     try {
//         const deleteCart = await Cart.findById(req.params.id)
//         try {
//             await deleteCart.delete()
//             res.status(200).json("Your Product Has Been Deleted...!")
//         } catch (e) {
//             console.log(e)
//         }
//     } catch (e) {
//         console.log(e)
//     }
// }

// const ClearCart = async (req, res) => {
//     try {
//         const ClearCartItems = await Cart.deleteMany({ user_id: req.params.id })
//         try {
//             res.status(200).json("Your Cart Has Been Cleared...!")
//         } catch (e) {
//             console.log(e)
//         }
//     } catch (e) {
//         console.log(e)
//     }
// }


// const UpdateCart = async (req, res) => {
//     try {
//         const UpdatedCart = await Cart.updateOne(
//             { _id: req.params.id },
//             {
//                 $set: req.body,
//             },
//             { new: true }
//         );
//         res.status(200).json(UpdatedCart);
//     } catch (e) {
//         console.log('nhjunj', e)
//     }
// }

module.exports = { CreateCoupon, GetCouponDetails, GetOneCouponDetails }
