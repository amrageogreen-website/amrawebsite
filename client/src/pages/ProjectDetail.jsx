import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, DollarSign, Users, CheckCircle, AlertTriangle, Lightbulb, X } from 'lucide-react';
import projectsData from '../data/projectsData';

const ProjectDetail = () => {
    const { slug } = useParams();
    const project = projectsData.find(p => p.slug === slug);
    const [lightboxImage, setLightboxImage] = useState(null);

    if (!project) {
        return <Navigate to="/projects" replace />;
    }

    // Get related projects (same category, exclude current)
    const relatedProjects = projectsData
        .filter(p => p.category === project.category && p.id !== project.id)
        .slice(0, 3);

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent"></div>

                <div className="container relative z-10 h-full flex flex-col justify-end pb-16">
                    <Link to="/projects" className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors mb-6">
                        <ArrowLeft size={20} />
                        <span className="font-heading font-bold uppercase text-sm tracking-wider">Back to Projects</span>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <span className="bg-primary text-secondary px-4 py-1 rounded-sm text-sm font-bold uppercase tracking-wider">
                                {project.category}
                            </span>
                            <span className={`px-4 py-1 rounded-sm text-sm font-bold uppercase tracking-wider ${project.status === 'completed'
                                    ? 'bg-green-500/90 text-white'
                                    : 'bg-yellow-500/90 text-secondary'
                                }`}>
                                {project.status}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">{project.title}</h1>
                        <div className="flex flex-wrap gap-6 text-slate-200">
                            <span className="flex items-center gap-2"><MapPin size={18} /> {project.location}</span>
                            <span className="flex items-center gap-2"><Calendar size={18} /> {project.completionDate}</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Project Overview */}
            <section className="section bg-slate-50">
                <div className="container">
                    <div className="grid lg:grid-cols-4 gap-6 mb-12">
                        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary">
                            <DollarSign className="text-primary mb-2" size={24} />
                            <p className="text-sm text-slate-500 uppercase tracking-wider mb-1">Budget</p>
                            <p className="text-2xl font-heading font-bold text-secondary">{project.budget}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary">
                            <Calendar className="text-primary mb-2" size={24} />
                            <p className="text-sm text-slate-500 uppercase tracking-wider mb-1">Duration</p>
                            <p className="text-2xl font-heading font-bold text-secondary">{project.duration}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary">
                            <Users className="text-primary mb-2" size={24} />
                            <p className="text-sm text-slate-500 uppercase tracking-wider mb-1">Team Size</p>
                            <p className="text-2xl font-heading font-bold text-secondary">{project.teamSize}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary">
                            <MapPin className="text-primary mb-2" size={24} />
                            <p className="text-sm text-slate-500 uppercase tracking-wider mb-1">Client</p>
                            <p className="text-lg font-heading font-bold text-secondary leading-tight">{project.client}</p>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <h2 className="text-3xl font-heading font-bold text-secondary mb-4 uppercase">Project Overview</h2>
                        <p className="text-slate-600 leading-relaxed text-lg">{project.description}</p>
                    </div>
                </div>
            </section>

            {/* Challenges & Solutions */}
            <section className="section bg-white">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Challenges */}
                        <div className="bg-slate-50 p-8 rounded-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <AlertTriangle className="text-red-500" size={32} />
                                <h2 className="text-2xl font-heading font-bold text-secondary uppercase">Challenges Faced</h2>
                            </div>
                            <ul className="space-y-3">
                                {project.challenges.map((challenge, idx) => (
                                    <li key={idx} className="flex gap-3 items-start">
                                        <span className="text-red-500 mt-1">●</span>
                                        <span className="text-slate-700">{challenge}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Solutions */}
                        <div className="bg-primary/5 p-8 rounded-lg border-2 border-primary/20">
                            <div className="flex items-center gap-3 mb-6">
                                <Lightbulb className="text-primary" size={32} />
                                <h2 className="text-2xl font-heading font-bold text-secondary uppercase">Solutions Implemented</h2>
                            </div>
                            <ul className="space-y-3">
                                {project.solutions.map((solution, idx) => (
                                    <li key={idx} className="flex gap-3 items-start">
                                        <CheckCircle className="text-primary mt-1 shrink-0" size={18} />
                                        <span className="text-slate-700">{solution}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Image Gallery */}
            <section className="section bg-slate-50">
                <div className="container">
                    <h2 className="text-3xl font-heading font-bold text-secondary mb-8 uppercase text-center">Project Gallery</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {project.images.map((img, idx) => (
                            <motion.div
                                key={idx}
                                className="relative h-64 rounded-lg overflow-hidden cursor-pointer group"
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setLightboxImage(img)}
                            >
                                <img src={img} alt={`${project.title} ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-bold">Click to Enlarge</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Key Highlights */}
            <section className="section bg-white">
                <div className="container">
                    <h2 className="text-3xl font-heading font-bold text-secondary mb-8 uppercase text-center">Key Highlights</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {project.highlights.map((highlight, idx) => (
                            <div key={idx} className="bg-slate-50 p-6 rounded-lg border-l-4 border-primary">
                                <CheckCircle className="text-primary mb-3" size={24} />
                                <p className="text-slate-700 font-medium">{highlight}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Specifications */}
            <section className="section bg-secondary text-white">
                <div className="container">
                    <h2 className="text-3xl font-heading font-bold mb-8 uppercase text-center">Technical Specifications</h2>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {Object.entries(project.technicalSpecs).map(([key, value]) => (
                            <div key={key} className="bg-white/10 backdrop-blur p-6 rounded-lg">
                                <p className="text-primary text-sm uppercase tracking-wider mb-2 font-bold">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </p>
                                <p className="text-white text-lg font-semibold">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
                <section className="section bg-slate-50">
                    <div className="container">
                        <h2 className="text-3xl font-heading font-bold text-secondary mb-8 uppercase text-center">Related Projects</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {relatedProjects.map((proj) => (
                                <Link
                                    key={proj.id}
                                    to={`/projects/${proj.slug}`}
                                    className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="h-48 overflow-hidden">
                                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="p-6">
                                        <span className="text-primary text-xs font-bold uppercase">{proj.category}</span>
                                        <h3 className="text-xl font-heading font-bold text-secondary mt-2 group-hover:text-primary transition-colors">{proj.title}</h3>
                                        <p className="text-slate-500 text-sm mt-2">{proj.location}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Lightbox */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setLightboxImage(null)}
                >
                    <button className="absolute top-4 right-4 text-white hover:text-primary">
                        <X size={32} />
                    </button>
                    <img
                        src={lightboxImage}
                        alt="Enlarged view"
                        className="max-w-full max-h-full object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
};

export default ProjectDetail;
