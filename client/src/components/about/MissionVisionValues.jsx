import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Shield, Award, HardHat, Lightbulb, Recycle, HeartHandshake } from 'lucide-react';

const coreValues = [
    { title: 'Integrity', desc: 'Maintaining honesty, transparency, and ethical business practices.', icon: Shield },
    { title: 'Quality', desc: 'Delivering work that exceeds industry standards.', icon: Award },
    { title: 'Safety', desc: 'Prioritizing workforce and project safety.', icon: HardHat },
    { title: 'Innovation', desc: 'Applying modern engineering solutions.', icon: Lightbulb },
    { title: 'Sustainability', desc: 'Promoting environmentally responsible development.', icon: Recycle },
    { title: 'Customer Commitment', desc: 'Building long-term relationships through exceptional service.', icon: HeartHandshake },
];

const MissionVisionValues = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container">
                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-10 mb-20">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-50 p-10 rounded-xl border-t-4 border-primary shadow-lg relative overflow-hidden"
                    >
                        <Target className="text-primary/10 absolute -right-10 -bottom-10" size={200} />
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-primary text-white rounded-lg flex items-center justify-center mb-6 shadow-md">
                                <Target size={32} />
                            </div>
                            <h3 className="text-3xl font-extrabold text-secondary mb-4 uppercase">Our Mission</h3>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                To provide innovative, reliable, and sustainable engineering solutions that enhance infrastructure development while preserving environmental balance and creating long-term value for clients, communities, and stakeholders.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-secondary p-10 rounded-xl border-t-4 border-primary shadow-lg relative overflow-hidden"
                    >
                        <Eye className="text-white/5 absolute -right-10 -bottom-10" size={200} />
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-white text-secondary rounded-lg flex items-center justify-center mb-6 shadow-md">
                                <Eye size={32} />
                            </div>
                            <h3 className="text-3xl font-extrabold text-white mb-4 uppercase">Our Vision</h3>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                To become one of India's most trusted and respected infrastructure and environmental engineering companies by delivering excellence, innovation, sustainability, and customer-focused solutions in every project.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Core Values */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4 uppercase tracking-tight">Our Core Values</h2>
                    <div className="w-24 h-1 bg-primary mx-auto"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {coreValues.map((value, idx) => {
                        const Icon = value.icon;
                        return (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 border border-slate-100 rounded-xl hover:shadow-xl transition-all group hover:-translate-y-1 bg-white"
                            >
                                <div className="w-14 h-14 bg-slate-50 text-secondary group-hover:bg-primary group-hover:text-white rounded-lg flex items-center justify-center mb-6 transition-colors">
                                    <Icon size={28} />
                                </div>
                                <h4 className="text-xl font-bold text-slate-800 mb-3">{value.title}</h4>
                                <p className="text-slate-500 leading-relaxed">{value.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default MissionVisionValues;
