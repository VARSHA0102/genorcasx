import { VercelRequest, VercelResponse } from '@vercel/node';
import { encoding_for_model } from '@dqbd/tiktoken';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const encoder = encoding_for_model('gpt-4o');
    const tokenIds = encoder.encode(text);
    const tokens = tokenIds.map(id => encoder.decode([id]));

    // Generate smooth color for each token
    const colorizedHtml = tokens.map((token, i) => {
      const hue = (i * 37) % 360; // rotate hue for variety
      const color = `hsl(${hue}, 70%, 60%)`;
      return `<span style="color:${color}; padding:0 2px;">${token}</span>`;
    }).join('');

    res.status(200).json({
      success: true,
      html: `<div style="font-family:monospace; line-height:1.6;">${colorizedHtml}</div>`
    });
  } catch (error) {
    console.error('Tokenization error:', error);
    res.status(500).json({ error: 'Failed to tokenize text using GPT-4o tokenizer' });
  }
}