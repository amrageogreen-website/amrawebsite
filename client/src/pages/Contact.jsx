import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { supabase } from '../supabaseClient';
import SEO from '../components/SEO';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const { error } = await supabase.from('enquiries').insert([formData]);

            if (error) throw error;

            setStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setTimeout(() => setStatus(''), 5000);
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
            setStatus('');
        }
    };

    return (
        <div className="pt-20 bg-slate-50 min-h-screen">
            <SEO 
                title="Contact Us" 
                description="Get in touch with AMRA Geogreen Works Pvt Ltd for project inquiries, technical collaboration, or partnership opportunities."
                url="https://www.amrageogreenworks.com/contact"
            />
            {/* Map Section on Top */}
            <section className="h-[500px] w-full bg-slate-200 relative z-0">
                <iframe
                    src="https://maps.google.com/maps?q=DLF%20Corporate%20Greens,%20Tower%204,%20Sector%2074A,%20Gurugram,%20Haryana,%20122004&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                    className="grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
            </section>

            {/* Overlapping Contact Card Section */}
            <section className="relative z-10 -mt-32 pb-24">
                <div className="container">
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="grid lg:grid-cols-3 bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-100"
                    >
                        {/* Contact Info Sidebar */}
                        <div className="lg:col-span-1 bg-secondary text-white p-10 lg:p-12 relative overflow-hidden flex flex-col justify-between">
                            {/* Decorative background element */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full opacity-10 transform translate-x-1/3 -translate-y-1/3 blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary rounded-full opacity-10 transform -translate-x-1/2 translate-y-1/2 blur-2xl"></div>
                            
                            <div className="relative z-10">
                                <h3 className="text-3xl font-heading font-bold mb-4 uppercase">Get In Touch</h3>
                                <p className="text-slate-300 mb-10 leading-relaxed text-sm">
                                    We are ready to assist you. Reach out to us for project inquiries, technical collaboration, or partnership opportunities.
                                </p>

                                <div className="space-y-8">
                                    <div className="flex gap-5 group">
                                        <div className="w-14 h-14 mt-1 bg-white/5 border border-white/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-secondary transition-all duration-300">
                                            <MapPin size={24} className="group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Corporate Office</h4>
                                            <p className="text-white text-sm leading-relaxed mb-4">UNIT No 1401-1403, Tower-1,<br />DLF Corporate Greens, Sector 74A,<br />Gurugram, Haryana 122004</p>
                                            
                                            <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Registered Office</h4>
                                            <p className="text-white text-sm leading-relaxed">BU-5 SFS Flats, Outer Ring Road,<br />Pitampura Delhi, Delhi – 110034</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-5 group">
                                        <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-secondary transition-all duration-300">
                                            <Phone size={24} className="group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Direct Line</h4>
                                            <p className="text-white text-base">0124-5181169</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-5 group">
                                        <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-secondary transition-all duration-300">
                                            <Mail size={24} className="group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Email Address</h4>
                                            <p className="text-white text-base">amrageogreen@gmail.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="relative z-10 mt-16 pt-8 border-t border-white/10">
                                <p className="text-slate-400 text-sm">Working Hours:</p>
                                <p className="font-semibold text-white mt-1">Monday - Saturday <br/>9:00 AM - 6:00 PM</p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2 p-10 lg:p-14">
                            <div className="mb-10">
                                <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Send Message</span>
                                <h2 className="text-4xl font-heading font-extrabold text-secondary mb-4 uppercase">Let's build together</h2>
                                <div className="w-16 h-1 bg-primary mb-6"></div>
                                <p className="text-slate-500 text-lg">
                                    Fill out the form below with your inquiry, and our engineering team will get back to you promptly.
                                </p>
                            </div>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                                        <input type="text" name="name" required value={formData.name} onChange={handleChange}
                                            className="w-full px-5 py-4 bg-slate-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all shadow-inner"
                                            placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                                        <input type="email" name="email" required value={formData.email} onChange={handleChange}
                                            className="w-full px-5 py-4 bg-slate-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all shadow-inner"
                                            placeholder="john@company.com" />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Phone Number</label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                            className="w-full px-5 py-4 bg-slate-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all shadow-inner"
                                            placeholder="+91 98765 43210" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Subject</label>
                                        <input type="text" name="subject" required value={formData.subject} onChange={handleChange}
                                            className="w-full px-5 py-4 bg-slate-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all shadow-inner"
                                            placeholder="Project Inquiry" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Message</label>
                                    <textarea name="message" rows="5" required value={formData.message} onChange={handleChange}
                                        className="w-full px-5 py-4 bg-slate-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all shadow-inner resize-none"
                                        placeholder="Please detail your project requirements..."></textarea>
                                </div>

                                <div className="pt-4">
                                    <button type="submit" className="btn bg-primary text-secondary hover:bg-secondary hover:text-white border-none px-10 py-4 font-bold uppercase tracking-wider w-full md:w-auto transition-colors shadow-lg shadow-primary/30" disabled={status === 'sending'}>
                                        {status === 'sending' ? 'Processing...' : <span className="flex items-center justify-center">Send Inquiry <Send size={18} className="ml-2" /></span>}
                                    </button>
                                </div>

                                {status === 'success' && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-center font-medium shadow-sm">
                                        Your message has been received! Our team will contact you shortly.
                                    </motion.div>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
