import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Briefcase } from 'lucide-react';
import { supabase } from '../supabaseClient';

const Careers = () => {
    const [file, setFile] = useState(null);
    const [jobVacancies, setJobVacancies] = useState([]);

    useEffect(() => {
        const fetchVacancies = async () => {
            const { data, error } = await supabase.from('job_vacancies').select('*').order('created_at', { ascending: false });
            if (!error && data) {
                setJobVacancies(data);
            }
        };
        fetchVacancies();
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.querySelector('input[type="text"]').value;
        const email = e.target.querySelector('input[type="email"]').value;

        if (!file) {
            alert("Please upload a CV");
            return;
        }

        try {
            // Upload file to Supabase Storage (bucket: 'resumes')
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('resumes')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: publicUrlData } = supabase.storage.from('resumes').getPublicUrl(fileName);
            const resume_url = publicUrlData.publicUrl;

            // Insert into Database
            const { error: dbError } = await supabase.from('applications').insert([{
                name,
                email,
                phone: 'N/A', // Using N/A as it's not in the form
                position: 'General Application', // General application
                experience: 'N/A',
                message: '',
                resume_url
            }]);

            if (dbError) throw dbError;

            alert('Application submitted successfully!');
            e.target.reset();
            setFile(null);
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
                                    {jobVacancies.map((job, idx) => (
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
