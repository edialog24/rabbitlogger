let logConsts = {ch:undefined, exchange:'logs', source:''};
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
                const {url, exchange, source} = opts;
                logConsts.source = source;
                if (exchange) {
                    params.exchange = exchange;
                }
                amqp.connect(url, function (err, conn) {
                    conn.createChannel(function (err, ch) {
                        logConsts.ch = ch;
                        logConsts.ch.assertExchange(logConsts.exchange, 'fanout', {durable: false});
                        console.log("LOGGER READY");
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
};
module.exports = {initLogger, logConsts};