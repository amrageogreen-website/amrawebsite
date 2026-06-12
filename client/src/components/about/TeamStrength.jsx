import React from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle2 } from 'lucide-react';

const teamStats = [
    { number: '20+', label: 'Civil Engineers' },
    { number: '15+', label: 'Site Supervisors' },
    { number: '10+', label: 'Project Managers' },
    { number: '75+', label: 'Total Workforce' },
];

const teamRoles = [
    'Civil Engineers',
    'Environmental Engineers',
    'Project Managers',
    'Site Supervisors',
    'Safety Officers',
    'Quality Control Engineers',
    'Surveyors',
    'Skilled Technicians'
];

const TeamStrength = () => {
    return (
        <section className="py-20 bg-secondary text-white relative overflow-hidden">
            {/* Background Texture/Pattern */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

            <div className="container relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 uppercase tracking-tight text-white">Our Team Strength</h2>
                        <div className="w-24 h-1 bg-primary mb-8"></div>
                        <p className="text-slate-300 text-lg leading-relaxed mb-8">
                            Our multidisciplinary team consists of highly skilled and dedicated professionals who bring diverse expertise to every project. Together, we ensure the seamless execution of complex infrastructure and environmental engineering works.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-10">
                            {teamRoles.map((role, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <CheckCircle2 className="text-primary flex-shrink-0" size={20} />
                                    <span className="text-slate-300 font-medium">{role}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-6"
                    >
                        {teamStats.map((stat, idx) => (
                            <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-xl text-center hover:bg-slate-800 transition-colors">
                                <Users className="text-primary mx-auto mb-4" size={40} />
                                <h3 className="text-4xl font-extrabold text-white mb-2">{stat.number}</h3>
                                <p className="text-slate-400 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TeamStrength;
