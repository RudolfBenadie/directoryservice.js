var Tortoise = require('tortoise')
var tortoise = new Tortoise('amqp://jnb-pc1');

tortoise
    .queue('iLoan')
    .prefetch(1)
    .json()  // Decodes message from JSON
    .subscribe(function (msg, ack, nack) {
        console.log(msg.url);
        ack() // or nack()
    });
