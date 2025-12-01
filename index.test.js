import {
  jest,
  describe,
  test,
  expect,
  beforeEach,
  afterEach,
} from '@jest/globals';
import LeafLogger from './index.js';

describe('LeafLogger', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('should log info message with default config', () => {
    const logger = LeafLogger();
    logger.info('Test message');
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Test message')
    );
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('🍃'));
  });

  test('should not log debug message by default', () => {
    const logger = LeafLogger();
    logger.debug('Debug message');
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test('should log debug message when debug is enabled', () => {
    const logger = LeafLogger({ debug: true });
    logger.debug('Debug message');
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Debug message')
    );
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('🌱'));
  });

  test('should respect log levels', () => {
    const logger = LeafLogger({ level: 'warn' });
    logger.info('Info message');
    logger.warn('Warn message');

    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('Info message')
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Warn message')
    );
  });

  test('should format data objects', () => {
    const logger = LeafLogger({
      timestamp: false,
      colors: false,
      icons: false,
    });
    logger.info('Data message', { key: 'value' });

    const output = consoleSpy.mock.calls[0][0];
    expect(output).toContain('Data message');
    expect(output).toContain('"key": "value"');
  });

  test('should handle nested promises', async () => {
    const logger = LeafLogger({
      timestamp: false,
      colors: false,
      icons: false,
    });
    const promise = Promise.resolve('resolved value');

    await logger.info('Async message', { data: promise });

    // Wait for async processing
    await new Promise((resolve) => setTimeout(resolve, 0));

    const output = consoleSpy.mock.calls[0][0];
    expect(output).toContain('Async message');
    expect(output).toContain('resolved value');
  });

  test('should update config dynamically', () => {
    const logger = LeafLogger({ level: 'error' });
    logger.info('Initial info');
    expect(consoleSpy).not.toHaveBeenCalled();

    logger.updateConfig({ level: 'info' });
    logger.info('Updated info');
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Updated info')
    );
  });
});
