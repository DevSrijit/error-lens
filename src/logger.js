import chalk from 'chalk';
import boxen from 'boxen';
import gradient from 'gradient-string';
import { OpenAIProvider, GoogleAIProvider } from './ai/providers.js';
import EmailService from './emailService.js';
import { getConfig } from './config.js';

class AIErrorLogger {
  constructor() {
    const config = getConfig();
    this.aiAnalyzer = config.aiProvider === 'google' ? 
      new GoogleAIProvider() : 
      new OpenAIProvider();
    this.emailService = new EmailService();
  }

  logToConsole(error, severity) {
    const colors = {
      error: 'red',
      warning: 'yellow',
      info: 'blue'
    };

    console.log('\n');
    console.log(
      boxen(gradient.passion('ERROR DETECTED'), {
        padding: 1,
        margin: 1,
        borderStyle: 'double',
        borderColor: colors[severity]
      })
    );

    console.log(
      boxen(chalk[colors[severity]](
        `Category: ${this.categorizeError(error)}\n\n` +
        `Message: ${error.message}\n\n` +
        `Stack Trace:\n${error.stack}`
      ), {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: colors[severity],
        title: 'Error Details',
        titleAlignment: 'center'
      })
    );
  }

  logAIAnalysis(analysis) {
    console.log('\n');
    console.log(
      boxen(gradient.cristal('AI ANALYSIS'), {
        padding: 1,
        margin: 1,
        borderStyle: 'double',
        borderColor: 'cyan'
      })
    );

    const sections = [
      { title: 'Summary', content: analysis.summary },
      { title: 'Root Cause', content: analysis.rootCause },
      { title: 'Suggested Fix', content: analysis.fix },
      { title: 'Prevention Tips', content: analysis.prevention }
    ];

    sections.forEach(section => {
      console.log(
        boxen(
          `${gradient.passion(section.title)}\n\n${section.content}`,
          {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'cyan',
            float: 'left',
            width: 80
          }
        )
      );
    });
  }

  categorizeError(error) {
    const categories = {
      'TypeError': 'Type Error',
      'ReferenceError': 'Reference Error',
      'SyntaxError': 'Syntax Error',
      'RangeError': 'Range Error',
      'NetworkError': 'Network Error',
      'Default': 'Unknown Error'
    };

    return categories[error.constructor.name] || categories.Default;
  }

  async logError(error, options = {}) {
    const category = this.categorizeError(error);
    console.log(chalk.blue(`Error Category: ${category}`));
    
    const {
      sendEmail = false,
      codeContext = '',
      severity = 'error'
    } = options;

    // Console logging with color formatting
    this.logToConsole(error, severity);

    // Get AI analysis
    const aiAnalysis = await this.aiAnalyzer.analyzeError(error, codeContext);
    
    if (aiAnalysis) {
      this.logAIAnalysis(aiAnalysis);
    }

    // Send email if requested
    if (sendEmail) {
      await this.emailService.sendErrorNotification(error, aiAnalysis);
    }
  }

  logToConsole(error, severity) {
    const colors = {
      error: 'red',
      warning: 'yellow',
      info: 'blue'
    };

    console.log('\n' + chalk[colors[severity]]('='.repeat(50)));
    console.log(chalk[colors[severity]]('Error Details:'));
    console.log(chalk[colors[severity]]('='.repeat(50)));
    console.error(chalk[colors[severity]](error.stack));
  }

  logAIAnalysis(analysis) {
    console.log('\n' + chalk.cyan('='.repeat(50)));
    console.log(chalk.cyan('AI Analysis:'));
    console.log(chalk.cyan('='.repeat(50)));
    
    console.log(chalk.bold('\nSummary:'));
    console.log(analysis.summary);
    
    console.log(chalk.bold('\nRoot Cause:'));
    console.log(analysis.rootCause);
    
    console.log(chalk.bold('\nSuggested Fix:'));
    console.log(analysis.fix);
    
    console.log(chalk.bold('\nPrevention Tips:'));
    console.log(analysis.prevention);
  }
}

export default AIErrorLogger;