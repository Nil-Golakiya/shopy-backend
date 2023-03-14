const Razorpay = require("razorpay")
const crypto = require("crypto");
const Payment = require("../models/payment");

const checkout = async (req, res) => {

    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
        amount: Number(req.body.finalPrice * 100),
        currency: 'INR',
    }

    const OrderData = await instance.orders.create(options);
    res.status(200).json(OrderData)

}

const paymentVerification = async (req, res) => {

    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    console.log("paymentVerification", req.body)

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.res;

    const data = await instance.payments.fetch(
        razorpay_payment_id
    );
    console.log("data---------------------", data)
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    const isAuthenticated = expectedSignature === razorpay_signature;

    if (isAuthenticated) {
        const newPayment = new Payment({
            razorpay_order_id: data.order_id,
            order_id: req.body.oid,
            razorpay_payment_id: data.id,
            payment_method: data.method,
            amount: data.amount / 100,
            status: data.status,
            user_email_id: data.email,
            user_number: data.contact,
            user_id:req.body.user_id
        });
        const savePayment = await newPayment.save();
        res.status(200).json(savePayment)
    } else {
        res.status(400).json({
            success: false,
        })
    }
}

module.exports = { checkout, paymentVerification }
