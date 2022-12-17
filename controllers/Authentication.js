const { User, userValidate } = require("../models/user")
const { sendError, sendSuccess } = require("../helpers/index")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { error } = userValidate(req.body);
        if (error) return sendError(res, 403, error.details[0].message);

        const getEmail = await User.findOne({ email: req.body.email });
        if (getEmail) return sendError(res, 403, "Email is already exists.");

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User(
            {
                ...req.body,
                password: hash,
            }
        );
        await newUser.save();
        return sendSuccess(res, newUser, "User Register Successfully.!");
    } catch (err) {
        console.log(err);
        return sendError(res, 403, "Something went wrong", err);
    }
}

const adminlogin = async (req, res) => {
    try {
        const { email, password, roles } = req.body;
        const user = await User.findOne({ email, roles: "admin" })
        if (!user) return sendError(res, 403, "Invalid email id");

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return sendError(res, 403, "Invalid password");

        const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET_KEY || "jwt-secret-key");
        return sendSuccess(res, { user, token }, "User Login Successfully.!");

    } catch (err) {

    }
};

module.exports = { register, adminlogin }
