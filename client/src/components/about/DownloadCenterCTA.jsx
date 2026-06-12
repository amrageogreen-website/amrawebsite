import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Layout, ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const downloads = [
    { title: 'Company Profile', icon: FileText, link: '/AMRA-Profile.pdf' },
    { title: 'Corporate Brochure', icon: Layout, link: '#' },
    { title: 'Presentation', icon: Layout, link: '#' },
    { title: 'Certifications', icon: ShieldCheck, link: '#' },
];

const DownloadCenterCTA = () => {
    return (
        <>
            {/* Download Center */}
            <section className="py-20 bg-slate-100">
                <div className="container max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4 uppercase tracking-tight">Download Center</h2>
                        <div className="w-24 h-1 bg-primary mx-auto"></div>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {downloads.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <motion.a 
                                    key={idx}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl hover:-translate-y-2 transition-all group border border-slate-200"
                                >
                                    <div className="w-16 h-16 mx-auto bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors mb-4">
                                        <Icon size={32} />
                                    </div>
                                    <h4 className="font-bold text-slate-800 mb-4">{item.title}</h4>
                                    <span className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                                        <Download size={16} /> Download
                                    </span>
                                </motion.a>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-secondary text-white relative overflow-hidden text-center">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="container relative z-10 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 uppercase tracking-tight">Ready to Work With Us?</h2>
                        <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                            Partner with AMRA Geogreen Works Pvt. Ltd. for reliable, sustainable, and innovative engineering solutions.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/contact" className="btn bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]">
                                <Mail size={20} />
                                Contact Us
                            </Link>
                            <Link to="/contact" className="btn bg-transparent border-2 border-white hover:bg-white hover:text-secondary text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                                Request a Proposal <ArrowRight size={20} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default DownloadCenterCTA;
