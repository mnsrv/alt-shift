export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { jobTitle, company, skills, details } = req.body;

    // Validate required fields
    if (!jobTitle || !company || !skills || !details) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const prompt = `Write a professional and engaging cover letter with the following details:
    - Position: ${jobTitle}
    - Company: ${company}
    - Key skills and expertise: ${skills}
    - Additional context about the candidate: ${details}
    
    The letter should:
    - Be professional and enthusiastic
    - Highlight how the candidate's skills match the position
    - Be concise but compelling
    - Have a natural, conversational tone
    - Include a proper greeting and closing
    - Be approximately 200-300 words
    - Not use overly generic phrases
    - Focus on value the candidate can bring to the company
    
    Return **only** the complete cover letter with no extra commentary, explanations, or introductory text.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: 'OpenAI API request failed',
        details: response.statusText
      });
    }

    const data = await response.json();
    const generatedText = data.choices?.[0]?.message?.content;

    if (!generatedText) {
      return res.status(500).json({ 
        error: 'Invalid response from OpenAI API',
        details: 'Response missing required content'
      });
    }

    res.status(200).json({ text: generatedText });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Failed to process request',
      details: error.message
    });
  }
}
