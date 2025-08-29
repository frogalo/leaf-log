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

const icons = {
    error: '🍁',
    warn: '🍂',
    info: '🍃',
    success: '🌿',
    debug: '🌱',
};

function formatMessage(level, message, config) {
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

module.exports = { formatMessage };