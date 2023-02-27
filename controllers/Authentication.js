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
        return sendError(res, 403, "Something went wrong", err);
    }
}

const UpdateUserDetails = async (req, res) => {
    try {
        const getEmail = await User.findOne({ _id: { $ne: req.params.id }, email: req.body.email });
        if (getEmail) return sendError(res, 403, "Email is already exists.");

        const UpdatedUser = await User.updateOne(
            { _id: req.params.id },
            {
                $set: req.body,
            },
            { new: true }
        );
        return sendSuccess(res, UpdatedUser, "User Updated Successfully.!");
    } catch (e) {
        console.log("e", e)
        return sendError(res, 403, "Something went wrong", e);
    }
}

const UpdatePassword = async (req, res) => {
    try {
        const getUser = await User.findOne({ email: req.body.email });
        const condition = await bcrypt.compare(req.body.old_password, getUser.password)

        if (condition) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.new_password, salt);
            let password = hash;
            let UpdatedUser = await User.findOneAndUpdate({ email: req.body.email }, { password })
            return sendSuccess(res, UpdatedUser, "Password Updated Successfully.!");
        } else {
            return sendError(res, 403, "Old password is not matched");
        }
    } catch (error) {
        return sendError(res, 403, "Something went wrong", e);
    }
}

const GetUserDetails = async (req, res,) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        return sendSuccess(res, user, "User details get Successfully.!");
    } catch (e) {
        return sendError(res, 403, "Something went wrong", e);
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
        return sendError(res, 403, "Something went wrong", err);
    }
};

const clientlogin = async (req, res) => {
    try {
        const { email, password, roles } = req.body;
        const user = await User.findOne({ email, roles: "user" })
        if (!user) return sendError(res, 403, "Invalid email id");

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return sendError(res, 403, "Invalid password");

        const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET_KEY || "jwt-secret-key");
        return sendSuccess(res, { user, token }, "User Login Successfully.!");

    } catch (err) {
        return sendError(res, 403, "Something went wrong", err);
    }
}

const allUser = async (req, res) => {
    try {
        const AllUser = await User.find({ roles: "user" })
        res.status(200).json(AllUser)
    } catch (error) {
        return sendError(res, 403, "Something went wrong", err);
    }
}

const DeleteUser = async (req, res) => {
    try {
        const deleteUser = await User.findById(req.params.id)
        try {
            await deleteUser.delete()
            res.status(200).json("Your User Has Been Deleted...!")
        } catch (e) {
            return sendError(res, 403, "Something went wrong", e);
        }
    } catch (e) {
        return sendError(res, 403, "Something went wrong", e);
    }
}

module.exports = { register, adminlogin, clientlogin, UpdateUserDetails, GetUserDetails, UpdatePassword, allUser, DeleteUser }
