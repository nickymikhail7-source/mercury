import React from 'react';
import { TrendingUp } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <div className="bg-mercury-blue p-1.5 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-mercury-blue tracking-tight">Mercury</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-slate-600 hover:text-mercury-blue transition-colors font-medium">Features</a>
                        <a href="#how-it-works" className="text-slate-600 hover:text-mercury-blue transition-colors font-medium">How it Works</a>
                        <a href="#demo" className="text-slate-600 hover:text-mercury-blue transition-colors font-medium">Demo</a>
                        <button className="bg-mercury-blue text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
