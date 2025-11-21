import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-white to-white"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-8">
                    <Sparkles className="h-4 w-4 text-mercury-blue" />
                    <span className="text-sm font-medium text-mercury-blue">AI-Powered Investment Intelligence</span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-6">
                    Make Smarter Investment <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-mercury-blue to-blue-600">Decisions with AI</span>
                </h1>

                <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Plain-language stock analysis for retail investors worldwide.
                    No jargon, just clarity. Understand the market in seconds.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <a href="/mercury_app.html" className="w-full sm:w-auto bg-mercury-green text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center group">
                        Try Free Demo
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <button className="w-full sm:w-auto bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors">
                        View Features
                    </button>
                </div>

                {/* Trust indicators */}
                <div className="mt-12 pt-8 border-t border-slate-100">
                    <p className="text-sm text-slate-500 mb-4">Trusted by investors from</p>
                    <div className="flex justify-center items-center space-x-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Simple text representation for now, could be logos */}
                        <span className="font-bold text-slate-800">NYSE</span>
                        <span className="font-bold text-slate-800">NASDAQ</span>
                        <span className="font-bold text-slate-800">LSE</span>
                        <span className="font-bold text-slate-800">NSE</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
