# AI Error Lens

An advanced error logging package that provides AI-powered insights into your application errors, with email notification capabilities.

## Features

- 🤖 AI-powered error analysis using GPT-4
- 📧 Email notifications for errors
- 🎨 Beautiful console formatting
- 🔍 Detailed error insights and fix suggestions
- 🧩 Code context analysis using embeddings

## Installation

```bash
npm install ai-error-lens
```

## Usage

1. Initialize the configuration:

```javascript
import { initializeConfig } from 'ai-error-lens';
initializeConfig({
openaiApiKey: 'your-openai-api-key',
resendApiKey: 'your-resend-api-key',
emailFrom: 'errors@yourdomain.com',
emailTo: 'developer@yourdomain.com'
});
```

2. Use the error logger:

```javascript
import { AIErrorLogger } from 'ai-error-lens';
try {
// Your code here
} catch (error) {
const logger = new AIErrorLogger();
await logger.logError(error, {
sendEmail: true,
severity: 'error'
});
}
```

3. Use the error boundary wrapper:

```javascript
import { withErrorLogging } from 'ai-error-lens';
const riskyFunction = () => {
// Your code that might throw an error
};
// Wrap the function with error logging
const safeFunctionWithLogging = withErrorLogging(riskyFunction, {
sendEmail: true,
severity: 'error'
});
// Use the wrapped function
await safeFunctionWithLogging();
```

## License

MIT