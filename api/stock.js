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

    if (!ticker) {
        return res.status(400).json({ error: 'Missing ticker' });
    }

    // For FMP requests, require API key
    const FMP_API_KEY = apiKey || process.env.FMP_API_KEY;

    try {
        // Handle news requests
        if (type === 'news') {
            // Use Yahoo Finance RSS feed for news (free, no API key needed)
            const newsUrl = `https://feeds.finance.yahoo.com/rss/2.0/headline?s=${ticker}&region=US&lang=en-US`;

            try {
                const response = await fetch(newsUrl);
                const text = await response.text();

                // Parse RSS XML (simple regex parsing)
                const items = [];
                const itemRegex = /<item>(.*?)<\/item>/gs;
                const matches = text.matchAll(itemRegex);

                for (const match of matches) {
                    const itemXml = match[1];
                    const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
                    const linkMatch = itemXml.match(/<link>(.*?)<\/link>/);
                    const pubDateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/);

                    if (titleMatch && linkMatch) {
                        items.push({
                            title: titleMatch[1],
                            link: linkMatch[1],
                            pubDate: pubDateMatch ? pubDateMatch[1] : ''
                        });
                    }
                }

                return res.status(200).json(items.slice(0, 5));
            } catch (error) {
                console.error('News fetch error:', error);
                return res.status(200).json([]); // Return empty array on error
            }
        }

        // Use FMP API for stock data (more reliable than Yahoo Finance)
        if (type === 'quote') {
            if (!FMP_API_KEY) {
                return res.status(400).json({ error: 'Missing FMP API key' });
            }

            // Fetch quote data from FMP
            const quoteUrl = `https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=${FMP_API_KEY}`;
            const response = await fetch(quoteUrl);
            const quoteData = await response.json();

            if (!response.ok || !quoteData || quoteData.length === 0) {
                return res.status(404).json({ error: 'Stock not found' });
            }

            const quote = quoteData[0];

            const mappedData = [{
                symbol: quote.symbol,
                name: quote.name,
                price: quote.price,
                change: quote.change,
                changesPercentage: quote.changesPercentage,
                dayHigh: quote.dayHigh,
                dayLow: quote.dayLow,
                previousClose: quote.previousClose,
                volume: quote.volume,
                marketCap: quote.marketCap,
                pe: quote.pe,
                eps: quote.eps,
                dividendYield: quote.dividendYield || null,
                fiftyTwoWeekHigh: quote.yearHigh,
                fiftyTwoWeekLow: quote.yearLow
            }];

            return res.status(200).json(mappedData);
        } else if (type === 'profile') {
            if (!FMP_API_KEY) {
                return res.status(400).json({ error: 'Missing FMP API key' });
            }

            // Fetch company profile from FMP
            const profileUrl = `https://financialmodelingprep.com/api/v3/profile/${ticker}?apikey=${FMP_API_KEY}`;
            const response = await fetch(profileUrl);
            const profileData = await response.json();

            if (!response.ok || !profileData || profileData.length === 0) {
                return res.status(404).json({ error: 'Stock not found' });
            }

            const profile = profileData[0];

            const mappedData = [{
                companyName: profile.companyName,
                symbol: profile.symbol,
                description: profile.description,
                industry: profile.industry,
                sector: profile.sector
            }];

            return res.status(200).json(mappedData);
        } else if (type === 'history') {
            if (!FMP_API_KEY) {
                return res.status(400).json({ error: 'Missing FMP API key' });
            }

            // Fetch historical data from FMP (last 30 days)
            const historyUrl = `https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?apikey=${FMP_API_KEY}`;
            const response = await fetch(historyUrl);
            const historyData = await response.json();

            if (!response.ok || !historyData || !historyData.historical) {
                return res.status(404).json({ error: 'Stock not found' });
            }

            const mappedData = {
                historical: historyData.historical.slice(0, 30).map(item => ({
                    date: item.date,
                    close: item.close
                })).reverse()
            };

            return res.status(200).json(mappedData);
        }

        return res.status(400).json({ error: 'Invalid type parameter' });

    } catch (error) {
        console.error('FMP Proxy Error:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
