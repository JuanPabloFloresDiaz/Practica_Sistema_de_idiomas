const pino = require('pino');
const { ENV } = require('./env.js');

const logger = pino({
    level: ENV.LOG_LEVEL,
    base: {
        pid: false,
    },
    transport: {
        target: 'pino-pretty',
    },
});

module.exports = { logger };
