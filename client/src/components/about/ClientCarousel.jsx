import React from 'react';
import { Building2, Landmark, Factory, Shield, Briefcase } from 'lucide-react';

const clients = [
    { name: 'Government Departments', icon: Landmark },
    { name: 'Public Sector Undertakings (PSUs)', icon: Building2 },
    { name: 'Infrastructure Companies', icon: Briefcase },
    { name: 'Industrial Clients', icon: Factory },
    { name: 'Private Organizations', icon: Shield },
];

const ClientCarousel = () => {
    return null; // Temporarily hidden per request
    return (
        <section className="py-16 bg-white border-y border-slate-100 overflow-hidden">
            <div className="container mb-8 text-center">
                <h3 className="text-2xl font-bold text-slate-400 uppercase tracking-widest">Our Trusted Partners</h3>
            </div>
            
            {/* Simple CSS Marquee implementation */}
            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-16 py-4">
                    {[...clients, ...clients, ...clients].map((client, idx) => {
                        const Icon = client.icon;
                        return (
                            <div key={idx} className="flex items-center gap-3 text-slate-500 opacity-70 hover:opacity-100 hover:text-secondary transition-all grayscale hover:grayscale-0">
                                <Icon size={32} />
                                <span className="text-xl font-bold">{client.name}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

export default ClientCarousel;
