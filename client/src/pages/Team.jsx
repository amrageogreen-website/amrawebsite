import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Phone } from 'lucide-react';

const Team = () => {
    const teamMembers = [
        {
            name: "Mr. [Director Name]",
            position: "Managing Director",
            image: "/images/about/team.png",
            bio: "Over 20 years of experience in infrastructure development and geotechnical engineering.",
            email: "director@amrageogreen.com",
            phone: "+91 987 654 3210"
        },
        {
            name: "Eng. [Name]",
            position: "Chief Engineer - Highway Construction",
            image: "/images/about/team.png",
            bio: "Specialist in highway construction with expertise in asphalt paving and road design.",
            email: "engineer@amrageogreen.com",
            phone: "+91 987 654 3211"
        },
        {
            name: "Eng. [Name]",
            position: "Head - Slope Protection",
            image: "/images/about/team.png",
            bio: "Expert in geotechnical solutions, slope stabilization, and soil nailing techniques.",
            email: "slope@amrageogreen.com",
            phone: "+91 987 654 3212"
        },
        {
            name: "[Name]",
            position: "Project Manager",
            image: "/images/about/team.png",
            bio: "Experienced in managing large-scale infrastructure projects across India.",
            email: "pm@amrageogreen.com",
            phone: "+91 987 654 3213"
        },
        {
            name: "[Name]",
            position: "Safety Officer",
            image: "/images/about/team.png",
            bio: "Ensuring international safety standards across all AMRA Geogreen projects.",
            email: "safety@amrageogreen.com",
            phone: "+91 987 654 3214"
        },
        {
            name: "[Name]",
            position: "Quality Assurance Head",
            image: "/images/about/team.png",
            bio: "Maintaining quality benchmarks and ensuring compliance with industry standards.",
            email: "qa@amrageogreen.com",
            phone: "+91 987 654 3215"
        }
    ];

    return (
        <div className="pt-20">
            {/* Header */}
            <section className="bg-secondary py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
                <div className="container text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Meet Our Team</span>
                        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-4 uppercase">The Experts Behind Our Success</h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">Dedicated professionals committed to building India's infrastructure</p>
                    </motion.div>
                </div>
            </section>

            {/* Team Grid */}
            <section className="section bg-slate-50">
                <div className="container">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {/* Image */}
                                <div className="relative h-80 overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <h3 className="text-2xl font-heading font-bold mb-1">{member.name}</h3>
                                        <p className="text-primary text-sm uppercase tracking-wider font-bold">{member.position}</p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-4">
                                    <p className="text-slate-600 leading-relaxed">{member.bio}</p>

                                    {/* Contact Info */}
                                    <div className="space-y-2 pt-4 border-t border-slate-200">
                                        <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors group/link">
                                            <Mail size={16} className="text-primary" />
                                            <span className="text-sm group-hover/link:underline">{member.email}</span>
                                        </a>
                                        <a href={`tel:${member.phone}`} className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors group/link">
                                            <Phone size={16} className="text-primary" />
                                            <span className="text-sm group-hover/link:underline">{member.phone}</span>
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-secondary text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="container relative z-10">
                    <h2 className="text-4xl font-heading font-bold text-white mb-6 uppercase">Join Our Team</h2>
                    <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">We're always looking for talented professionals to join our growing team.</p>
                    <a href="/careers" className="btn bg-primary text-secondary hover:bg-white font-bold uppercase tracking-wider px-10 py-4 text-lg inline-block">
                        View Open Positions
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Team;
