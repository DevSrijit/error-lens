import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getConfig } from '../config.js';

class BaseAIProvider {
  async analyzeError(error, codeContext) {
    throw new Error('Method not implemented');
  }
}

class OpenAIProvider extends BaseAIProvider {
  constructor() {
    super();
    const config = getConfig();
    this.openai = new OpenAI({
      apiKey: config.openaiApiKey,
    });
  }

  async analyzeError(error, codeContext) {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert developer helping to analyze and fix errors. Provide detailed, structured analysis.'
          },
          {
            role: 'user',
            content: `
              Error: ${error.message}
              Stack: ${error.stack}
              Code Context: ${codeContext}
              
              Please provide:
              1. Error Summary
              2. Root Cause Analysis
              3. Suggested Fix
              4. Prevention Tips
            `
          }
        ],
        temperature: 0.7
      });

      return this.formatResponse(response.choices[0].message.content);
    } catch (error) {
      console.error('Error analyzing with OpenAI:', error);
      return null;
    }
  }

  formatResponse(content) {
    const sections = content.split('\n');
    return {
      summary: sections.find(s => s.includes('Summary'))?.replace('Summary:', '').trim(),
      rootCause: sections.find(s => s.includes('Root Cause'))?.replace('Root Cause:', '').trim(),
      fix: sections.find(s => s.includes('Fix'))?.replace('Fix:', '').trim(),
      prevention: sections.find(s => s.includes('Prevention'))?.replace('Prevention:', '').trim()
    };
  }
}

class GoogleAIProvider extends BaseAIProvider {
  constructor() {
    super();
    const config = getConfig();
    this.genAI = new GoogleGenerativeAI(config.googleApiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async analyzeError(error, codeContext) {
    try {
      const prompt = `
        Analyze this error and provide a structured response in exactly this format:
        Summary: [brief error description]
        Root Cause: [detailed cause analysis, point to where the error took place ONLY if you have code context]
        Fix: [suggested solution]
        Prevention: [how to prevent this in future, provide corrected code snippet with the fix]

        Error details:
        Error: ${error.message}
        Stack: ${error.stack}
        Code Context: ${codeContext}
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return this.formatResponse(response.text());
    } catch (error) {
      console.error('Error analyzing with Google AI:', error);
      return null;
    }
  }

  formatResponse(content) {
    // More robust parsing of sections
    const sections = {
      summary: content.match(/Summary:\s*(.*?)(?=Root Cause:|$)/s)?.[1]?.trim() || 'No summary available',
      rootCause: content.match(/Root Cause:\s*(.*?)(?=Fix:|$)/s)?.[1]?.trim() || 'No root cause analysis available',
      fix: content.match(/Fix:\s*(.*?)(?=Prevention:|$)/s)?.[1]?.trim() || 'No fix suggestion available',
      prevention: content.match(/Prevention:\s*(.*?)$/s)?.[1]?.trim() || 'No prevention tips available'
    };

    return sections;
  }
}

export { OpenAIProvider, GoogleAIProvider };