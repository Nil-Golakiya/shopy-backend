const express = require("express");
const { register, adminlogin, clientlogin, UpdateUserDetails, GetUserDetails, UpdatePassword, allUser, DeleteUser } = require("../controllers/Authentication");

const router = express.Router();

router.post("/signup", register);
router.post("/login", adminlogin);
router.post("/userregister", clientlogin);
router.put("/:id", UpdateUserDetails);
router.get("/:id", GetUserDetails);
router.put("/password/updatepassword", UpdatePassword);
router.get("/", allUser);
router.delete("/:id", DeleteUser);

// router.delete("/:id",DeleteCategory);


module.exports = router;