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
        // Handle news requests
        if (type === 'news') {
            // Use Yahoo Finance RSS feed for news
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

        // Yahoo Finance API for stock data
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

        // For quote type, also fetch key statistics
        if (type === 'quote') {
            try {
                // Fetch summary detail for PE ratio and other metrics
                const statsUrl = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?modules=defaultKeyStatistics,summaryDetail`;
                const statsResponse = await fetch(statsUrl);
                const statsData = await statsResponse.json();

                const stats = statsData?.quoteSummary?.result?.[0] || {};
                const keyStats = stats.defaultKeyStatistics || {};
                const summary = stats.summaryDetail || {};

                const mappedData = [{
                    symbol: meta.symbol,
                    name: meta.shortName || meta.symbol,
                    price: meta.regularMarketPrice,
                    change: meta.regularMarketPrice - meta.chartPreviousClose,
                    changesPercentage: ((meta.regularMarketPrice - meta.chartPreviousClose) / meta.chartPreviousClose) * 100,
                    dayHigh: meta.regularMarketDayHigh,
                    dayLow: meta.regularMarketDayLow,
                    previousClose: meta.chartPreviousClose,
                    volume: meta.regularMarketVolume,
                    marketCap: summary.marketCap?.raw || 0,
                    pe: summary.trailingPE?.raw || keyStats.trailingPE?.raw || null,
                    eps: keyStats.trailingEps?.raw || null,
                    dividendYield: summary.dividendYield?.raw || summary.dividendRate?.raw || null,
                    fiftyTwoWeekHigh: summary.fiftyTwoWeekHigh?.raw || null,
                    fiftyTwoWeekLow: summary.fiftyTwoWeekLow?.raw || null
                }];

                return res.status(200).json(mappedData);
            } catch (statsError) {
                console.error('Stats fetch error:', statsError);
                // Fallback to basic data
                const mappedData = [{
                    symbol: meta.symbol,
                    name: meta.shortName || meta.symbol,
                    price: meta.regularMarketPrice,
                    change: meta.regularMarketPrice - meta.chartPreviousClose,
                    changesPercentage: ((meta.regularMarketPrice - meta.chartPreviousClose) / meta.chartPreviousClose) * 100,
                    dayHigh: meta.regularMarketDayHigh,
                    dayLow: meta.regularMarketDayLow,
                    previousClose: meta.chartPreviousClose,
                    volume: meta.regularMarketVolume,
                    marketCap: 0,
                    pe: null,
                    eps: null,
                    dividendYield: null,
                    fiftyTwoWeekHigh: null,
                    fiftyTwoWeekLow: null
                }];
                return res.status(200).json(mappedData);
            }
        } else if (type === 'profile') {
            const mappedData = [{
                companyName: meta.shortName || meta.symbol,
                symbol: meta.symbol,
                description: `Analysis for ${meta.shortName}. ${meta.instrumentType} trading on ${meta.exchangeName}.`,
                industry: meta.instrumentType,
                sector: meta.exchangeName
            }];
            return res.status(200).json(mappedData);
        } else if (type === 'history') {
            const timestamps = result.timestamp;
            const closes = quote.close;

            const mappedData = {
                historical: timestamps.map((t, i) => ({
                    date: new Date(t * 1000).toISOString().split('T')[0],
                    close: closes[i]
                })).reverse()
            };
            return res.status(200).json(mappedData);
        }

    } catch (error) {
        console.error('Yahoo Proxy Error:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
