import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const HeroSection = () => {
    const [profileUrl, setProfileUrl] = useState('#');

    useEffect(() => {
        const fetchSettings = async () => {
            const { data } = await supabase.from('site_settings').select('company_profile_url').single();
            if (data && data.company_profile_url) {
                setProfileUrl(data.company_profile_url);
            }
        };
        fetchSettings();
    }, []);

    return (
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/images/real/photo-4.jpg" 
                    alt="Infrastructure Project" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/70"></div>
            </div>

            {/* Content */}
            <div className="container relative z-10 text-center text-white px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 font-heading tracking-tight">
                        About AMRA Geogreen Works Pvt. Ltd.
                    </h1>
                    <p className="text-lg md:text-2xl text-slate-200 mb-10 leading-relaxed max-w-3xl mx-auto">
                        Delivering Sustainable Infrastructure, Geosynthetic Solutions, Environmental Engineering and Green Development Projects Across India.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/contact" className="btn bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:-translate-y-1">
                            <Phone size={20} />
                            Contact Us
                        </Link>
                        <a href={profileUrl} target="_blank" rel="noreferrer" className="btn bg-white hover:bg-slate-100 text-secondary px-8 py-4 rounded-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:-translate-y-1">
                            <Download size={20} />
                            Company Profile
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
