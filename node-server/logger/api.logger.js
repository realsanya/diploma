import log4js from 'log4js';

const logger = log4js.getLogger();

class APILogger {

    info(message) {
        logger.info(message);
    }

    info(message, data) {
        logger.info(`${message}   ${undefined != data ? JSON.stringify(data) : ''}`);
    }

    error(message) {
        logger.error(message);
    }
};

export default APILogger;