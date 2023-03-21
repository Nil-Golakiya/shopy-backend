const Carousel = require("../models/carousel");
const { sendError, sendSuccess } = require("../helpers/index");

const CreateCarousel = async (req, res,) => {
    try {
        const image = req.file.path;
        req.body.image = image;
        const newCarousel = new Carousel(req.body);
        const saveCarousel = await newCarousel.save();
        res.status(200).json(saveCarousel)
    } catch (e) {
        return sendError(res, 403, "Something went wrong", e);
    }
}

const GetCarouselDetails = async (req, res,) => {
    try {
        const carousel = await Carousel.find().populate("subcategory_id")
        res.status(200).json(carousel)
    } catch (e) {
        return sendError(res, 403, "Something went wrong", e);
    }
}

const GetOneCarouselDetails = async (req, res) => {
    try {
        const carousel = await Carousel.findById(req.params.id).populate("subcategory_id")
        res.status(200).json(carousel)
    } catch (e) {
        console.log(e)
        return sendError(res, 403, "Something went wrong", e);
    }
}

const DeleteCarousel = async (req, res) => {
    try {
        const deleteCarousel = await Carousel.findById(req.params.id)
        try {
            await deleteCarousel.delete()
            res.status(200).json("Your Carousel Has Been Deleted...!")
        } catch (e) {
            return sendError(res, 403, "Something went wrong", e);
        }
    } catch (e) {
        return sendError(res, 403, "Something went wrong", e);
    }
}

const UpdateCarousel = async (req, res) => {
    try {
        if (req.body.img) {
            await fs.unlinkSync(req.body.img);
        }
        if (req.file) {
            const newImg = req.file.path;
            console.log("newImg", newImg)
            req.body.image = newImg;
        }
        const UpdatedCarousel = await Carousel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(UpdatedCarousel);
    } catch (e) {
        return sendError(res, 403, "Something went wrong", e);
    }
}

module.exports = { CreateCarousel, GetCarouselDetails, DeleteCarousel, UpdateCarousel, GetOneCarouselDetails }
