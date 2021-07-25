var amqp = require('amqplib/callback_api');
const ZonePlcLivedata = require("../models/zone_plc_livedata");
module.exports = {
    config: () => {
        console.log("rabbit setup done.")
        amqp.connect('amqp://localhost', function (error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }
                var queue = process.env._TOPIC_;
                channel.assertQueue(queue, {
                    durable: false
                });
                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
                channel.consume(queue, function (msg) {
                    console.log(" [x] Received ");
                    //console.log(" [x] Received %s", msg.content.toString());
                    temp = JSON.parse(msg.content.toString());
                    //console.log(JSON.parse(temp.data));
                    const zonePlcLivedata = new ZonePlcLivedata(
                        {
                            ...(JSON.parse(temp.data))
                        }
                    )
                    zonePlcLivedata.save((err, doc) => {
                        if (err) {
                            console.log(err);
                        } else {
                            //console.log(doc)
                        }
                    })

                }, {
                    noAck: true
                });
            });
        });

    }
}
 //new Test.save({...temp});
 //console.log(JSON.stringify(msg.content));

// {
//     "plcId": "1124456790",
//     "name": "Sasmita Pradhan",
//     "email": "sasmita6@gmail.com",
//     "phone": "8342834880",
//     "password": "Sasmita123",
//     "role":"USER",
//     "department":"HRD",
//     "designation":"Head"
// },

// {
//     "plcId": "1124456789",
//     "name": "Tapaswini kar",
//     "email": "kar.tapaswini1111@gmail.com",
//     "phone": 6371271829,
//     "password": "Tapu1234",
//     "role":"USER",
//     "department":"IT",
//     "designation":"Head"
// }
// {
//     "plcId": "",
//     "name": "Admin",
//     "email": "admin@gmail.com",
//     "phone": 7371271828,
//     "password": "Admin1234",
//     "role":"ADMIN",
//     "department":"HRD",
//     "designation":"ADMIN"
// }