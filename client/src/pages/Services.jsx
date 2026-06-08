import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Mountain, Layers, LayoutGrid, Hammer, Droplet } from 'lucide-react';

const Services = () => {
    const services = [
        {
            title: "Highway Construction",
            icon: <Truck size={48} />,
            desc: "End-to-end highway infrastructure development including earthworks, pavement, and drainage systems.",
            details: "We utilize advanced paver technologies and high-grade materials to construct durable national and state highways.",
            image: "/images/real/gen-highway.png"
        },
        {
            title: "Hill Slope Protection",
            icon: <Mountain size={48} />,
            desc: "Advanced stabilization techniques to prevent landslides and soil erosion in treacherous terrains.",
            details: "Our expertise includes rock bolting, hydroseeding, and geogrid reinforcement for Himalayan slopes.",
            image: "/images/real/gen-slope.png"
        },
        {
            title: "Retaining Walls",
            icon: <Layers size={48} />,
            desc: "Design and construction of reinforced earth walls, gabion walls, and gravity walls.",
            details: "Specialized in RE Walls for flyovers and concrete retaining structures for mountain roads.",
            image: "/images/real/photo-5.jpg"
        },
        {
            title: "Gabion Works",
            icon: <LayoutGrid size={48} />,
            desc: "Eco-friendly wire mesh containers filled with rocks, ideal for erosion control.",
            details: "High-quality galvanized mesh gabions that provide flexible and permeable structures.",
            image: "/images/real/gen-gabion.png"
        },
        {
            title: "Soil Nailing",
            icon: <Hammer size={48} />,
            desc: "Ground reinforcement method using steel bars and sprayed concrete for slope stability.",
            details: "Effective for excavation support and stabilizing existing slopes using grouted nails.",
            image: "/images/real/photo-6.jpg"
        },
        {
            title: "Drainage Systems",
            icon: <Droplet size={48} />,
            desc: "Comprehensive drainage solutions for highways and hilly terrains.",
            details: "Culvert construction, roadside drains, and sub-surface drainage planning.",
            image: "/images/real/photo-2.jpg"
        }
    ];

    return (
        <div className="pt-20">
            <section className="bg-slate-50 py-20">
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark mb-4">Our Engineering Expertise</h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">Delivering precision engineering for India's most complex infrastructure challenges.</p>
                    </motion.div>
                </div>
            </section>

            {/* Detailed Service Sections */}
            <div className="space-y-0">
                {services.map((service, index) => (
                    <section key={index} className={`section ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                        <div className="container">
                            <motion.div
                                className={`flex flex-col md:flex-row gap-16 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex-1 space-y-6">
                                    <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-2 shadow-sm">
                                        {service.icon}
                                    </div>
                                    <h2 className="text-3xl font-heading font-bold text-secondary uppercase">{service.title}</h2>
                                    <p className="text-xl text-slate-600 font-medium font-body border-l-4 border-primary pl-4">{service.desc}</p>
                                    <p className="text-slate-500 leading-relaxed font-body">{service.details}</p>
                                    <button className="btn btn-primary mt-4 font-heading font-bold uppercase tracking-wider">Get a Quote</button>
                                </div>
                                <div className="flex-1 w-full relative group">
                                    <div className={`absolute inset-0 bg-primary/20 rounded-lg transform transition-transform duration-300 ${index % 2 === 0 ? 'translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2' : '-translate-x-4 translate-y-4 group-hover:-translate-x-2 group-hover:translate-y-2'}`}></div>
                                    <img src={service.image} alt={service.title} className="w-full h-80 object-cover rounded-lg shadow-lg relative z-10 filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                                </div>
                            </motion.div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default Services;
