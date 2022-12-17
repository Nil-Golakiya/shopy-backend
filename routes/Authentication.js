const express=require("express");
const {register,adminlogin}=require("../controllers/Authentication");

const router = express.Router();

router.post("/signup",register);
router.post("/login",adminlogin);
// router.put("/:id",UpdateCategory);
// router.delete("/:id",DeleteCategory);


module.exports = router;