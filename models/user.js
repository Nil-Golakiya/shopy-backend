const mongoose = require('mongoose');
const Joi = require("joi")

const UserSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: false,
            default: null,
        },
        user_name: {
            type: String,
            required: false,
            default: null,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            default: null,
        },
        city: {
            type: String,
            default: null,
        },
        state: {
            type: String,
            default: null,
        },
        address: {
            type: String,
            default: null,
        },
        pin_code: {
            type: Number,
            default: null,
        },
        roles: {
            type: String,
        },
        image: {
            type: String,
        },
        is_active: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    { timestamps: true }
);

const userValidate = (user) => {
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().optional(),
        user_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: Joi.number().required(),
        image:Joi.string().optional(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        address: Joi.string().required(),
        pin_code: Joi.string().required(),
        roles: Joi.string(),
        is_active: Joi.boolean(),
    });
    return schema.validate(user);
};


const User = mongoose.model("User", UserSchema);
module.exports = { User, userValidate };