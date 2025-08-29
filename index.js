const defaultConfig = {
    level: 'info',
    timestamp: true,
    colors: true,
    icons: true,
    transports: ['console'],
    debug: false,
};

const colors = {
    error: '\x1b[38;2;255;85;85m',
    warn: '\x1b[38;2;255;204;102m',
    info: '\x1b[38;2;102;204;255m',
    success: '\x1b[38;2;102;255;153m',
    debug: '\x1b[38;2;204;153;255m',
    reset: '\x1b[0m',
    dim: '\x1b[2m',
    timestamp: '\x1b[38;2;176;138;95m',
};

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    success: 2,
    debug: 3,
};

const icons = {
    error: '🍁',
    warn: '🍂',
    info: '🍃',
    success: '🌿',
    debug: '🌱',
};

function LeafLogger(userConfig = {}) {
    const config = {...defaultConfig, ...userConfig};

    function formatMessage(level, message) {
        const time = config.timestamp
            ? new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            })
            : '';

        const icon = config.icons ? `${icons[level]} ` : '';
        const colorStart = config.colors ? colors[level] : '';
        const colorEnd = config.colors ? colors.reset : '';
        const timestampColorStart = config.colors ? colors.timestamp : '';
        const timestampColorEnd = config.colors ? colors.reset : '';

        return config.timestamp
            ? `${timestampColorStart}[${time}]${timestampColorEnd} ${colorStart}${icon}${message}${colorEnd}`
            : `${colorStart}${icon}${message}${colorEnd}`;
    }

    function shouldLog(level) {
        if (level === 'debug' && config.debug === true) {
            return true;
        }

        if (level === 'debug' && config.debug === false) {
            return false;
        }

        return levels[level] <= levels[config.level];
    }

    async function log(level, message, data = null) {
        if (!shouldLog(level)) return;

        let fullMessage = message;

        if (data !== null) {
            const resolvedData = data instanceof Promise ? await data : data;
            fullMessage += ' ' + JSON.stringify(resolvedData, null, 2);
        }

        const formattedMessage = formatMessage(level, fullMessage);

        if (config.transports.includes('console')) {
            console.log(formattedMessage);
        }
    }

    return {
        error: async (message, data) => log('error', message, data),
        warn: async (message, data) => log('warn', message, data),
        info: async (message, data) => log('info', message, data),
        success: async (message, data) => log('success', message, data),
        debug: async (message, data) => log('debug', message, data),
    };
}

module.exports = LeafLogger;