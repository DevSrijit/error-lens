let config = {
  openaiApiKey: null,
  googleApiKey: null,
  resendApiKey: null,
  emailConfig: {
    from: null,
    to: null,
  },
};

function initializeConfig({
  openaiApiKey,
  googleApiKey,
  resendApiKey,
  emailFrom,
  emailTo,
  aiProvider = "openai",
}) {
  // Check if at least one AI provider is configured
  if (!openaiApiKey && !googleApiKey) {
    throw new Error("Either OpenAI API key or Google API key is required");
  }

  // Validate the selected provider has its key
  if (aiProvider === "openai" && !openaiApiKey) {
    throw new Error("OpenAI API key is required when using OpenAI provider");
  }
  if (aiProvider === "google" && !googleApiKey) {
    throw new Error("Google API key is required when using Google provider");
  }

  if (!resendApiKey) throw new Error("Resend API key is required");

  config.openaiApiKey = openaiApiKey;
  config.googleApiKey = googleApiKey;
  config.resendApiKey = resendApiKey;
  config.aiProvider = aiProvider;
  config.emailConfig.from = emailFrom;
  config.emailConfig.to = emailTo;
}

function getConfig() {
  return config;
}

export { initializeConfig, getConfig };
