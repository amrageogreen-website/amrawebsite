import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-100 pt-20">
            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
                {/* Brand Column */}
                <div className="space-y-6">
                    <img src="/logo.png" alt="AMRA Geogreen" className="h-14 w-auto bg-white p-2 rounded-sm" />
                    <p className="text-slate-400 leading-relaxed">Building specialized infrastructure for a sustainable future. Excellence in every layer.</p>
                    <div className="flex gap-4">
                        <a href="#" className="text-slate-400 hover:text-primary-light transition-colors"><Linkedin size={20} /></a>
                        <a href="#" className="text-slate-400 hover:text-primary-light transition-colors"><Facebook size={20} /></a>
                        <a href="#" className="text-slate-400 hover:text-primary-light transition-colors"><Twitter size={20} /></a>
                    </div>
                </div>

                {/* Links Column */}
                <div>
                    <h4 className="text-white text-lg font-bold mb-6">Quick Links</h4>
                    <ul className="space-y-3">
                        <li><Link to="/about" className="text-slate-400 hover:text-white transition-colors">About Us</Link></li>
                        <li><Link to="/services" className="text-slate-400 hover:text-white transition-colors">Services</Link></li>
                        <li><Link to="/projects" className="text-slate-400 hover:text-white transition-colors">Projects</Link></li>
                        <li><Link to="/careers" className="text-slate-400 hover:text-white transition-colors">Careers</Link></li>
                        <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>

                {/* Services Column */}
                <div>
                    <h4 className="text-white text-lg font-bold mb-6">Services</h4>
                    <ul className="space-y-3 text-slate-400">
                        <li>Highway Construction</li>
                        <li>Hill Slope Protection</li>
                        <li>Retaining Walls</li>
                        <li>Gabion Works</li>
                        <li>Soil Nailing</li>
                    </ul>
                </div>

                {/* Contact Column */}
                <div>
                    <h4 className="text-white text-lg font-bold mb-6">Contact Us</h4>
                    <div className="space-y-4 text-slate-400">
                        <p className="flex items-start gap-3"><MapPin size={18} className="mt-1 flex-shrink-0" /> <span>1st Floor, DCG4-0103, DLF Corporate Greens, Gurugram, Haryana, 122004</span></p>
                        <p className="flex items-center gap-3"><Phone size={18} /> +91-8607380005</p>
                        <p className="flex items-center gap-3"><Mail size={18} /> amrageogreen@gmail.com</p>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} AMRA Geogreen Works Pvt Ltd. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
