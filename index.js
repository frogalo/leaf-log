const defaultConfig = {
    level: 'info',
    timestamp: true,
    colors: true,
    icons: true,
    transports: ['console'],
};

const colors = {
    error: '\x1b[38;2;255;85;85m',
    warn: '\x1b[38;2;255;204;102m',
    info: '\x1b[38;2;102;204;255m',
    success: '\x1b[38;2;102;255;153m',
    debug: '\x1b[38;2;204;153;255m',
    reset: '\x1b[0m',
    dim: '\x1b[2m',
};

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    success: 2,
    debug: 3,
};

const icons = {
    error: '🍂',
    warn: '🍁',
    info: '🍃',
    success: '🌿',
    debug: '🌱',
};

function LeafLogger(userConfig = {}) {
    const config = { ...defaultConfig, ...userConfig };

    function formatMessage(level, message) {
        const time = config.timestamp
            ? new Date().toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            })
            : '';

        const icon = config.icons ? `${icons[level]} ` : '';
        const colorStart = config.colors ? colors[level] : '';
        const colorEnd = config.colors ? colors.reset : '';
        const dimStart = config.colors ? colors.dim : '';
        const dimEnd = config.colors ? colors.reset : '';

        return config.timestamp
            ? `${dimStart}[${time}]${dimEnd} ${colorStart}${icon}${message}${colorEnd}`
            : `${colorStart}${icon}${message}${colorEnd}`;
    }

    function shouldLog(level) {
        return levels[level] <= levels[config.level];
    }

    function log(level, message) {
        if (!shouldLog(level)) return;

        const formattedMessage = formatMessage(level, message);

        if (config.transports.includes('console')) {
            console.log(formattedMessage);
        }

    }

    return {
        error: (message) => log('error', message),
        warn: (message) => log('warn', message),
        info: (message) => log('info', message),
        success: (message) => log('success', message),
        debug: (message) => log('debug', message),
    };
}

module.exports = LeafLogger;