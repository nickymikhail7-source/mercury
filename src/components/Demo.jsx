import React, { useState } from 'react';
import { Search, ArrowUpRight, Check, AlertCircle } from 'lucide-react';

const Demo = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <section id="demo" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Experience the Power of AI</h2>
                    <p className="text-lg text-slate-600">Try it yourself. See how Mercury analyzes stocks in real-time.</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Search Interface */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                            <div className="relative">
                                <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Try: AAPL, RELIANCE.NS, TSLA, MSFT"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-mercury-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-700"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Mock Result */}
                        <div className="p-6 md:p-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                <div>
                                    <div className="flex items-center space-x-3 mb-1">
                                        <h3 className="text-2xl font-bold text-slate-900">Apple Inc.</h3>
                                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">AAPL</span>
                                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded">NASDAQ</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-3xl font-bold text-slate-900">$182.63</span>
                                        <span className="flex items-center text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                                            <ArrowUpRight className="h-4 w-4 mr-1" />
                                            +1.25%
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 flex items-center space-x-2">
                                    <div className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-lg font-bold flex items-center">
                                        <Check className="h-5 w-5 mr-2" />
                                        Bullish Outlook
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <h4 className="font-semibold text-mercury-blue mb-2 flex items-center">
                                        <span className="w-2 h-2 bg-mercury-blue rounded-full mr-2"></span>
                                        AI Summary
                                    </h4>
                                    <p className="text-slate-700 leading-relaxed">
                                        Apple continues to demonstrate strong fundamentals. The recent expansion in Services revenue is offsetting slower hardware sales.
                                        Analyst sentiment remains positive due to the upcoming product cycle and robust cash flow.
                                        <span className="font-medium"> Key risk factors</span> include regulatory challenges in the EU and potential supply chain constraints.
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl border border-slate-100">
                                        <h5 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Strengths</h5>
                                        <ul className="space-y-2">
                                            <li className="flex items-start text-sm text-slate-700">
                                                <Check className="h-4 w-4 text-emerald-500 mr-2 mt-0.5 shrink-0" />
                                                Consistent services revenue growth
                                            </li>
                                            <li className="flex items-start text-sm text-slate-700">
                                                <Check className="h-4 w-4 text-emerald-500 mr-2 mt-0.5 shrink-0" />
                                                Strong brand loyalty and ecosystem
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="p-4 rounded-xl border border-slate-100">
                                        <h5 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Risks</h5>
                                        <ul className="space-y-2">
                                            <li className="flex items-start text-sm text-slate-700">
                                                <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 shrink-0" />
                                                High valuation multiples
                                            </li>
                                            <li className="flex items-start text-sm text-slate-700">
                                                <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 shrink-0" />
                                                Slowing iPhone sales growth
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Demo;
