const LeafLogger = require('./index.js');

const leaf = LeafLogger({
    level: 'info',
    timestamp: true,
    colors: true,
    icons: true,
});

console.log('=== Default Logger ===');
leaf.info('This is an info message');
leaf.warn('This is a warning');
leaf.error('This is an error');
leaf.success('This is a success message');
leaf.debug('This is a debug message (should not appear)');

const debugLeaf = LeafLogger({
    level: 'info',
    timestamp: true,
    colors: true,
    icons: true,
    debug: true,
});

console.log('\n=== Debug Logger ===');
debugLeaf.info('This is an info message');
debugLeaf.warn('This is a warning');
debugLeaf.error('This is an error');
debugLeaf.success('This is a success message');
debugLeaf.debug('This is a debug message (should appear now)');

const minimalLeaf = LeafLogger({
    level: 'info',
    timestamp: true,
    colors: false,
    icons: false,
});

console.log('\n=== Minimal Logger ===');
minimalLeaf.info('This is an info message');
minimalLeaf.warn('This is a warning');
minimalLeaf.error('This is an error');
minimalLeaf.success('This is a success message');

const iconsOnlyLeaf = LeafLogger({
    level: 'info',
    timestamp: true,
    colors: false,
    icons: true,
});

console.log('\n=== Icons Only Logger ===');
iconsOnlyLeaf.info('This is an info message');
iconsOnlyLeaf.warn('This is a warning');
iconsOnlyLeaf.error('This is an error');
iconsOnlyLeaf.success('This is a success message');

const noTimeLeaf = LeafLogger({
    level: 'info',
    timestamp: false,
    colors: true,
    icons: true,
});

console.log('\n=== No Timestamp Logger ===');
noTimeLeaf.info('This is an info message');
noTimeLeaf.warn('This is a warning');
noTimeLeaf.error('This is an error');
noTimeLeaf.success('This is a success message');

// Additional test for debug disabled
const debugDisabledLeaf = LeafLogger({
    level: 'debug',
    timestamp: true,
    colors: true,
    icons: true,
    debug: false,
});

console.log('\n=== Debug Disabled Logger ===');
debugDisabledLeaf.info('This is an info message');
debugDisabledLeaf.warn('This is a warning');
debugDisabledLeaf.error('This is an error');
debugDisabledLeaf.success('This is a success message');
debugDisabledLeaf.debug('This is a debug message (should not appear despite level=debug)');

// Test object logging
const objectLeaf = LeafLogger({
    level: 'debug',
    timestamp: true,
    colors: true,
    icons: true,
});

console.log('\n=== Object Logging Test ===');
objectLeaf.info('User login', {
    userId: 12345,
    username: 'john_doe',
    timestamp: new Date().toISOString(),
    ip: '192.168.1.1'
});

objectLeaf.error('Database connection failed', {
    host: 'localhost',
    port: 5432,
    database: 'myapp',
    error: 'Connection timeout'
});

objectLeaf.debug('API request', {
    method: 'GET',
    url: '/api/users/123',
    headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer token123'
    },
    queryParams: {
        limit: 10,
        offset: 0
    }
});

objectLeaf.warn('Deprecated feature used', {
    feature: 'getUserInfo',
    version: '1.0.0',
    replacement: 'getUserProfile',
    expires: '2025-12-31'
});