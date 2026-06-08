import React, { useState, useEffect } from 'react';
import { LayoutDashboard, MessageSquare, Briefcase, FileText, LogOut, Plus, Search, X, TrendingUp, Users, Folder, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [enquiries, setEnquiries] = useState([]);
    const [applications, setApplications] = useState([]);
    const [projects, setProjects] = useState([]);
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [newProject, setNewProject] = useState({
        title: '',
        category: '',
        location: '',
        year: '',
        status: 'ongoing',
        client: '',
        budget: '',
        duration: '',
        description: ''
    });
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin');
    };

    useEffect(() => {
        // Fetch Data
        const fetchData = async () => {
            try {
                if (activeTab === 'enquiries') {
                    const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
                    if (error) throw error;
                    if (data) setEnquiries(data);
                } else if (activeTab === 'applications') {
                    const { data, error } = await supabase.from('applications').select('*').order('created_at', { ascending: false });
                    if (error) throw error;
                    if (data) setApplications(data);
                } else if (activeTab === 'projects') {
                    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
                    if (error) throw error;
                    if (data) setProjects(data);
                }
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };
        fetchData();
    }, [activeTab]);

    const handleAddProject = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase.from('projects').insert([newProject]);
            if (error) throw error;
            
            alert('Project added successfully!');
            setShowProjectModal(false);
            setNewProject({
                title: '',
                category: '',
                location: '',
                year: '',
                status: 'ongoing',
                client: '',
                budget: '',
                duration: '',
                description: ''
            });
            // Trigger refresh
            setActiveTab('');
            setTimeout(() => setActiveTab('projects'), 0);
        } catch (error) {
            console.error('Failed to add project', error);
            alert('Failed to add project');
        }
    };

    // Stats
    const stats = {
        totalEnquiries: enquiries.length,
        totalApplications: applications.length,
        totalProjects: projects.length,
        newEnquiries: enquiries.filter(e => e.status === 'new').length || enquiries.length
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-secondary text-white flex flex-col fixed h-full shadow-xl z-20">
                <div className="p-6 border-b border-slate-800">
                    <img src="/logo.png" alt="AMRA Geogreen" className="h-12 w-auto bg-white p-2 rounded-sm mb-2" />
                    <h3 className="text-lg font-heading font-bold tracking-tight uppercase text-primary mt-3">Admin Panel</h3>
                </div>

                <nav className="flex-1 py-6 space-y-1">
                    <button
                        className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all border-r-4 ${activeTab === 'dashboard' ? 'bg-slate-800 text-white border-primary' : 'text-slate-400 border-transparent hover:bg-slate-800 hover:text-white'}`}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        <LayoutDashboard size={18} /> Dashboard
                    </button>
                    <button
                        className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all border-r-4 ${activeTab === 'enquiries' ? 'bg-slate-800 text-white border-primary' : 'text-slate-400 border-transparent hover:bg-slate-800 hover:text-white'}`}
                        onClick={() => setActiveTab('enquiries')}
                    >
                        <MessageSquare size={18} /> Enquiries
                    </button>
                    <button
                        className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all border-r-4 ${activeTab === 'applications' ? 'bg-slate-800 text-white border-primary' : 'text-slate-400 border-transparent hover:bg-slate-800 hover:text-white'}`}
                        onClick={() => setActiveTab('applications')}
                    >
                        <Briefcase size={18} /> Applications
                    </button>
                    <button
                        className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all border-r-4 ${activeTab === 'projects' ? 'bg-slate-800 text-white border-primary' : 'text-slate-400 border-transparent hover:bg-slate-800 hover:text-white'}`}
                        onClick={() => setActiveTab('projects')}
                    >
                        <FileText size={18} /> Projects
                    </button>
                </nav>

                <div className="p-6 border-t border-slate-800">
                    <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm font-medium">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            {activeTab === 'dashboard' && 'Dashboard Overview'}
                            {activeTab === 'enquiries' && 'Enquiry Management'}
                            {activeTab === 'applications' && 'Talent Acquisition'}
                            {activeTab === 'projects' && 'Project Portfolio'}
                        </h2>
                        <p className="text-slate-500 text-sm mt-1">Manage your website content and user interactions.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary text-secondary rounded-full flex items-center justify-center font-heading font-bold shadow-md">AG</div>
                    </div>
                </header>

                {/* Dashboard View */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-500 uppercase tracking-wider mb-1">Total Enquiries</p>
                                        <p className="text-3xl font-heading font-bold text-secondary">{stats.totalEnquiries}</p>
                                    </div>
                                    <Mail className="text-primary" size={40} />
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-500 uppercase tracking-wider mb-1">Applications</p>
                                        <p className="text-3xl font-heading font-bold text-secondary">{stats.totalApplications}</p>
                                    </div>
                                    <Briefcase className="text-blue-500" size={40} />
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-500 uppercase tracking-wider mb-1">Total Projects</p>
                                        <p className="text-3xl font-heading font-bold text-secondary">{stats.totalProjects}</p>
                                    </div>
                                    <Folder className="text-yellow-500" size={40} />
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-500 uppercase tracking-wider mb-1">New This Month</p>
                                        <p className="text-3xl font-heading font-bold text-secondary">{stats.newEnquiries}</p>
                                    </div>
                                    <TrendingUp className="text-green-500" size={40} />
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                            <h3 className="text-xl font-heading font-bold text-secondary mb-4 uppercase">Quick Actions</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <button
                                    onClick={() => setActiveTab('enquiries')}
                                    className="p-4 border-2 border-slate-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left"
                                >
                                    <MessageSquare className="text-primary mb-2" size={24} />
                                    <p className="font-heading font-bold text-secondary">View Enquiries</p>
                                    <p className="text-sm text-slate-500">Check customer messages</p>
                                </button>
                                <button
                                    onClick={() => setActiveTab('applications')}
                                    className="p-4 border-2 border-slate-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left"
                                >
                                    <Briefcase className="text-primary mb-2" size={24} />
                                    <p className="font-heading font-bold text-secondary">View Applications</p>
                                    <p className="text-sm text-slate-500">Review job applicants</p>
                                </button>
                                <button
                                    onClick={() => {
                                        setActiveTab('projects');
                                        setShowProjectModal(true);
                                    }}
                                    className="p-4 border-2 border-primary bg-primary/5 rounded-lg hover:bg-primary/10 transition-all text-left"
                                >
                                    <Plus className="text-primary mb-2" size={24} />
                                    <p className="font-heading font-bold text-secondary">Add New Project</p>
                                    <p className="text-sm text-slate-500">Showcase completed work</p>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Content Area */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px]">
                    {activeTab === 'enquiries' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="p-4 font-semibold text-slate-600 text-sm">Name</th>
                                        <th className="p-4 font-semibold text-slate-600 text-sm">Email</th>
                                        <th className="p-4 font-semibold text-slate-600 text-sm">Subject</th>
                                        <th className="p-4 font-semibold text-slate-600 text-sm">Date</th>
                                        <th className="p-4 font-semibold text-slate-600 text-sm">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {enquiries.length > 0 ? enquiries.map(item => (
                                        <tr key={item.id} className="hover:bg-slate-50">
                                            <td className="p-4 font-medium text-slate-900">{item.name}</td>
                                            <td className="p-4 text-slate-600">{item.email}</td>
                                            <td className="p-4 text-slate-600">{item.subject}</td>
                                            <td className="p-4 text-slate-500 text-sm">{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}</td>
                                            <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">{item.status || 'new'}</span></td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan="5" className="p-8 text-center text-slate-400">No enquiries found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'applications' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="p-4 font-semibold text-slate-600 text-sm">Name</th>
                                        <th className="p-4 font-semibold text-slate-600 text-sm">Email</th>
                                        <th className="p-4 font-semibold text-slate-600 text-sm">Position</th>
                                        <th className="p-4 font-semibold text-slate-600 text-sm">CV</th>
                                        <th className="p-4 font-semibold text-slate-600 text-sm">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {applications.length > 0 ? applications.map(item => (
                                        <tr key={item.id} className="hover:bg-slate-50">
                                            <td className="p-4 font-medium text-slate-900">{item.name}</td>
                                            <td className="p-4 text-slate-600">{item.email}</td>
                                            <td className="p-4 text-slate-600">{item.position}</td>
                                            <td className="p-4 text-primary underline cursor-pointer">{item.resume_url || 'N/A'}</td>
                                            <td className="p-4 text-slate-500 text-sm">{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}</td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan="5" className="p-8 text-center text-slate-400">No applications received yet.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div className="p-6">
                            <div className="flex justify-end mb-6">
                                <button
                                    onClick={() => setShowProjectModal(true)}
                                    className="btn bg-primary hover:bg-primary-dark text-white font-heading font-bold uppercase tracking-wider px-6 py-3 rounded-sm flex items-center gap-2"
                                >
                                    <Plus size={18} /> Add New Project
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-200 rounded-lg">
                                            <th className="p-4 font-semibold text-slate-600 text-sm">Title</th>
                                            <th className="p-4 font-semibold text-slate-600 text-sm">Category</th>
                                            <th className="p-4 font-semibold text-slate-600 text-sm">Location</th>
                                            <th className="p-4 font-semibold text-slate-600 text-sm">Year</th>
                                            <th className="p-4 font-semibold text-slate-600 text-sm">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {projects.length > 0 ? projects.map(item => (
                                            <tr key={item.id} className="hover:bg-slate-50">
                                                <td className="p-4 font-medium text-slate-900">{item.title}</td>
                                                <td className="p-4 text-slate-600">{item.category}</td>
                                                <td className="p-4 text-slate-600">{item.location}</td>
                                                <td className="p-4 text-slate-500 text-sm">{item.year}</td>
                                                <td className="p-4 text-red-500 cursor-pointer hover:underline">Delete</td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="5" className="p-8 text-center text-slate-400">No projects listed.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Add Project Modal */}
            {showProjectModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-white">
                            <h3 className="text-2xl font-heading font-bold text-secondary uppercase">Add New Project</h3>
                            <button onClick={() => setShowProjectModal(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAddProject} className="p-6 space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-heading font-semibold text-slate-700 mb-2 uppercase">Project Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={newProject.title}
                                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-slate-200 rounded-sm focus:border-primary focus:outline-none"
                                        placeholder="NH-44 Highway Construction"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-heading font-semibold text-slate-700 mb-2 uppercase">Category</label>
                                    <select
                                        required
                                        value={newProject.category}
                                        onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-slate-200 rounded-sm focus:border-primary focus:outline-none"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Highway Construction">Highway Construction</option>
                                        <option value="Slope Protection">Slope Protection</option>
                                        <option value="Retaining Walls">Retaining Walls</option>
                                        <option value="Gabion Works">Gabion Works</option>
                                        <option value="Drainage Systems">Drainage Systems</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-heading font-semibold text-slate-700 mb-2 uppercase">Location</label>
                                    <input
                                        type="text"
                                        required
                                        value={newProject.location}
                                        onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-slate-200 rounded-sm focus:border-primary focus:outline-none"
                                        placeholder="Himachal Pradesh"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-heading font-semibold text-slate-700 mb-2 uppercase">Year</label>
                                    <input
                                        type="text"
                                        required
                                        value={newProject.year}
                                        onChange={(e) => setNewProject({ ...newProject, year: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-slate-200 rounded-sm focus:border-primary focus:outline-none"
                                        placeholder="2024"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-heading font-semibold text-slate-700 mb-2 uppercase">Client</label>
                                    <input
                                        type="text"
                                        required
                                        value={newProject.client}
                                        onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-slate-200 rounded-sm focus:border-primary focus:outline-none"
                                        placeholder="NHAI"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-heading font-semibold text-slate-700 mb-2 uppercase">Status</label>
                                    <select
                                        required
                                        value={newProject.status}
                                        onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-slate-200 rounded-sm focus:border-primary focus:outline-none"
                                    >
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-heading font-semibold text-slate-700 mb-2 uppercase">Budget</label>
                                    <input
                                        type="text"
                                        required
                                        value={newProject.budget}
                                        onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-slate-200 rounded-sm focus:border-primary focus:outline-none"
                                        placeholder="₹450 Crores"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-heading font-semibold text-slate-700 mb-2 uppercase">Duration</label>
                                    <input
                                        type="text"
                                        required
                                        value={newProject.duration}
                                        onChange={(e) => setNewProject({ ...newProject, duration: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-slate-200 rounded-sm focus:border-primary focus:outline-none"
                                        placeholder="24 months"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-heading font-semibold text-slate-700 mb-2 uppercase">Description</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={newProject.description}
                                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-sm focus:border-primary focus:outline-none"
                                    placeholder="Detailed project description..."
                                ></textarea>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowProjectModal(false)}
                                    className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-sm font-heading font-bold uppercase hover:bg-slate-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-primary text-white rounded-sm font-heading font-bold uppercase hover:bg-primary-dark transition-all"
                                >
                                    Add Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
