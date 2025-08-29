const defaultConfig = {
    level: 'info',
    timestamp: true,
    colors: true,
    icons: true,
    debug: false,
};

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    success: 2,
    debug: 3,
};

const {formatMessage} = require('./formatter');
const {processData, resolveNestedPromises} = require('./dataHandler');

function LeafLogger(userConfig = {}) {
    const config = {...defaultConfig, ...userConfig};

    function shouldLog(level) {
        if (level === 'debug') return config.debug;
        return levels[level] <= levels[config.level];
    }

    function log(level, message, data = null) {
        if (!shouldLog(level)) return;

        let fullMessage = message;

        if (data !== null) {
            const hasPromises = checkForPromises(data);

            if (hasPromises) {
                handleAsyncLog(level, fullMessage, data).catch(error => {
                    const errorMessage = `Error processing async log: ${error.message}`;
                    const formattedMessage = formatMessage('error', errorMessage, config);
                    console.log(formattedMessage);
                });
                return;
            }

            const borderedData = processData(data);
            if (borderedData) {
                fullMessage += '\n' + borderedData;
            }
        }

        const formattedMessage = formatMessage(level, fullMessage, config);
        console.log(formattedMessage);
    }

    function checkForPromises(obj) {
        if (obj instanceof Promise) return true;
        if (typeof obj !== 'object' || obj === null) return false;

        if (Array.isArray(obj)) {
            return obj.some(item => checkForPromises(item));
        }

        return Object.values(obj).some(value => checkForPromises(value));
    }

    async function handleAsyncLog(level, message, data) {
        try {
            const resolvedData = await resolveNestedPromises(data);
            const borderedData = processData(resolvedData);
            let fullMessage = message;
            if (borderedData) {
                fullMessage += '\n' + borderedData;
            }
            const formattedMessage = formatMessage(level, fullMessage, config);
            console.log(formattedMessage);
        } catch (error) {
            const errorMessage = `Error processing async log: ${error.message}`;
            const formattedMessage = formatMessage('error', errorMessage, config);
            console.log(formattedMessage);
        }
    }

    function createLogMethod(level) {
        return function (message, data = null) {
            log(level, message, data);
        };
    }

    return {
        error: createLogMethod('error'),
        warn: createLogMethod('warn'),
        info: createLogMethod('info'),
        success: createLogMethod('success'),
        debug: createLogMethod('debug'),

        updateConfig(newConfig) {
            Object.assign(config, newConfig);
        }
    };
}

module.exports = LeafLogger;