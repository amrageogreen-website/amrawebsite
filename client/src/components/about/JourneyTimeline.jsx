import React from 'react';
import { motion } from 'framer-motion';
import { Flag, Star, Map, ShieldCheck, Trophy, Target } from 'lucide-react';

const timeline = [
    { year: '2015', title: 'Company Established', icon: Flag },
    { year: '2017', title: 'First Major Government Project', icon: Star },
    { year: '2019', title: 'Expanded Operations Across Multiple States', icon: Map },
    { year: '2021', title: 'Achieved ISO Certifications', icon: ShieldCheck },
    { year: '2023', title: 'Completed 100+ Projects', icon: Trophy },
    { year: '2025', title: 'Expanded Environmental Engineering Division', icon: Target },
];

const JourneyTimeline = () => {
    return (
        <section className="py-20 bg-slate-50 overflow-hidden">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4 uppercase tracking-tight">Our Journey</h2>
                    <div className="w-24 h-1 bg-primary mx-auto"></div>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-[50%] top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2 hidden md:block"></div>

                    <div className="space-y-12 relative">
                        {timeline.map((item, index) => {
                            const Icon = item.icon;
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6 }}
                                    className={`flex flex-col md:flex-row items-center justify-between ${isEven ? 'md:flex-row-reverse' : ''}`}
                                >
                                    <div className="hidden md:block w-[45%]"></div>
                                    
                                    {/* Center Icon */}
                                    <div className="relative z-10 w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg border-4 border-slate-50 mb-4 md:mb-0">
                                        <Icon size={24} />
                                    </div>
                                    
                                    {/* Content Box */}
                                    <div className={`w-full md:w-[45%] bg-white p-6 rounded-lg shadow-md border-l-4 ${isEven ? 'border-secondary md:text-right' : 'border-primary md:text-left'} text-center`}>
                                        <span className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-3 ${isEven ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary-dark'}`}>
                                            {item.year}
                                        </span>
                                        <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JourneyTimeline;
