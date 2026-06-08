import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import projectsData from '../data/projectsData';

const Projects = () => {
    const [dbProjects, setDbProjects] = useState([]);
    const [filter, setFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('all');

    React.useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/projects');
                const data = await res.json();
                if (data.success) {
                    // Combine static data and DB data for demonstration if needed, or just DB data.
                    // For now, let's use the DB data. If it's empty, we should fallback or just show empty.
                    // Actually, let's fetch DB data. 
                    setDbProjects(data.data);
                }
            } catch (err) {
                console.error("Failed to fetch projects", err);
            }
        };
        fetchProjects();
    }, []);

    // Filter by category and status
    // Let's combine the imported static projectsData with the dbProjects
    let filteredProjects = [...projectsData, ...dbProjects];

    if (filter !== 'All') {
        filteredProjects = filteredProjects.filter(p => p.category === filter);
    }

    if (statusFilter !== 'all') {
        filteredProjects = filteredProjects.filter(p => p.status === statusFilter);
    }

    // Dynamically calculate categories
    const categories = ['All', ...new Set([...projectsData, ...dbProjects].map(p => p.category))];

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-secondary py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
                <div className="container text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Our Portfolio</span>
                        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-4 uppercase">Engineering Excellence Delivered</h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">Showcasing our completed and ongoing infrastructure projects across India</p>
                    </motion.div>
                </div>
            </section>

            <section className="section bg-white min-h-screen">
                <div className="container">
                    {/* Status Filter */}
                    <div className="flex justify-center gap-4 mb-8">
                        <button
                            onClick={() => setStatusFilter('all')}
                            className={`px-8 py-3 rounded-sm font-heading font-bold uppercase text-sm tracking-wider transition-all ${statusFilter === 'all'
                                    ? 'bg-primary text-secondary shadow-lg'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            All Projects
                        </button>
                        <button
                            onClick={() => setStatusFilter('completed')}
                            className={`px-8 py-3 rounded-sm font-heading font-bold uppercase text-sm tracking-wider transition-all ${statusFilter === 'completed'
                                    ? 'bg-green-500 text-white shadow-lg'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            Completed
                        </button>
                        <button
                            onClick={() => setStatusFilter('ongoing')}
                            className={`px-8 py-3 rounded-sm font-heading font-bold uppercase text-sm tracking-wider transition-all ${statusFilter === 'ongoing'
                                    ? 'bg-yellow-500 text-secondary shadow-lg'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            Ongoing
                        </button>
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 rounded-full font-semibold transition-all ${filter === cat
                                        ? 'bg-secondary text-white shadow-lg'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Projects Count */}
                    <p className="text-center text-slate-500 mb-8">
                        Showing <span className="font-bold text-primary">{filteredProjects.length}</span> project{filteredProjects.length !== 1 ? 's' : ''}
                    </p>

                    {/* Projects Grid */}
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {filteredProjects.map((project) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    key={project.id}
                                >
                                    <Link
                                        to={`/projects/${project.slug}`}
                                        className="group bg-white rounded-lg overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 block h-full"
                                    >
                                        <div className="h-64 relative overflow-hidden">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                                                <span className="bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1 rounded uppercase tracking-wide">
                                                    {project.category}
                                                </span>
                                                <span
                                                    className={`backdrop-blur text-xs font-bold px-3 py-1 rounded uppercase tracking-wide ${project.status === 'completed'
                                                            ? 'bg-green-500/90 text-white'
                                                            : 'bg-yellow-500/90 text-secondary'
                                                        }`}
                                                >
                                                    {project.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-heading font-bold mb-3 text-secondary group-hover:text-primary transition-colors line-clamp-2">
                                                {project.title}
                                            </h3>
                                            <div className="flex gap-4 mb-4 text-sm text-slate-500">
                                                <span className="flex items-center gap-1">
                                                    <MapPin size={14} /> {project.location}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={14} /> {project.year}
                                                </span>
                                            </div>
                                            <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                                {project.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-slate-500 text-xs">Client: {project.client.split(' ').slice(0, 2).join(' ')}...</span>
                                                <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                                    View Details <ArrowUpRight size={16} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* No Results */}
                    {filteredProjects.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-slate-500 text-lg">No projects found with the selected filters.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Projects;
