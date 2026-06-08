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
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || location.pathname !== '/'
                    ? 'bg-secondary/95 backdrop-blur-md py-3 shadow-lg'
                    : 'bg-gradient-to-b from-black/60 to-transparent py-4 md:py-6'
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

                <button className="md:hidden text-white hover:text-primary transition-colors z-50 bg-black/20 p-2 rounded-md backdrop-blur-sm" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
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
                                className="fixed top-0 right-0 h-screen w-[80%] max-w-sm bg-secondary border-l border-white/10 z-50 md:hidden flex flex-col shadow-2xl"
                            >
                                <div className="p-6 flex justify-between items-center border-b border-white/10">
                                    <img src="/logo.png" alt="AMRA Geogreen" className="h-10 w-auto bg-white p-1 rounded-sm" />
                                    <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full">
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-2">
                                    {navLinks.map((link, index) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + index * 0.05 }}
                                        >
                                            <Link
                                                to={link.path}
                                                className={`flex items-center justify-between text-lg font-heading font-medium py-3 border-b border-white/5 transition-colors ${location.pathname === link.path ? 'text-primary' : 'text-slate-300 hover:text-white'}`}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {link.name}
                                                <ChevronRight size={18} className="opacity-50" />
                                            </Link>
                                        </motion.div>
                                    ))}
                                    
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="mt-8"
                                    >
                                        <Link 
                                            to="/contact" 
                                            className="block w-full text-center px-6 py-4 bg-primary text-secondary font-heading font-bold rounded-sm uppercase tracking-wider"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Get In Touch
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Navbar;
