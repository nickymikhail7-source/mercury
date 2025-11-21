import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import Demo from './components/Demo';
import Markets from './components/Markets';
import Footer from './components/Footer';

function App() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <Hero />
                <Benefits />
                <HowItWorks />
                <Demo />
                <Markets />
            </main>
            <Footer />
        </div>
    );
}

export default App;
