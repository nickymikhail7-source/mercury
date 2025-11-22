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

    const { ticker, type } = req.query;

    if (!ticker) {
        return res.status(400).json({ error: 'Missing ticker' });
    }

    try {
        // Yahoo Finance API
        // We use the 'chart' endpoint which provides quote, meta, and history
        let url = '';
        let range = '1d';
        let interval = '1d';

        if (type === 'history') {
            range = '1mo';
        }

        url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=${interval}&range=${range}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok || !data.chart || !data.chart.result) {
            return res.status(404).json({ error: 'Stock not found' });
        }

        const result = data.chart.result[0];
        const meta = result.meta;
        const quote = result.indicators.quote[0];

        // Map Yahoo data to FMP format expected by frontend
        let mappedData = {};

        if (type === 'quote') {
            mappedData = [{
                symbol: meta.symbol,
                name: meta.shortName || meta.symbol,
                price: meta.regularMarketPrice,
                change: meta.regularMarketPrice - meta.chartPreviousClose,
                changesPercentage: ((meta.regularMarketPrice - meta.chartPreviousClose) / meta.chartPreviousClose) * 100,
                dayHigh: meta.regularMarketDayHigh,
                dayLow: meta.regularMarketDayLow,
                previousClose: meta.chartPreviousClose,
                volume: meta.regularMarketVolume,
                marketCap: 0, // Yahoo chart endpoint doesn't always give mkt cap, we can set 0 or find another source
                pe: 0
            }];
        } else if (type === 'profile') {
            mappedData = [{
                companyName: meta.shortName || meta.symbol,
                symbol: meta.symbol,
                description: `Analysis for ${meta.shortName}. ${meta.instrumentType} trading on ${meta.exchangeName}.`,
                industry: meta.instrumentType,
                sector: meta.exchangeName
            }];
        } else if (type === 'history') {
            const timestamps = result.timestamp;
            const closes = quote.close;

            mappedData = {
                historical: timestamps.map((t, i) => ({
                    date: new Date(t * 1000).toISOString().split('T')[0],
                    close: closes[i]
                })).reverse()
            };
        }

        return res.status(200).json(mappedData);

    } catch (error) {
        console.error('Yahoo Proxy Error:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
