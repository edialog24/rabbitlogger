const {logConsts} = require('./initLogger');
class Logger {
    constructor(opts) {
        this.correlationId = opts.correlationId;
    }
    async log(msg) {
        const data = {correlationId: this.correlationId, msg:msg,time:new Date().toISOString(), pid: logConsts.pid, type: 'log'};
        console.log(data);
        var txt = await logConsts.ch.publish(logConsts.exchange, '', new Buffer(JSON.stringify(data)));
        return txt;
    }
    async error(msg) {
        const data = {correlationId: this.correlationId, msg:msg,time:new Date().toISOString(), pid: logConsts.pid, type: 'error'};
        console.log(data);
        var txt = await logConsts.ch.publish(logConsts.exchange, '', new Buffer(JSON.stringify(data)));
        return txt;
    }
    async info(msg) {
        const data = {correlationId: this.correlationId, msg:msg,time:new Date().toISOString(), pid: logConsts.pid, type: 'info'};
        console.log(data);
        var txt = await logConsts.ch.publish(logConsts.exchange, '', new Buffer(JSON.stringify(data)));
        return txt;
    }
}
module.exports = Logger;
