const {logConsts} = require('./initLogger');
const uuidV4 = require('uuid/v4');
class Logger {
    constructor(opts) {
        this.opts = opts.correlationId;
		if(!this.opts.correlationId)
			this.opts.correlationId = (new Date().getTime()) + '_' + uuidV4();
		this.opts.pid = logConsts.pid;
    }
    async log(msg) {
		const data = {...this.opts,msg:msg,time:new Date().toISOString(),level:'log'};
        console.log(data);
        var txt = await logConsts.ch.publish(logConsts.exchange, '', new Buffer(JSON.stringify(data)));
        return txt;
    }
    async error(msg) {
        const data = {...this.opts,msg:msg,time:new Date().toISOString(),level:'error'};
        console.error(data);
        var txt = await logConsts.ch.publish(logConsts.exchange, '', new Buffer(JSON.stringify(data)));
        return txt;
    }
    async info(msg) {
        const data = {...this.opts,msg:msg,time:new Date().toISOString(),level:'info'};
        console.info(data);
        var txt = await logConsts.ch.publish(logConsts.exchange, '', new Buffer(JSON.stringify(data)));
        return txt;
    }
}
module.exports = Logger;
