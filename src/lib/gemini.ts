const GEMINI_API_KEY = 'AIzaSyDrmO90ZUirLFkD173GQhOJt6JetIU349c';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
    finishReason?: string;
  }>;
  promptFeedback?: {
    blockReason?: string;
  };
}

// Fallback responses for when API fails
const getFallbackResponse = (prompt: string, context?: string): string => {
  const input = prompt.toLowerCase();
  
  if (input.includes('explain') && context) {
    return `Let me explain ${context} in simple terms:\n\n${context} is a fundamental concept in programming and web development. It's essential for building modern applications and understanding how different technologies work together.\n\nKey points to remember:\n• Start with the basics and build your understanding gradually\n• Practice with hands-on examples\n• Don't hesitate to ask questions when you get stuck\n• Join community forums for additional support\n\nWould you like me to break down any specific aspect of ${context}?`;
  }
  
  if (input.includes('resources') || input.includes('help')) {
    return `Here are some helpful learning resources:\n\n📚 **Official Documentation**\n• Check the official docs for the most up-to-date information\n• Look for getting started guides and tutorials\n\n🎥 **Video Tutorials**\n• YouTube has many free, high-quality tutorials\n• Look for channels with good ratings and recent uploads\n\n💻 **Practice Projects**\n• Start with simple projects and gradually increase complexity\n• Build real-world applications to apply your knowledge\n\n👥 **Community Support**\n• Stack Overflow for specific questions\n• Reddit communities for discussions\n• Discord/Slack channels for real-time help\n\nWould you like me to suggest specific resources for any particular topic?`;
  }
  
  if (input.includes('problem') || input.includes('error') || input.includes('stuck')) {
    return `It's completely normal to encounter problems while learning! Here are some strategies that usually help:\n\n🔍 **Debugging Steps**\n• Read error messages carefully - they often point to the solution\n• Check your code for typos and syntax errors\n• Use console.log() to track variable values\n\n🛠️ **Problem-Solving Approach**\n• Break the problem into smaller parts\n• Search for similar issues online\n• Ask specific questions in community forums\n• Take breaks - sometimes fresh eyes help!\n\n📖 **Learning Resources**\n• Review the documentation\n• Look for examples in the official guides\n• Practice with simpler versions first\n\nWhat specific problem are you facing? I'd be happy to help you work through it step by step.`;
  }
  
  return `I understand you're asking about "${prompt}". That's a great question! While I can provide general guidance, here are some ways to get the most helpful information:\n\n• Check the official documentation for detailed explanations\n• Look for tutorials and examples online\n• Practice with hands-on exercises\n• Join community discussions for real-world insights\n• Don't hesitate to ask specific questions - the more detailed, the better!\n\nIs there a particular aspect of this topic you'd like me to help clarify?`;
};

export async function generateGeminiResponse(prompt: string, context?: string): Promise<string> {
  try {
    const fullPrompt = context 
      ? `You are a helpful coding tutor. Context: ${context}\n\nUser Question: ${prompt}\n\nPlease provide a helpful, educational response about this programming topic. Keep it concise but informative.`
      : `You are a helpful coding tutor. User Question: ${prompt}\n\nPlease provide a helpful, educational response about programming. Keep it concise but informative.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: fullPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 512,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      return getFallbackResponse(prompt, context);
    }

    const data: GeminiResponse = await response.json();
    
    // Check if response was blocked
    if (data.promptFeedback?.blockReason) {
      console.warn('Response blocked by safety filters:', data.promptFeedback.blockReason);
      return getFallbackResponse(prompt, context);
    }
    
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content?.parts?.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.warn('No valid response from Gemini API');
      return getFallbackResponse(prompt, context);
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return getFallbackResponse(prompt, context);
  }
}

export async function generateLearningExplanation(topic: string, level: 'beginner' | 'intermediate' | 'advanced' = 'beginner'): Promise<string> {
  const prompt = `Explain "${topic}" in a simple, educational way for a ${level} level developer. Include practical examples and next steps for learning.`;
  return generateGeminiResponse(prompt);
}

export async function generateResourceSuggestions(topic: string): Promise<string> {
  const prompt = `Provide a list of helpful learning resources for "${topic}" including official documentation, tutorials, practice projects, and community resources. Format as a clear, organized list.`;
  return generateGeminiResponse(prompt);
}

export async function generateTroubleshootingHelp(topic: string, problem: string): Promise<string> {
  const prompt = `Help troubleshoot this problem with "${topic}": "${problem}". Provide step-by-step solutions and common causes.`;
  return generateGeminiResponse(prompt);
}
