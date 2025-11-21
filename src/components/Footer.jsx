import React from 'react';
import { TrendingUp, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="bg-mercury-blue p-1.5 rounded-lg">
                                <TrendingUp className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">Mercury</span>
                        </div>
                        <p className="text-slate-400 max-w-xs">
                            Making investment intelligence accessible to everyone.
                            Clear, concise, and AI-powered.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Product</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-mercury-blue transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-mercury-blue transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-mercury-blue transition-colors">API</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-mercury-blue transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-mercury-blue transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-mercury-blue transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-slate-500 mb-4 md:mb-0">
                        © 2024 Mercury Intelligence Inc. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-slate-400 hover:text-white transition-colors">
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors">
                            <Linkedin className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors">
                            <Github className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
