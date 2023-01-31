const https = require('https');
const PaytmChecksum = require('paytmchecksum');
const Order = require("../models/order");
const Variation = require("../models/variations");
const OrderDetails = require("../models/orderdetails");
const Paytmchecksum = require("paytmchecksum")



const preTransactionHandler = async (req, res) => {

    // console.log("req---------", req)

    let { cart } = req.body;

    if (req.method === "POST") {

        const OrderDate = new Date();

        let order = new Order({
            order_id: req.body.oid,
            user_id: req.body.user_id,
            date: OrderDate,
            total_price: req.body.finalPrice,
            contact_info: req.body.contact_info,
            shipping_info: req.body.data,
            discount: req.body.discount,
            shippingCharge: req.body.shippingCharge
        })

        await order.save().then(async (order) => {
            cart.map(async (item) => {
                const orderDetails = await OrderDetails.create({
                    order_id: order._id,
                    product_id: item.variation_id.product_id,
                    product_info: item.subVariation,
                    price: item.subVariation.price - (item.subVariation.price * item.subVariation.discount / 100),
                    quantity: item.cart_quantity,
                    discount: item.subVariation.discount,
                    total: (item.subVariation.price - (item.subVariation.price * item.subVariation.discount / 100)) * (item.cart_quantity)
                })
                await Order.updateOne(
                    { _id: order._id },
                    { $push: { order_details_id: orderDetails._id } }
                );
            })
        })


        var paytmParams = {};
        const contact_info = req.body.contact_info

        // console.log(req.body)

        paytmParams.body = {
            "requestType": "Payment",
            "mid": process.env.PAYTM_MID,
            "websiteName": "SHOPY",
            "orderId": req.body.oid,
            "callbackUrl": `${process.env.HOST}/api/posttransaction`,
            "txnAmount": {
                "value": req.body.finalPrice,
                "currency": "INR",
            },
            "userInfo": {
                "custId": contact_info.email,
            },
        };

        const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_KEY)
        // console.log("checksum", checksum)

        paytmParams.head = {
            "signature": checksum
        };

        var post_data = JSON.stringify(paytmParams);
        // console.log('post_data', post_data)
        const requestAsync = async () => {
            return new Promise((resolve, reject) => {
                var options = {

                    /* for Staging */
                    hostname: 'securegw-stage.paytm.in',

                    /* for Production */
                    // hostname: 'securegw.paytm.in',

                    port: 443,
                    path: `/theia/api/v1/initiateTransaction?mid=${process.env.PAYTM_MID}&orderId=${req.body.oid}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                var response = "";
                var post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });

                    post_res.on('end', function () {
                        // console.log('Response: ', response);
                        resolve(JSON.parse(response).body);
                    });
                });

                post_req.write(post_data);
                post_req.end();
            })
        }

        let myr = await requestAsync()
        // console.log("myr", myr)
        res.status(200).json({ success: true, myr })

    }
}

const postTransactionHandler = async (req, res) => {

    // console.log("postTransactionHandler", req)
    try {
        let order;
        //validate paytm checksum

        var paytmChecksum = "";
        var paytmParams = {}

        const received_data = req.body;
        for (var key in received_data) {
            if (key == "CHECKSUMHASH") {
                paytmChecksum = received_data[key];
            } else {
                paytmParams[key] = received_data[key];
            }
        }

        var isValidChecksum = Paytmchecksum.verifySignature(paytmParams, process.env.PAYTM_KEY, paytmChecksum);
        if (!isValidChecksum) {
            res.status(500).send("Some error Occurred")
            return;
        }

        //Update status into Orders table after transaction status

        if (req.body.STATUS == 'TXN_SUCCESS') {
            order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, {
                status: "Paid",
                paymentInfo: JSON.stringify(req.body), transactionId: req.body.TXNID
            })

            let order_details_id = order.order_details_id;

            order_details_id.map(async (item) => {
                const data = await OrderDetails.findById(item)
                await Variation.updateOne({ "subVariation._id": data.product_info._id }, { $inc: { "subVariation.$.qty": -data.quantity } })
                console.log("data", data)
            })
        } else if (req.body.STATUS == 'PENDING') {
            order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, {
                status: "pending",
                paymentInfo: JSON.stringify(req.body), transactionId: req.body.TXNID
            })
        }

        //initiate Shipping

        console.log("order", order)

        //redirect user to the order conformation page
        res.redirect("http://localhost:3000/account-order", 200)
        // res.status(200).json({ body: req.body })
    } catch {
        res.redirect("http://localhost:3000/checkout", 200)
    }
}


module.exports = { preTransactionHandler, postTransactionHandler }
