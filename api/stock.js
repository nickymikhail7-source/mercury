export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { ticker, type, apiKey } = req.query;

    if (!ticker || !apiKey) {
        return res.status(400).json({ error: 'Missing ticker or API key' });
    }

    let url = '';
    if (type === 'quote') {
        url = `https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=${apiKey}`;
    } else if (type === 'profile') {
        url = `https://financialmodelingprep.com/api/v3/profile/${ticker}?apikey=${apiKey}`;
    } else if (type === 'history') {
        url = `https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?timeseries=30&apikey=${apiKey}`;
    } else {
        return res.status(400).json({ error: 'Invalid type' });
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ error: data['Error Message'] || 'API Error' });
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
