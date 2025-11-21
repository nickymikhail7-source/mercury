import React from 'react';
import { Zap, MessageCircle, Globe } from 'lucide-react';

const benefits = [
    {
        icon: <Zap className="h-8 w-8 text-mercury-blue" />,
        title: "Instant Analysis",
        description: "Get comprehensive AI-powered insights in seconds. Stop spending hours reading annual reports and news."
    },
    {
        icon: <MessageCircle className="h-8 w-8 text-mercury-green" />,
        title: "Simple Language",
        description: "Complex financial data translated into plain English. No confusing jargon, just clear, actionable intelligence."
    },
    {
        icon: <Globe className="h-8 w-8 text-purple-600" />,
        title: "Global Markets",
        description: "Support for stocks from US, India, UK, and major global exchanges. One platform for your international portfolio."
    }
];

const Benefits = () => {
    return (
        <section id="features" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose Mercury?</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        We bridge the gap between complex financial data and retail investors.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow duration-300">
                            <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center shadow-sm mb-6">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;
