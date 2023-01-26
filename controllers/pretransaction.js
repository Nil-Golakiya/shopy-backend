const https = require('https');
const PaytmChecksum = require('paytmchecksum');

const preTransactionHandler = async (req, res) => {

    if (req.method === "POST") {

        var paytmParams = {};
        const contact_info = req.body.contact_info

        console.log(req.body)

        paytmParams.body = {
            "requestType": "Payment",
            "mid": process.env.PAYTM_MID,
            "websiteName": "SHOPY",
            "orderId": req.body.oid,
            "callbackUrl": `${process.env.HOST}/api/posttransaction`,
            "txnAmount": {
                "value": 1, // req.body.finalPrice,
                "currency": "INR",
            },
            "userInfo": {
                "custId": contact_info.email,
            },
        };

        const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_KEY)
        console.log("checksum",checksum)

        paytmParams.head = {
            "signature": checksum
        };

        var post_data = JSON.stringify(paytmParams);
        console.log('post_data',post_data)
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
                        console.log('Response: ', response);
                        resolve(JSON.parse(response).body);
                    });
                });

                post_req.write(post_data);
                post_req.end();
            })
        }

        let myr = await requestAsync()
        console.log("myr",myr)
        res.status(200).json({ success: true, myr })

    }
}

const postTransactionHandler = async (req, res) => {
    console.log("req.body",req.body)
    res.status(200).json({ body: req.body })
}


module.exports = { preTransactionHandler, postTransactionHandler }
