import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const reasons = [
    "Experienced Engineering Team",
    "Proven Project Execution Capability",
    "Quality Assurance Procedures",
    "Environment-Friendly Solutions",
    "Timely Project Delivery",
    "Strong Client Relationships",
    "Competitive Pricing",
    "Nationwide Service Coverage"
];

const WhyChooseUs = () => {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4 uppercase tracking-tight">Why Choose Us</h2>
                    <div className="w-24 h-1 bg-primary mx-auto"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {reasons.map((reason, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-6 rounded-lg shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow border border-slate-100"
                        >
                            <CheckCircle className="text-primary flex-shrink-0" size={28} />
                            <span className="text-lg font-bold text-slate-700">{reason}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
