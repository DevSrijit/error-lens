import { initializeConfig } from './config.js';
import AIErrorLogger from './logger.js';

// Error boundary component/function for wrapping code
function withErrorLogging(fn, options = {}) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      const logger = new AIErrorLogger();
      await logger.logError(error, {
        ...options,
        codeContext: fn.toString()
      });
      throw error; // Re-throw the error after logging
    }
  };
}

export {
  initializeConfig,
  AIErrorLogger,
  withErrorLogging
};