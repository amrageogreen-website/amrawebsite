import React from 'react';
import { motion } from 'framer-motion';
import { FileBadge, ShieldAlert, HeartPulse, Leaf } from 'lucide-react';

const certifications = [
    { name: 'ISO 9001:2015', desc: 'Quality Management' },
    { name: 'ISO 14001:2015', desc: 'Environmental Management' },
    { name: 'ISO 45001:2018', desc: 'Occupational Health & Safety' },
    { name: 'MSME Registered', desc: 'Govt. of India' },
    { name: 'GST & PAN', desc: 'Fully Compliant' },
    { name: 'Startup India', desc: 'Recognized Entity' },
];

const hsePoints = [
    { title: 'Zero Harm Policy', icon: ShieldAlert },
    { title: 'Safety Training', icon: HeartPulse },
    { title: 'PPE Compliance', icon: FileBadge },
    { title: 'Environmental Protection', icon: Leaf },
];

const CertificationsHSE = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container">
                {/* Certifications */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4 uppercase tracking-tight">Certifications & Compliance</h2>
                        <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
                        <p className="text-slate-600 max-w-2xl mx-auto">We maintain the highest industry standards to ensure quality, safety, and reliability in every project we undertake.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {certifications.map((cert, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-slate-50 border border-slate-200 p-6 rounded-lg text-center hover:shadow-md hover:border-primary transition-all cursor-pointer group"
                            >
                                <FileBadge className="mx-auto mb-3 text-slate-400 group-hover:text-primary transition-colors" size={32} />
                                <h4 className="font-bold text-slate-800 text-sm mb-1">{cert.name}</h4>
                                <p className="text-xs text-slate-500">{cert.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* HSE */}
                <div className="bg-slate-50 rounded-2xl p-8 md:p-12 border-l-8 border-primary shadow-sm">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="text-3xl font-extrabold text-secondary mb-4 uppercase">Health, Safety & Environment (HSE)</h2>
                            <p className="text-slate-600 leading-relaxed mb-8">
                                AMRA Geogreen Works follows stringent Health, Safety and Environmental practices to ensure safe working conditions, environmental compliance, and operational excellence across all projects.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-6">
                                {hsePoints.map((point, idx) => {
                                    const Icon = point.icon;
                                    return (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="bg-white p-2 rounded shadow-sm text-primary">
                                                <Icon size={20} />
                                            </div>
                                            <span className="font-bold text-slate-700 mt-1">{point.title}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="relative h-64 md:h-full min-h-[300px] rounded-xl overflow-hidden shadow-lg">
                            <img 
                                src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=800&auto=format&fit=crop" 
                                alt="Safety First" 
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CertificationsHSE;
