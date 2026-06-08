import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Briefcase } from 'lucide-react';

const Careers = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        const name = e.target.querySelector('input[type="text"]').value;
        const email = e.target.querySelector('input[type="email"]').value;

        formData.append('name', name);
        formData.append('email', email);
        if (file) {
            formData.append('cv', file);
        } else {
            alert("Please upload a CV");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/careers/apply', {
                method: 'POST',
                body: formData, // No Content-Type header needed for FormData
            });
            const data = await response.json();

            if (data.success) {
                alert('Application submitted successfully!');
                e.target.reset();
                setFile(null);
            } else {
                alert('Failed to submit application: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="pt-20">
            <section className="bg-slate-50 py-20">
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark mb-4">Join Our Team</h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">Build a career with the leaders in infrastructure engineering.</p>
                    </motion.div>
                </div>
            </section>

            <section className="section bg-white">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-800 mb-6">Current Openings</h2>
                                <div className="space-y-4">
                                    {[
                                        { title: 'Senior Civil Engineer', exp: '5+ Years', loc: 'Himachal Pradesh', desc: 'Expertise in hillside road construction and retaining wall design required.' },
                                        { title: 'Site Supervisor', exp: '2+ Years', loc: 'Uttarakhand', desc: 'Site execution, labor management, and quality control.' },
                                        { title: 'Project Manager', exp: '10+ Years', loc: 'New Delhi (HQ)', desc: 'Handling end-to-end execution of government tender projects.' }
                                    ].map((job, idx) => (
                                        <div key={idx} className="p-6 border border-slate-200 rounded-lg hover:border-primary transition-colors bg-slate-50">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">{job.loc}</span>
                                            </div>
                                            <p className="text-sm text-slate-500 mb-3 flex items-center gap-2"><Briefcase size={14} /> {job.exp}</p>
                                            <p className="text-slate-600">{job.desc}</p>
                                            <button className="text-primary font-bold text-sm mt-3 hover:underline">View Details</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 h-fit sticky top-24">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Apply Now</h3>
                            <p className="text-slate-500 mb-6">Send us your CV and we will find the right role for you.</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                                    <input type="text" required placeholder="Your Name"
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                                    <input type="email" required placeholder="your.email@example.com"
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Upload CV (PDF/Word)</label>
                                    <div className="relative border-2 border-dashed border-slate-300 bg-white p-8 text-center rounded-lg hover:border-primary transition-colors cursor-pointer group">
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <Upload size={32} className="mx-auto text-slate-400 group-hover:text-primary mb-2 transition-colors" />
                                        <p className="text-sm text-slate-500 font-medium">{file ? file.name : "Drag & Drop or Click to Upload"}</p>
                                    </div>
                                </div>
                                <button type="submit" className="w-full btn btn-primary justify-center mt-2">Submit Application</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Careers;
