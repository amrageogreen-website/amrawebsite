import React from 'react';
import { motion } from 'framer-motion';
import EquipmentSection from '../components/EquipmentSection';
import SEO from '../components/SEO';

const About = () => {
    return (
        <div className="pt-20">
            <SEO 
                title="About Us" 
                description="Learn about AMRA Geogreen Works Pvt Ltd, our mission, vision, and core values. We are pioneering sustainable infrastructure since 2010."
                url="https://www.amrageogreenworks.com/about"
            />
            {/* Header */}
            <section className="bg-slate-50 py-20">
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark mb-4">About AMRA Geogreen</h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">Pioneering Sustainable Infrastructure Since 2010</p>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section bg-white">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Mission</h2>
                                <ul className="text-slate-600 leading-relaxed text-lg list-disc pl-5 space-y-2">
                                    <li>Deliver high-quality and cost-effective construction solutions</li>
                                    <li>Adopt modern engineering and geotechnical techniques</li>
                                    <li>Ensure safety, compliance, and timely project delivery</li>
                                    <li>Build long-term relationships with clients through trust and performance</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Vision</h2>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    To become a leading infrastructure and geotechnical solutions provider recognized for quality, innovation, and sustainable development across India.
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-secondary/10 transform translate-x-4 translate-y-4 rounded-lg"></div>
                            <img
                                src="/images/real/photo-4.jpg"
                                alt="Construction Site"
                                className="relative rounded-lg shadow-xl w-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="section bg-slate-50">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="section-title">Our Core Values</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
                        {['Quality', 'Integrity', 'Innovation', 'Sustainability', 'Safety'].map((val, idx) => (
                            <div key={idx} className="bg-white p-8 rounded shadow text-center border-b-4 border-primary">
                                <h3 className="text-xl font-bold text-slate-900">{val}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Equipment Section */}
            <EquipmentSection />
        </div>
    );
};

export default About;
