const Wishlist = require("../models/wishlist");
const { sendError, sendSuccess } = require("../helpers/index")
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const CreateWishlist = async (req, res,) => {
    try {
        const newWishlist = new Wishlist(req.body);
        const saveWishlist = await newWishlist.save();
        return sendSuccess(res, saveWishlist, "Wishlist created successfully")
    } catch (e) {
        console.log(e)
        return sendError(res, 403, "Something went wrong", e);
    }
}

const GetWishlist = async (req, res,) => {

    try {
        const condition = [
            {
                $lookup: {
                    from: "products",
                    localField: "product_id",
                    foreignField: "_id",
                    as: "product",
                },
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "product.category_id",
                    foreignField: "_id",
                    as: "categories",
                    pipeline: [{
                        $project: { name: 1 }
                    }],
                },
            },
            {
                $lookup: {
                    from: "subcategories",
                    localField: "product.subcategory_id",
                    foreignField: "_id",
                    as: "subcategories",
                    pipeline: [{
                        $project: { name: 1 }
                    }],
                },
            },
            {
                $lookup: {
                    from: "variations",
                    localField: "product_id",
                    foreignField: "product_id",
                    as: "variations",
                    pipeline: [{
                        $project: {
                            color: 1,
                            image: 1,
                            'subVariation.size': 1,
                            'subVariation.price': 1,
                            'subVariation.discount': 1,
                        }
                    }],
                }
            },
            { $unset: ["product.sort_description", "product.long_description", "product.status", "product.featured", "product.tranding", "product.createdAt", "product.updatedAt", "product.__v"] }
        ];

        if (req.params.id) {
            condition.push({
                $match: {
                    "user_id": ObjectId(req.params.id),
                },
            });
        }

        const allWishlist = await Wishlist.aggregate(condition);

        const newlist = allWishlist.map(wishlist => {
            wishlist.wishlist_id = wishlist._id;
            wishlist = { ...wishlist, ...wishlist.product[0] }
            delete wishlist.product[0];
            delete wishlist.product;
            return wishlist;
        })
        return sendSuccess(res, newlist, "Wishlist get successfully")
    } catch (error) {
        return sendError(res, 403, "Something went wrong", error);
    }
}


const DeleteWishlist = async (req, res) => {
    try {
        const deleteWishlist = await Wishlist.findById(req.params.id)
        try {
            await deleteWishlist.delete()
            return sendSuccess(res, deleteWishlist, "Wishlist product deleted successfully")
        } catch (e) {
            return sendError(res, 403, "Something went wrong", error);
        }
    } catch (e) {
        return sendError(res, 403, "Something went wrong", error);
    }
}


module.exports = { CreateWishlist, GetWishlist, DeleteWishlist }