import React from 'react';
import { motion } from 'framer-motion';

const leaders = [
    {
        name: 'Mr. Arvind Sharma',
        designation: 'Managing Director',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop',
        bio: '20+ years of experience in infrastructure, environmental engineering, project management, and business development. He has successfully led AMRA Geogreen to become a trusted name in the industry.'
    },
    {
        name: 'Mr. Rajesh Kumar',
        designation: 'Director',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
        bio: 'A visionary leader with a strong technical background in geotechnical engineering. Instrumental in expanding operations across multiple states and securing key government projects.'
    },
    {
        name: 'Mr. Sanjay Singh',
        designation: 'Founder',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop',
        bio: 'The driving force behind the inception of AMRA Geogreen Works. His unwavering commitment to quality and sustainability laid the foundation for the company’s core values.'
    }
];

const LeadershipTeam = () => {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4 uppercase tracking-tight">Our Leadership</h2>
                    <div className="w-24 h-1 bg-primary mx-auto"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {leaders.map((leader, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-white rounded-xl overflow-hidden shadow-lg group"
                        >
                            <div className="h-80 overflow-hidden relative">
                                <img 
                                    src={leader.image} 
                                    alt={leader.name} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-8 text-center relative">
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white text-sm font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-md">
                                    {leader.designation}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-2">{leader.name}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    {leader.bio}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LeadershipTeam;
