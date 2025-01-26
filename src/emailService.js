import { Resend } from 'resend';
import { getConfig } from './config.js';

class EmailService {
  constructor() {
    const config = getConfig();
    this.resend = new Resend(config.resendApiKey);
    this.emailConfig = config.emailConfig;
  }

  async sendErrorNotification(error, aiAnalysis) {
    try {
      const { from, to } = this.emailConfig;
      
      if (!from || !to) {
        console.warn('Email configuration is incomplete. Skipping email notification.');
        return;
      }

      await this.resend.emails.send({
        from,
        to,
        subject: `Error Alert: ${error.message}`,
        html: this.generateEmailTemplate(error, aiAnalysis)
      });
    } catch (error) {
      console.error('Failed to send error notification email:', error);
    }
  }

  generateEmailTemplate(error, aiAnalysis) {
    return `
      <h1>Error Alert</h1>
      <h2>Error Details</h2>
      <pre>${error.stack}</pre>
      
      <h2>AI Analysis</h2>
      <h3>Summary</h3>
      <p>${aiAnalysis.summary}</p>
      
      <h3>Root Cause</h3>
      <p>${aiAnalysis.rootCause}</p>
      
      <h3>Suggested Fix</h3>
      <p>${aiAnalysis.fix}</p>
      
      <h3>Prevention Tips</h3>
      <p>${aiAnalysis.prevention}</p>
    `;
  }
}

export default EmailService;