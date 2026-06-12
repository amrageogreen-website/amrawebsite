import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Award, Users, HardHat, ChevronRight, Truck, Mountain, LayoutGrid, Hammer, Layers, Droplet, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';
import SEO from '../components/SEO';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [heroSlides, setHeroSlides] = useState([]);

    useEffect(() => {
        const fetchSlides = async () => {
            const { data, error } = await supabase.from('hero_slides').select('*').order('created_at', { ascending: true });
            if (!error && data && data.length > 0) {
                setHeroSlides(data);
            }
        };
        fetchSlides();
    }, []);

    useEffect(() => {
        if (heroSlides.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides]);

    if (heroSlides.length === 0) return <div className="h-screen bg-secondary"></div>;

    return (
        <div className="font-body text-slate-800">
            <SEO 
                title="Home" 
                description="AMRA Geogreen Works Pvt Ltd specializes in geotechnical engineering, highway construction, slope protection, and sustainable infrastructure solutions."
                url="https://www.amrageogreen.com"
            />
            {/* Hero Slider Section */}
            <section className="relative h-screen min-h-[700px] bg-secondary overflow-hidden">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 z-0"
                    >
                        <div className="absolute inset-0 bg-black/50 z-10" />
                        <img
                            src={heroSlides[currentSlide].image}
                            alt="Hero Background"
                            className="w-full h-full object-cover scale-105"
                        />
                    </motion.div>
                </AnimatePresence>

                <div className="container relative z-20 h-full flex flex-col justify-center">
                    <div className="max-w-4xl pt-20">
                        <motion.div
                            key={currentSlide + "-text"}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <div className="inline-block bg-primary px-4 py-1 mb-6">
                                <span className="text-secondary font-bold uppercase tracking-widest text-sm">
                                    {heroSlides[currentSlide].subtitle}
                                </span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-8 leading-tight uppercase">
                                {heroSlides[currentSlide].title}
                            </h1>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="/projects" className="btn bg-white text-secondary hover:bg-primary hover:text-white border-none font-bold uppercase tracking-wider px-8 py-4 justify-center">
                                    View Projects <ArrowRight size={20} className="ml-2" />
                                </a>
                                <a href="/contact" className="btn border-2 border-white text-white hover:bg-white hover:text-secondary font-bold uppercase tracking-wider px-8 py-4 bg-transparent justify-center">
                                    Contact Us
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Navigation Tabs */}
                <div className="absolute bottom-0 left-0 w-full z-30 border-t border-white/10 hidden md:block">
                    <div className="container p-0">
                        <div className="flex">
                            {heroSlides.map((slide, index) => (
                                <button
                                    key={slide.id}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`flex-1 py-8 px-6 text-left transition-all duration-300 relative group ${currentSlide === index ? 'bg-primary' : 'bg-secondary/80 hover:bg-secondary'
                                        }`}
                                >
                                    <span className={`block text-xs uppercase tracking-widest mb-2 ${currentSlide === index ? 'text-secondary/70' : 'text-zinc-500 group-hover:text-primary'
                                        }`}>
                                        0{index + 1}
                                    </span>
                                    <span className={`block text-xl font-heading font-bold uppercase ${currentSlide === index ? 'text-secondary' : 'text-white'
                                        }`}>
                                        {slide.tab}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

{/* Director's Message */}
            <section className="section bg-secondary text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
                <div className="container relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Director's Message</span>
                            <h2 className="text-4xl font-heading font-bold text-white mb-6 leading-tight uppercase">
                                Building India's Infrastructure, One Project at a Time
                            </h2>
                            <div className="border-l-4 border-primary pl-6 space-y-4 relative">
                                <Quote className="absolute -top-4 -left-3 text-primary opacity-20" size={80} />
                                <p className="text-slate-300 leading-relaxed text-lg italic relative z-10">
                                    "At AMRA Geogreen Works, we believe that infrastructure is the backbone of progress. Our commitment to excellence, safety, and sustainability drives every project we undertake."
                                </p>
                                <p className="text-slate-300 leading-relaxed">
                                    With over 15 years of experience in challenging terrains and complex geotechnical projects, we have established ourselves as a trusted partner for government and private infrastructure development. Our team of dedicated engineers and skilled workforce ensures that every highway, every slope, and every structure we build stands as a testament to quality and precision.
                                </p>
                                <p className="text-slate-300 leading-relaxed">
                                    We are proud to contribute to India's growth story, and we remain committed to delivering projects that not only meet specifications but exceed expectations.
                                </p>
                            </div>
                            <div className="pt-4">
                                <p className="text-primary font-heading font-bold text-xl">Mr. Amit Kundu</p>
                                <p className="text-slate-400 text-sm uppercase tracking-wider">Director</p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 rounded-lg transform translate-x-6 translate-y-6"></div>
                            <div className="relative bg-white p-2 rounded-lg shadow-2xl">
                                <img
                                    src="/images/about/director.png?v=2"
                                    alt="Director"
                                    className="w-full h-[500px] object-cover object-top rounded-sm grayscale"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-2 sm:-left-6 bg-primary p-4 sm:p-6 rounded-sm shadow-xl">
                                <p className="text-secondary font-heading font-extrabold text-4xl sm:text-5xl">10+</p>
                                <p className="text-secondary text-xs sm:text-sm uppercase font-bold tracking-wider">Years Leading</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Statistics - Renamed: "Our Impact" */}
            <section className="py-20 bg-secondary text-white relative">
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-zinc-800">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <div className="text-5xl font-heading font-extrabold mb-2 text-primary">10+</div>
                            <div className="text-zinc-400 uppercase tracking-widest text-sm font-semibold">Years of Excellence</div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <div className="text-5xl font-heading font-extrabold mb-2 text-primary">8+</div>
                            <div className="text-zinc-400 uppercase tracking-widest text-sm font-semibold">States of Operation</div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                            <div className="text-5xl font-heading font-extrabold mb-2 text-primary">150+</div>
                            <div className="text-zinc-400 uppercase tracking-widest text-sm font-semibold">Skilled Professionals</div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                            <div className="text-5xl font-heading font-extrabold mb-2 text-primary">8+</div>
                            <div className="text-zinc-400 uppercase tracking-widest text-sm font-semibold">Projects Completed</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us - "The AMRA Advantage" */}
            <section className="section bg-slate-50">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <img
                                src="/images/real/photo-4.jpg"
                                alt="Construction Site"
                                className="rounded-sm shadow-2xl z-10 relative object-cover h-96 w-full"
                            />
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 z-0 -m-4 rounded-full blur-3xl"></div>
                            <div className="absolute top-10 -left-10 w-24 h-24 bg-primary z-20 flex items-center justify-center p-4 shadow-lg">
                                <Award className="text-secondary w-12 h-12" />
                            </div>
                        </div>

                        <div>
                            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Why Choose Us</span>
                            <h2 className="text-4xl font-heading font-bold text-secondary mb-6 leading-tight uppercase">
                                Engineering Excellence You Can Trust
                            </h2>
                            <p className="text-slate-500 mb-8 leading-relaxed">
                                We combine technical expertise with a commitment to quality and sustainability. Our approach goes beyond construction; we deliver resilient infrastructure.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4 group">
                                    <div className="w-12 h-12 bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                                        <HardHat className="text-primary group-hover:text-secondary transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-bold text-lg text-secondary mb-1">Advanced Safety Standards</h3>
                                        <p className="text-slate-500 text-sm">International safety protocols implemented at every site.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 group">
                                    <div className="w-12 h-12 bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                                        <Users className="text-primary group-hover:text-secondary transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-bold text-lg text-secondary mb-1">Expert Workforce</h3>
                                        <p className="text-slate-500 text-sm">Highly skilled engineers and project managers.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 group">
                                    <div className="w-12 h-12 bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                                        <CheckCircle className="text-primary group-hover:text-secondary transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-bold text-lg text-secondary mb-1">Timely Execution</h3>
                                        <p className="text-slate-500 text-sm">Proven track record of delivering Govt. tenders on time.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Equipment & Fleet Section */}
        <section className="section bg-slate-50">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary uppercase tracking-tight mb-4">
                        Our Modern <span className="text-primary">Equipment Fleet</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-primary mx-auto mb-6 rounded-full"></div>
                    <p className="text-lg text-slate-600 font-body">
                        We own and operate a modern fleet of specialized construction equipment to ensure efficient, safe, and timely execution of complex projects across diverse Himalayan terrains.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Equipment 1 */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg group hover:-translate-y-2 transition-all duration-300">
                        <div className="h-48 overflow-hidden relative">
                            <img src="/images/real/gen-highway.png" alt="Hydraulic Excavators" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent"></div>
                            <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl font-heading tracking-wide">Hydraulic Excavators</h3>
                        </div>
                        <div className="p-5">
                            <p className="text-slate-500 text-sm font-body">Heavy-duty earthmoving equipment essential for grading, trenching, and massive highway construction in challenging environments.</p>
                        </div>
                    </div>

                    {/* Equipment 2 */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg group hover:-translate-y-2 transition-all duration-300">
                        <div className="h-48 overflow-hidden relative">
                            <img src="/images/real/gen-slope.png" alt="Drilling & Nailing Rigs" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent"></div>
                            <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl font-heading tracking-wide">Drilling Rigs</h3>
                        </div>
                        <div className="p-5">
                            <p className="text-slate-500 text-sm font-body">Specialized geotechnical rigs used for deep soil nailing, rock bolting, and advanced slope stabilization anchoring.</p>
                        </div>
                    </div>

                    {/* Equipment 3 */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg group hover:-translate-y-2 transition-all duration-300">
                        <div className="h-48 overflow-hidden relative">
                            <img src="/images/real/gen-survey.png" alt="Advanced Surveying" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent"></div>
                            <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl font-heading tracking-wide">Surveying Tech</h3>
                        </div>
                        <div className="p-5">
                            <p className="text-slate-500 text-sm font-body">High-precision Total Stations and DGPS systems for accurate topographical mapping and engineering alignment.</p>
                        </div>
                    </div>

                    {/* Equipment 4 */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg group hover:-translate-y-2 transition-all duration-300">
                        <div className="h-48 overflow-hidden relative">
                            <img src="/images/real/photo-3.jpg" alt="Shotcrete Machines" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent"></div>
                            <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl font-heading tracking-wide">Shotcrete Units</h3>
                        </div>
                        <div className="p-5">
                            <p className="text-slate-500 text-sm font-body">High-pressure concrete spraying machines used to rapidly reinforce excavated surfaces and steep slopes.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

            {/* Services Highlight - "Our Expertise" */}
            <section className="section bg-white">
                <div className="container">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Our Expertise</span>
                        <h2 className="text-4xl font-heading font-bold text-secondary mb-4 uppercase">Core Services</h2>
                        <div className="w-16 h-1 bg-primary mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: 'Highway Construction', icon: <Truck size={28} /> },
                            { title: 'Hill Slope Protection', icon: <Mountain size={28} /> },
                            { title: 'Gabion Works', icon: <LayoutGrid size={28} /> },
                            { title: 'Soil Nailing', icon: <Hammer size={28} /> },
                            { title: 'Retaining Walls', icon: <Layers size={28} /> },
                            { title: 'Drainage Systems', icon: <Droplet size={28} /> }
                        ].map((service, index) => (
                            <motion.div
                                className="group relative bg-slate-50 hover:bg-secondary p-10 transition-all duration-300 border-b-4 border-transparent hover:border-primary"
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="mb-6 inline-block p-4 bg-white shadow-sm rounded-full group-hover:bg-primary transition-colors text-secondary">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-heading font-bold mb-3 text-secondary group-hover:text-white uppercase tracking-wide">{service.title}</h3>
                                <p className="text-slate-500 group-hover:text-slate-300 mb-6 transition-colors">
                                    Engineered for durability in challenging terrains.
                                </p>
                                <a href="/services" className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-secondary group-hover:text-primary transition-colors">
                                    Read More <ChevronRight size={16} className="ml-1" />
                                </a>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12 block md:hidden">
                        <a href="/services" className="btn bg-secondary text-white hover:bg-primary hover:text-secondary w-full">View All Services</a>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-secondary text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="container relative z-10">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8 uppercase">Ready to Build the Future?</h2>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Partner with AMRA Geogreen for world-class infrastructure solutions.</p>
                    <a href="/contact" className="btn bg-primary text-secondary hover:bg-white font-bold uppercase tracking-wider px-10 py-4 text-lg">
                        Get a Quote Today
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Home;
