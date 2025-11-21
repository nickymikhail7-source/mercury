import React from 'react';

const markets = [
    { country: "USA", exchanges: "NYSE, NASDAQ", flag: "🇺🇸" },
    { country: "India", exchanges: "NSE, BSE", flag: "🇮🇳" },
    { country: "UK", exchanges: "LSE", flag: "🇬🇧" },
    { country: "Canada", exchanges: "TSX", flag: "🇨🇦" },
    { country: "Germany", exchanges: "XETRA", flag: "🇩🇪" },
    { country: "Japan", exchanges: "TSE", flag: "🇯🇵" },
];

const Markets = () => {
    return (
        <section className="py-16 bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-sm font-semibold text-mercury-blue tracking-wider uppercase mb-8">
                    Global Coverage
                </p>
                <h2 className="text-3xl font-bold text-slate-900 mb-12">Supporting Major Global Exchanges</h2>

                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                    {markets.map((market, index) => (
                        <div key={index} className="flex items-center space-x-3 bg-slate-50 px-6 py-3 rounded-full border border-slate-200 hover:border-mercury-blue transition-colors cursor-default">
                            <span className="text-2xl">{market.flag}</span>
                            <div className="text-left">
                                <div className="font-bold text-slate-900 text-sm">{market.country}</div>
                                <div className="text-xs text-slate-500">{market.exchanges}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Markets;
