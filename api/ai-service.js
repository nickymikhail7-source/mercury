import axios from 'axios';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-api-key'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { apiKey, model, messages } = req.body;

        if (!apiKey) {
            return res.status(400).json({ error: 'Missing API Key' });
        }

        console.log(`Calling Anthropic API with model: ${model}`);

        const response = await axios.post(
            'https://api.anthropic.com/v1/messages',
            {
                model: model,
                max_tokens: 1024,
                messages: messages
            },
            {
                headers: {
                    'x-api-key': apiKey,
                    'anthropic-version': '2023-06-01',
                    'content-type': 'application/json'
                }
            }
        );

        return res.status(200).json(response.data);

    } catch (error) {
        console.error('Proxy Error:', error.response?.data || error.message);

        const status = error.response?.status || 500;
        const message = error.response?.data?.error?.message || error.message;

        return res.status(status).json({
            error: message,
            details: error.response?.data
        });
    }
}
