import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Projects', path: '/projects' },
        { name: 'Careers', path: '/careers' },
        { name: 'Our Team', path: '/team' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled || location.pathname !== '/'
                    ? 'bg-secondary/95 backdrop-blur-xl py-3 shadow-2xl border-b border-white/10'
                    : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 md:py-6'
                }`}
        >
            <div className="container flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 z-50">
                    <img src="/logo.png" alt="AMRA Geogreen" className="h-10 md:h-12 w-auto bg-white p-1 rounded-sm shadow-sm" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-[0.95rem] font-heading font-bold tracking-wide uppercase transition-colors relative group py-2 ${location.pathname === link.path ? 'text-primary' : 'text-white hover:text-primary'
                                }`}
                        >
                            {link.name}
                            <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}></span>
                        </Link>
                    ))}
                    <Link to="/contact" className="ml-4 px-6 py-2 bg-primary hover:bg-white text-slate-900 font-heading font-bold rounded-sm transition-all duration-300 uppercase text-sm tracking-wider">
                        Get In Touch
                    </Link>
                </div>

                <button className="md:hidden text-white hover:text-primary transition-all duration-300 z-50 bg-white/5 border border-white/10 p-2.5 rounded-xl backdrop-blur-md shadow-lg active:scale-95" onClick={() => setIsOpen(!isOpen)}>
                    <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                        {isOpen ? <X size={26} /> : <Menu size={26} />}
                    </motion.div>
                </button>

                {/* Mobile Menu Backdrop & Sidebar */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                                onClick={() => setIsOpen(false)}
                            />

                            {/* Sidebar Drawer */}
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed top-0 right-0 h-screen w-[85%] max-w-sm bg-gradient-to-b from-slate-900 to-secondary border-l border-white/10 z-50 md:hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl overflow-hidden"
                            >
                                <div className="p-6 flex justify-between items-center border-b border-white/5 bg-black/20">
                                    <img src="/logo.png" alt="AMRA Geogreen" className="h-12 w-auto bg-white p-1.5 rounded-md shadow-md" />
                                    <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white hover:bg-white/10 hover:rotate-90 transition-all duration-300 bg-white/5 p-2 rounded-full border border-white/10 shadow-inner">
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-3 relative z-10">
                                    {navLinks.map((link, index) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                                            animate={{ opacity: 1, x: 0, scale: 1 }}
                                            transition={{ delay: 0.1 + index * 0.08, type: 'spring', stiffness: 100 }}
                                        >
                                            <Link
                                                to={link.path}
                                                className={`group flex items-center justify-between text-lg font-heading font-medium p-4 rounded-xl transition-all duration-300 shadow-sm ${location.pathname === link.path ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white hover:scale-105 border border-transparent'}`}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {link.name}
                                                <ChevronRight size={20} className={`transition-transform duration-300 ${location.pathname === link.path ? 'text-primary' : 'opacity-30 group-hover:opacity-100 group-hover:translate-x-1'}`} />
                                            </Link>
                                        </motion.div>
                                    ))}
                                    
                                    <motion.div 
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6, type: 'spring' }}
                                        className="mt-8"
                                    >
                                        <Link 
                                            to="/contact" 
                                            className="block w-full text-center px-6 py-4 bg-primary hover:bg-primary-dark text-white font-heading font-bold rounded-xl uppercase tracking-wider shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Get In Touch
                                        </Link>
                                    </motion.div>
                                </div>
                                
                                {/* Animated Background Elements */}
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.4 }}
                                    transition={{ delay: 0.5, duration: 1 }}
                                    className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"
                                />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Navbar;
