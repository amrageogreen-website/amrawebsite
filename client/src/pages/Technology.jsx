import React from 'react';
import { motion } from 'framer-motion';

const Technology = () => {
    return (
        <div className="pt-20">
            <section className="bg-slate-50 py-20">
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark mb-4">Technology & Equipment</h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">State-of-the-art machinery and advanced construction methodologies.</p>
                    </motion.div>
                </div>
            </section>

            <section className="section bg-white">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-slate-800">Modern Fleet Ownership</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                We own and maintain a robust fleet of heavy machinery from global leaders like Caterpillar, JCB, Komatsu, and Volvo. This ensures high availability, minimal downtime, and superior project execution speed.
                            </p>
                            <ul className="space-y-3 pt-4">
                                {[
                                    'Hydraulic Excavators (20T - 40T)',
                                    'Motor Graders & Soil Compactors',
                                    'Shotcreting Robots & Pumps',
                                    'Rotary & DTH Piling Rigs',
                                    'Heavy Dumpers & Tippers'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <span className="w-2 h-2 bg-secondary rounded-full"></span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/10 transform rotate-3 rounded-xl"></div>
                            <img src="/images/real/gen-highway.png" className="relative rounded-xl shadow-lg w-full" alt="Heavy Machinery" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="section bg-slate-50">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1 relative">
                            <div className="absolute inset-0 bg-secondary/10 transform -rotate-3 rounded-xl"></div>
                            <img src="/images/real/gen-survey.png" className="relative rounded-xl shadow-lg w-full" alt="Surveying Equipment" />
                        </div>
                        <div className="order-1 md:order-2 space-y-6">
                            <h2 className="text-3xl font-bold text-slate-800">Advanced Methodologies</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Precision is paramount in infrastructure. We employ digital surveying and geotechnical analysis to ensure accuracy down to the millimeter.
                            </p>
                            <ul className="space-y-3 pt-4">
                                {[
                                    'Slope Stability Analysis Software (GeoStudio)',
                                    'Total Stations & DGPS Surveying',
                                    'Ground Penetrating Radar (GPR)',
                                    'Automated Concrete Batching Plants'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <span className="w-2 h-2 bg-primary rounded-full"></span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Technology;
