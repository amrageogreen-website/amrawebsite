import React from 'react';
import { motion } from 'framer-motion';

const stats = [
    { number: '10+', label: 'Years Experience' },
    { number: '150+', label: 'Projects Completed' },
    { number: '50+', label: 'Clients Served' },
    { number: '12+', label: 'States Covered' },
    { number: '75+', label: 'Professionals' },
];

const CompanyOverview = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-extrabold text-secondary mb-6 uppercase tracking-tight"
                    >
                        Who We Are
                    </motion.h2>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6 text-slate-600 text-lg leading-relaxed"
                    >
                        <p>
                            AMRA Geogreen Works Pvt. Ltd. is a professionally managed infrastructure and environmental engineering company specializing in geosynthetics, geotechnical solutions, erosion control systems, environmental protection works, landscaping, and sustainable infrastructure development.
                        </p>
                        <p>
                            The company is committed to delivering innovative, cost-effective, and environmentally responsible solutions for government agencies, public sector undertakings, infrastructure developers, industrial clients, and private organizations.
                        </p>
                        <p>
                            With a focus on quality, safety, technical excellence, and customer satisfaction, AMRA Geogreen Works has successfully contributed to numerous projects across diverse sectors.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-50 p-6 rounded-lg text-center border-b-4 border-primary hover:shadow-lg transition-all"
                        >
                            <h3 className="text-4xl font-extrabold text-secondary mb-2">{stat.number}</h3>
                            <p className="text-slate-500 font-medium text-sm uppercase tracking-wider">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CompanyOverview;
