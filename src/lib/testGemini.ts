import { generateGeminiResponse } from './gemini';

export async function testGeminiAPI(): Promise<{ success: boolean; message: string }> {
  try {
    console.log('Testing Gemini API...');
    const response = await generateGeminiResponse('Hello, can you help me learn programming?');
    console.log('Gemini API Response:', response);
    
    if (response && response.length > 0) {
      return {
        success: true,
        message: 'Gemini API is working correctly!'
      };
    } else {
      return {
        success: false,
        message: 'Gemini API returned empty response'
      };
    }
  } catch (error) {
    console.error('Gemini API Test Error:', error);
    return {
      success: false,
      message: `Gemini API test failed: ${typeof error === 'object' && error !== null && error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}
