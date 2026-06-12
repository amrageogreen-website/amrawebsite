import React from 'react';
import { motion } from 'framer-motion';

const leaders = [
    {
        name: 'Mr. Amit Kundu',
        designation: 'Managing Director',
        image: '/images/about/director.png',
        bio: 'With extensive experience in infrastructure, environmental engineering, and project management, Mr. Amit Kundu has successfully led AMRA Geogreen to become a trusted name in the industry.'
    },
    {
        name: 'Mrs. Deepika Kundu',
        designation: 'Director',
        image: '/images/team/deepika_kundu.png',
        bio: 'A visionary leader instrumental in expanding operations and securing key projects. Her unwavering commitment to quality and sustainability drives the company forward.'
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

                <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
