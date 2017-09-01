let logConsts = {ch:undefined, exchange:'logs'};
/*
 Params:
 {
 url: connection to amqp server
 exhcange: if override default exchange
 }
 */

const initLogger = (opts) => {
    console.log("initializing logger");
    return new Promise((res,rej) => {
        if (!logConsts.ch) {
            try {
                console.log("INITIALIZTING CHANNEL");
                var amqp = require('amqplib/callback_api');
                const {url, exchange} = opts;
                if (exchange) {
                    params.exchange = exchange;
                }
                amqp.connect(url, function (err, conn) {
                    conn.createChannel(function (err, ch) {
                        logConsts.ch = ch;
                        logConsts.ch.assertExchange(logConsts.exchange, 'fanout', {durable: false});
                        console.log("CHANNEL READY");
                        res();
                    });
                });
            }catch(err) {
                rej(err);
            }
        }
        else {
            res();
        }
    });
    console.log("done initializing logger");

};
module.exports = {initLogger, logConsts};