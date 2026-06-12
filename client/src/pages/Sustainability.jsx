import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Shield, Heart, Recycle } from 'lucide-react';
import SEO from '../components/SEO';

const Sustainability = () => {
    return (
        <div className="pt-20">
            <SEO 
                title="Sustainability & Safety" 
                description="Learn about our commitment to eco-friendly construction, zero harm safety policies, and green engineering."
                url="https://www.amrageogreenworks.com/sustainability"
            />
            <section className="bg-slate-50 py-20">
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark mb-4">Sustainability & Safety</h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">Committed to Green Engineering and Zero Harm policies.</p>
                    </motion.div>
                </div>
            </section>

            <section className="section bg-white">
                <div className="container">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-green-50/50 p-8 rounded border border-green-100 hover:shadow-lg transition-all">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-primary mb-6">
                                <Leaf size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Eco-Friendly Construction</h3>
                            <p className="text-slate-600 leading-relaxed">We prioritize the use of locally sourced materials, bio-engineering techniques for slope stabilization, and solar-powered site offices to minimize our carbon footprint.</p>
                        </div>

                        <div className="bg-yellow-50/50 p-8 rounded border border-yellow-100 hover:shadow-lg transition-all">
                            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-700 mb-6">
                                <Shield size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Safety First Policy</h3>
                            <p className="text-slate-600 leading-relaxed">Adhering to strict OHSAS and ISO safety standards. Regular safety audits, mandatory PPE, and continuous training ensure a zero-accident workplace.</p>
                        </div>

                        <div className="bg-red-50/50 p-8 rounded border border-red-100 hover:shadow-lg transition-all">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6">
                                <Heart size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Community Impact</h3>
                            <p className="text-slate-600 leading-relaxed">we engage with local communities to ensure our projects bring positive socio-economic changes, providing employment and improving connectivity.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-primary-dark py-20 text-white">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Our Green Commitment</h2>
                            <ul className="space-y-4">
                                <li className="flex gap-4">
                                    <Recycle className="text-secondary flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-lg">Waste Reduction</h4>
                                        <p className="text-slate-300 text-sm">90% of excavated material is repurposed for filling and embankments.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <Leaf className="text-secondary flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-lg">Bio-Engineering</h4>
                                        <p className="text-slate-300 text-sm">Using Vetiver grass and sterile vegetation for natural slope binding.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="relative h-64 md:h-full min-h-[300px]">
                            <img src="/images/real/gen-green.png" className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-80" alt="Green Nature" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Sustainability;
