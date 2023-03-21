const express = require("express");
const { CreateCarousel, GetCarouselDetails, DeleteCarousel, GetOneCarouselDetails, UpdateCarousel } = require("../controllers/Carousel");
const multer = require('multer');


const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/carousel");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage })

router.post("/", upload.single("file"), CreateCarousel);
router.get("/", GetCarouselDetails);
router.get("/details/:id", GetOneCarouselDetails);
router.put("/update/:id", upload.single("file"), UpdateCarousel);
router.delete("/:id", DeleteCarousel);

module.exports = router;