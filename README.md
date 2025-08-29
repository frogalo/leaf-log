# LeafLogger

A lightweight, customizable logger with colorful output and emoji icons for Node.js applications.

![LeafLogger Preview](https://raw.githubusercontent.com/frogalo/leaf-log/refs/heads/main/preview.png)

## Features

-  Colorful log messages with RGB precision
-  Emoji icons for visual distinction
-  Timestamp support with date
-  Multiple log levels (error, warn, info, success, debug)
-  Configurable debug mode
-  Object logging support
-  Zero dependencies

## Installation

```bash
npm install leaf-logger
```

## Usage

### Basic Usage

```javascript
const LeafLogger = require('leaf-logger');

const logger = LeafLogger();

logger.info('This is an info message');
logger.warn('This is a warning');
logger.error('This is an error');
logger.success('This is a success message');
logger.debug('This is a debug message');
```

### Object Logging

LeafLogger supports logging objects as additional data:

```javascript
const logger = LeafLogger({ level: 'debug' });

// Log an object with your message
logger.info('User login', {
    userId: 12345,
    username: 'john_doe',
    timestamp: new Date().toISOString()
});

logger.error('Database connection failed', {
    host: 'localhost',
    port: 5432,
    error: 'Connection timeout'
});
```

### Configuration

You can customize the logger behavior by passing a configuration object:

```javascript
const logger = LeafLogger({
    level: 'debug',     // Minimum log level to display
    timestamp: true,    // Show timestamps
    colors: true,       // Enable colored output
    icons: true,        // Show emoji icons
    debug: false        // Enable/disable debug messages independently
});
```

### Log Levels

Available log levels (in order of priority):
1. `error` - Critical issues
2. `warn` - Warning messages
3. `info` / `success` - Informational messages
4. `debug` - Debugging information (lowest priority)

When you set a level, all messages at that level and above will be displayed:
```javascript
const logger = LeafLogger({ level: 'info' }); // Shows info, success, warn, error
const debugLogger = LeafLogger({ level: 'debug' }); // Shows all messages
```

### Debug Configuration

The `debug` option allows you to control debug messages independently of the log level:

```javascript
// Enable debug messages regardless of level
const debugLogger = LeafLogger({ 
    level: 'info',
    debug: true  // Debug messages will show even though level is 'info'
});

// Disable debug messages completely
const noDebugLogger = LeafLogger({ 
    level: 'debug',
    debug: false  // Debug messages will not show even though level is 'debug'
});
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `level` | string | `'info'` | Minimum log level (`error`, `warn`, `info`, `success`, `debug`) |
| `timestamp` | boolean | `true` | Show/hide timestamps with date |
| `colors` | boolean | `true` | Enable/disable colored output |
| `icons` | boolean | `true` | Show/hide emoji icons |
| `debug` | boolean | `false` | Enable/disable debug messages independently |

### Examples

#### Minimal Output
```javascript
const minimalLogger = LeafLogger({
    timestamp: false,
    colors: false,
    icons: false
});

minimalLogger.info('Simple message');
// Output: Simple message
```

#### Timestamp Only
```javascript
const timeLogger = LeafLogger({
    colors: false,
    icons: false
});

timeLogger.info('Timestamped message');
// Output: [2025-08-28 16:30:25] Timestamped message
```

#### Colorful with Icons
```javascript
const visualLogger = LeafLogger();

visualLogger.error('Critical error!');
// Output: [2025-08-28 16:30:25] 🍂 Critical error!
```

#### Object Logging
```javascript
const logger = LeafLogger({ level: 'debug' });

logger.info('User action', {
    userId: 12345,
    action: 'file_upload',
    fileName: 'document.pdf',
    fileSize: '2.3MB'
});
// Output: [2025-08-28 16:30:25] 🍃 User action {"userId":12345,"action":"file_upload",...}
```

#### Debug Control
```javascript
const logger = LeafLogger({ 
    level: 'info',
    debug: true
});

logger.info('Info message');
logger.debug('Debug message', { variable: 'value' });
// Output: 
// [2025-08-28 16:30:25] 🍃 Info message
// [2025-08-28 16:30:25] 🌱 Debug message {"variable":"value"}
```

## Log Levels Reference

| Level | Color | Icon | Use Case |
|-------|-------|------|----------|
| `error` | Red | 🍁 | Critical errors and failures |
| `warn` | Amber | 🍂 | Warnings and non-critical issues |
| `info` | Sky Blue | 🍃 | General information |
| `success` | Mint Green | 🌿 | Successful operations |
| `debug` | Lavender | 🌱 | Debugging information |

## License

MIT © 2025