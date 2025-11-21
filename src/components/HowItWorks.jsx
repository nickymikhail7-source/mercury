import React from 'react';
import { Search, BrainCircuit, TrendingUp } from 'lucide-react';

const steps = [
    {
        icon: <Search className="h-6 w-6 text-white" />,
        title: "Search Any Stock",
        description: "Type in a ticker symbol or company name from any major global exchange."
    },
    {
        icon: <BrainCircuit className="h-6 w-6 text-white" />,
        title: "Get AI Analysis",
        description: "Our advanced AI processes news, financials, and sentiment to generate a plain-language report."
    },
    {
        icon: <TrendingUp className="h-6 w-6 text-white" />,
        title: "Invest with Confidence",
        description: "Make data-driven decisions without needing a finance degree."
    }
];

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-24 bg-slate-900 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">How Mercury Works</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Three simple steps to smarter investing.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500 opacity-30"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="relative flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-mercury-blue to-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/50 mb-6 relative z-10 border-4 border-slate-900">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-slate-400 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
