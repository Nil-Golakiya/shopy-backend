const Wishlist = require("../models/wishlist");
const { sendError, sendSuccess } = require("../helpers/index")

const CreateWishlist = async (req, res,) => {
    try {
        const newWishlist = new Wishlist(req.body);
        const saveWishlist = await newWishlist.save();
        res.status(200).json(saveWishlist)
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

        const allWishlist = await Wishlist.aggregate(condition);
        res.status(200).json(allWishlist)
    } catch (error) {
        console.log(error)
        return sendError(res, 403, "Something went wrong", error);
    }
}


module.exports = { CreateWishlist, GetWishlist }