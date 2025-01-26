# Error Lens: Enterprise-Grade Error Intelligence Platform

Error Lens is an advanced error observability and analysis platform that leverages state-of-the-art AI models to provide real-time insights into application errors. By combining sophisticated error tracking with AI-powered analysis, it enables development teams to identify, understand, and resolve issues efficiently in both development and production environments.

## Core Capabilities

- **AI-Powered Analysis Engine**
  - Dual AI provider support (OpenAI GPT-4 / Google Gemini-Pro)
  - Contextual error pattern recognition
  - Intelligent root cause analysis
  - Code context evaluation using semantic embeddings

- **Advanced Error Telemetry**
  - Real-time error capture and categorization
  - Structured error classification system
  - Comprehensive stack trace analysis
  - Context-aware error grouping

- **Enterprise Notification System**
  - Configurable email notification pipeline
  - Severity-based alert routing
  - Rich error context in notifications
  - Customizable notification templates

- **Developer Experience**
  - Rich console output with advanced formatting
  - Intuitive error boundary patterns
  - Flexible integration options
  - Minimal configuration overhead

## Installation

```bash
npm install error-lens
```

## Integration Guide

### 1. Platform Configuration

Initialize the Error Lens platform with your environment-specific configuration:

```javascript
import { initializeConfig } from 'error-lens';

initializeConfig({
  // AI Provider Configuration
  openaiApiKey: process.env.OPENAI_API_KEY,      // Required for OpenAI integration
  googleApiKey: process.env.GOOGLE_API_KEY,      // Required for Google AI integration
  aiProvider: 'google',                          // AI provider selection ('google' | 'openai')

  // Notification Configuration
  resendApiKey: process.env.RESEND_API_KEY,      // Required for email notifications
  emailFrom: 'error-alerts@yourdomain.com',      // Sender email address
  emailTo: 'engineering@yourdomain.com',         // Recipient email address
});
```

### 2. Direct Error Logging Integration

Implement error logging with granular control over error handling behavior:

```javascript
import { AIErrorLogger } from 'error-lens';

try {
  await performCriticalOperation();
} catch (error) {
  const logger = new AIErrorLogger();
  await logger.logError(error, {
    sendEmail: true,                    // Enable email notifications
    severity: 'error',                  // Set error severity ('error' | 'warning' | 'info')
    codeContext: 'Optional context'     // Provide additional context for AI analysis
  });
}
```

### 3. Higher-Order Error Boundary Pattern

Implement systematic error handling across function boundaries:

```javascript
import { withErrorLogging } from 'error-lens';

// Define your business logic
const criticalOperation = async (params) => {
  // Your implementation
};

// Apply error boundary with custom configuration
const safeCriticalOperation = withErrorLogging(criticalOperation, {
  sendEmail: true,
  severity: 'error',
  metadata: {
    component: 'PaymentProcessor',
    priority: 'high'
  }
});

// Execute with error handling
await safeCriticalOperation(operationParams);
```

## Advanced Configuration

### Error Classification

Error Lens implements a sophisticated error classification system that automatically categorizes errors based on their type and context:

- `TypeError`: Type-related runtime errors (e.g., attempting operations on incompatible types)
- `ReferenceError`: Invalid reference access (e.g., accessing undefined variables)
- `SyntaxError`: Code parsing failures (e.g., invalid JavaScript syntax)
- `RangeError`: Out-of-bounds numerical operations (e.g., invalid array lengths)
- `URIError`: URI encoding/decoding errors (e.g., malformed URI components)
- `EvalError`: Errors occurring in eval() function execution
- `NetworkError`: Communication failures (e.g., failed API requests, connection issues)
- `AggregateError`: Multiple errors wrapped in a single error object
- `InternalError`: JavaScript engine internal errors
- `WebAssemblyError`: Errors in WebAssembly operations
- `AbortError`: Operation cancellation errors (e.g., aborted fetch requests)
- `TimeoutError`: Operation timeout errors (e.g., exceeded time limits)
- `SecurityError`: Security violation errors (e.g., cross-origin violations)
- `ValidationError`: Data validation failures (e.g., invalid input format)
- `DatabaseError`: Database operation failures (e.g., connection errors, query failures)

Each error category is color-coded in the console output for quick identification. Unknown error types are automatically categorized as 'Unknown Error' for comprehensive error tracking.

### AI Analysis Pipeline

The AI analysis pipeline provides multi-faceted error insights:

1. **Error Context Analysis**: Evaluates the error in the context of your codebase
2. **Root Cause Identification**: Determines the underlying cause of the error
3. **Solution Recommendations**: Provides actionable fix suggestions
4. **Prevention Strategies**: Offers long-term mitigation strategies

## License

MIT License - See LICENSE file for details.

---

*Error Lens is designed for development teams that require sophisticated error handling capabilities with AI-powered insights. While powerful, it should be integrated thoughtfully into your error handling strategy.*
