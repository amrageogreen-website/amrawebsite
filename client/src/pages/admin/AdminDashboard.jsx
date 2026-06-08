import React, { useState, useEffect } from 'react';
import { LayoutDashboard, MessageSquare, Briefcase, FileText, LogOut, Plus, Search, X, TrendingUp, Users, Folder, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [enquiries, setEnquiries] = useState([]);
    const [applications, setApplications] = useState([]);
    const [projects, setProjects] = useState([]);
    const [vacancies, setVacancies] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [heroSlides, setHeroSlides] = useState([]);
    
    // Project Form State
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [isEditingProject, setIsEditingProject] = useState(false);
    const [editProjectId, setEditProjectId] = useState(null);
    const [newProject, setNewProject] = useState({
        title: '',
        category: '',
        location: '',
        year: '',
        status: 'ongoing',
        client: '',
        budget: '',
        duration: '',
        description: '',
        image_url: ''
    });
    
    const [showVacancyModal, setShowVacancyModal] = useState(false);
    const [showTeamModal, setShowTeamModal] = useState(false);
    const [showHeroModal, setShowHeroModal] = useState(false);
    
    const [isEditingVacancy, setIsEditingVacancy] = useState(false);
    const [editVacancyId, setEditVacancyId] = useState(null);
    const [newVacancy, setNewVacancy] = useState({ title: '', exp: '', loc: '', desc: '' });

    const [isEditingTeam, setIsEditingTeam] = useState(false);
    const [editTeamId, setEditTeamId] = useState(null);
    const [newTeam, setNewTeam] = useState({ name: '', position: '', image: '', bio: '', email: '', phone: '' });

    const [isEditingHero, setIsEditingHero] = useState(false);
    const [editHeroId, setEditHeroId] = useState(null);
    const [newHero, setNewHero] = useState({ title: '', subtitle: '', tab: '', image: '' });

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
                } else if (activeTab === 'vacancies') {
                    const { data, error } = await supabase.from('job_vacancies').select('*').order('created_at', { ascending: false });
                    if (error) throw error;
                    if (data) setVacancies(data);
                } else if (activeTab === 'team') {
                    const { data, error } = await supabase.from('team_members').select('*').order('created_at', { ascending: false });
                    if (error) throw error;
                    if (data) setTeamMembers(data);
                } else if (activeTab === 'hero') {
                    const { data, error } = await supabase.from('hero_slides').select('*').order('created_at', { ascending: false });
                    if (error) throw error;
                    if (data) setHeroSlides(data);
                }
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };
        fetchData();
    }, [activeTab]);

    const handleAddProject = async (e) => {
        e.preventDefault();
        
        const slug = newProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        
        try {
            if (isEditingProject && editProjectId) {
                // Update
                const { error } = await supabase.from('projects').update({
                    ...newProject,
                    slug,
                    year: parseInt(newProject.year) || new Date().getFullYear()
                }).eq('id', editProjectId);
                
                if (error) throw error;
                alert('Project updated successfully!');
            } else {
                // Insert
                const projectToInsert = {
                    ...newProject,
                    slug,
                    year: parseInt(newProject.year) || new Date().getFullYear(),
                    challenges: [],
                    solutions: [],
                    highlights: [],
                    technical_specs: {}
                };

                const { error } = await supabase.from('projects').insert([projectToInsert]);
                if (error) throw error;
                alert('Project added successfully!');
            }
            
            setShowProjectModal(false);
            resetProjectForm();
            // Trigger refresh
            setActiveTab('');
            setTimeout(() => setActiveTab('projects'), 0);
        } catch (error) {
            console.error('Failed to save project', error);
            alert('Failed to save project. Error: ' + error.message);
        }
    };

    const resetProjectForm = () => {
        setNewProject({
            title: '', category: '', location: '', year: '',
            status: 'ongoing', client: '', budget: '', duration: '',
            description: '', image_url: ''
        });
        setIsEditingProject(false);
        setEditProjectId(null);
    };

    const openEditProjectModal = (project) => {
        setNewProject({
            title: project.title,
            category: project.category,
            location: project.location,
            year: project.year,
            status: project.status,
            client: project.client,
            budget: project.budget,
            duration: project.duration,
            description: project.description,
            image_url: project.image_url
        });
        setIsEditingProject(true);
        setEditProjectId(project.id);
        setShowProjectModal(true);
    };

    const handleDeleteProject = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        try {
            const { error } = await supabase.from('projects').delete().eq('id', id);
            if (error) throw error;
            alert("Project deleted successfully");
            setProjects(projects.filter(p => p.id !== id));
        } catch (error) {
            console.error('Failed to delete project', error);
            alert('Failed to delete project');
        }
    };

    // Vacancy Handlers
    const resetVacancyForm = () => { setNewVacancy({ title: '', exp: '', loc: '', desc: '' }); setIsEditingVacancy(false); setEditVacancyId(null); };
    const openEditVacancyModal = (v) => { setNewVacancy({ title: v.title, exp: v.exp, loc: v.loc, desc: v.desc }); setIsEditingVacancy(true); setEditVacancyId(v.id); setShowVacancyModal(true); };
    const handleSaveVacancy = async (e) => {
        e.preventDefault();
        try {
            if (isEditingVacancy) {
                await supabase.from('job_vacancies').update(newVacancy).eq('id', editVacancyId);
            } else {
                await supabase.from('job_vacancies').insert([newVacancy]);
            }
            setShowVacancyModal(false); resetVacancyForm();
            setActiveTab(''); setTimeout(() => setActiveTab('vacancies'), 0);
        } catch(e) { alert(e.message); }
    };
    const handleDeleteVacancy = async (id) => {
        if (!window.confirm("Delete?")) return;
        await supabase.from('job_vacancies').delete().eq('id', id);
        setVacancies(vacancies.filter(v => v.id !== id));
    };

    // Team Handlers
    const resetTeamForm = () => { setNewTeam({ name: '', position: '', image: '', bio: '', email: '', phone: '' }); setIsEditingTeam(false); setEditTeamId(null); };
    const openEditTeamModal = (t) => { setNewTeam({ name: t.name, position: t.position, image: t.image, bio: t.bio, email: t.email, phone: t.phone }); setIsEditingTeam(true); setEditTeamId(t.id); setShowTeamModal(true); };
    const handleSaveTeam = async (e) => {
        e.preventDefault();
        try {
            if (isEditingTeam) {
                await supabase.from('team_members').update(newTeam).eq('id', editTeamId);
            } else {
                await supabase.from('team_members').insert([newTeam]);
            }
            setShowTeamModal(false); resetTeamForm();
            setActiveTab(''); setTimeout(() => setActiveTab('team'), 0);
        } catch(e) { alert(e.message); }
    };
    const handleDeleteTeam = async (id) => {
        if (!window.confirm("Delete?")) return;
        await supabase.from('team_members').delete().eq('id', id);
        setTeamMembers(teamMembers.filter(t => t.id !== id));
    };

    // Hero Handlers
    const resetHeroForm = () => { setNewHero({ title: '', subtitle: '', tab: '', image: '' }); setIsEditingHero(false); setEditHeroId(null); };
    const openEditHeroModal = (h) => { setNewHero({ title: h.title, subtitle: h.subtitle, tab: h.tab, image: h.image }); setIsEditingHero(true); setEditHeroId(h.id); setShowHeroModal(true); };
    const handleSaveHero = async (e) => {
        e.preventDefault();
        try {
            if (isEditingHero) {
                await supabase.from('hero_slides').update(newHero).eq('id', editHeroId);
            } else {
                await supabase.from('hero_slides').insert([newHero]);
            }
            setShowHeroModal(false); resetHeroForm();
            setActiveTab(''); setTimeout(() => setActiveTab('hero'), 0);
        } catch(e) { alert(e.message); }
    };
    const handleDeleteHero = async (id) => {
        if (!window.confirm("Delete?")) return;
        await supabase.from('hero_slides').delete().eq('id', id);
        setHeroSlides(heroSlides.filter(h => h.id !== id));
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
                    <button
                        className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all border-r-4 ${activeTab === 'vacancies' ? 'bg-slate-800 text-white border-primary' : 'text-slate-400 border-transparent hover:bg-slate-800 hover:text-white'}`}
                        onClick={() => setActiveTab('vacancies')}
                    >
                        <Briefcase size={18} /> Job Vacancies
                    </button>
                    <button
                        className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all border-r-4 ${activeTab === 'team' ? 'bg-slate-800 text-white border-primary' : 'text-slate-400 border-transparent hover:bg-slate-800 hover:text-white'}`}
                        onClick={() => setActiveTab('team')}
                    >
                        <Users size={18} /> Team Members
                    </button>
                    <button
                        className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all border-r-4 ${activeTab === 'hero' ? 'bg-slate-800 text-white border-primary' : 'text-slate-400 border-transparent hover:bg-slate-800 hover:text-white'}`}
                        onClick={() => setActiveTab('hero')}
                    >
                        <LayoutDashboard size={18} /> Hero Slides
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
                            {activeTab === 'vacancies' && 'Job Vacancies'}
                            {activeTab === 'team' && 'Team Management'}
                            {activeTab === 'hero' && 'Hero Slides Settings'}
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
                                            <td className="p-4 text-primary underline cursor-pointer">
                                                {item.resume_url ? (
                                                    <a href={item.resume_url} target="_blank" rel="noopener noreferrer">View CV</a>
                                                ) : 'N/A'}
                                            </td>
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
                                                <td className="p-4 flex gap-3">
                                                    <span className="text-blue-500 cursor-pointer hover:underline font-semibold" onClick={() => openEditProjectModal(item)}>Edit</span>
                                                    <span className="text-red-500 cursor-pointer hover:underline font-semibold" onClick={() => handleDeleteProject(item.id)}>Delete</span>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="5" className="p-8 text-center text-slate-400">No projects listed.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'vacancies' && (
                        <div className="p-6">
                            <div className="flex justify-end mb-6">
                                <button onClick={() => setShowVacancyModal(true)} className="btn bg-primary hover:bg-primary-dark text-white font-heading font-bold uppercase tracking-wider px-6 py-3 rounded-sm flex items-center gap-2">
                                    <Plus size={18} /> Add Vacancy
                                </button>
                            </div>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="p-4 font-semibold text-slate-600 text-sm">Title</th>
                                        <th className="p-4 font-semibold text-slate-600 text-sm">Experience</th>
                                        <th className="p-4 font-semibold text-slate-600 text-sm">Location</th>
                                        <th className="p-4 font-semibold text-slate-600 text-sm">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vacancies.map(v => (
                                        <tr key={v.id} className="border-b border-slate-100 hover:bg-slate-50">
                                            <td className="p-4">{v.title}</td>
                                            <td className="p-4">{v.exp}</td>
                                            <td className="p-4">{v.loc}</td>
                                            <td className="p-4 flex gap-3">
                                                <span className="text-blue-500 cursor-pointer font-bold" onClick={() => openEditVacancyModal(v)}>Edit</span>
                                                <span className="text-red-500 cursor-pointer font-bold" onClick={() => handleDeleteVacancy(v.id)}>Delete</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'team' && (
                        <div className="p-6">
                            <div className="flex justify-end mb-6">
                                <button onClick={() => setShowTeamModal(true)} className="btn bg-primary hover:bg-primary-dark text-white font-heading font-bold uppercase tracking-wider px-6 py-3 rounded-sm flex items-center gap-2">
                                    <Plus size={18} /> Add Member
                                </button>
                            </div>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="p-4 font-semibold text-slate-600 text-sm">Name</th>
                                        <th className="p-4 font-semibold text-slate-600 text-sm">Position</th>
                                        <th className="p-4 font-semibold text-slate-600 text-sm">Email</th>
                                        <th className="p-4 font-semibold text-slate-600 text-sm">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teamMembers.map(t => (
                                        <tr key={t.id} className="border-b border-slate-100 hover:bg-slate-50">
                                            <td className="p-4">{t.name}</td>
                                            <td className="p-4">{t.position}</td>
                                            <td className="p-4">{t.email}</td>
                                            <td className="p-4 flex gap-3">
                                                <span className="text-blue-500 cursor-pointer font-bold" onClick={() => openEditTeamModal(t)}>Edit</span>
                                                <span className="text-red-500 cursor-pointer font-bold" onClick={() => handleDeleteTeam(t.id)}>Delete</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'hero' && (
                        <div className="p-6">
                            <div className="flex justify-end mb-6">
                                <button onClick={() => setShowHeroModal(true)} className="btn bg-primary hover:bg-primary-dark text-white font-heading font-bold uppercase tracking-wider px-6 py-3 rounded-sm flex items-center gap-2">
                                    <Plus size={18} /> Add Slide
                                </button>
                            </div>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="p-4 font-semibold text-slate-600 text-sm">Title</th>
                                        <th className="p-4 font-semibold text-slate-600 text-sm">Subtitle</th>
                                        <th className="p-4 font-semibold text-slate-600 text-sm">Tab Name</th>
                                        <th className="p-4 font-semibold text-slate-600 text-sm">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {heroSlides.map(h => (
                                        <tr key={h.id} className="border-b border-slate-100 hover:bg-slate-50">
                                            <td className="p-4">{h.title}</td>
                                            <td className="p-4">{h.subtitle}</td>
                                            <td className="p-4">{h.tab}</td>
                                            <td className="p-4 flex gap-3">
                                                <span className="text-blue-500 cursor-pointer font-bold" onClick={() => openEditHeroModal(h)}>Edit</span>
                                                <span className="text-red-500 cursor-pointer font-bold" onClick={() => handleDeleteHero(h.id)}>Delete</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            </main>

            {/* Add Project Modal */}
            {showProjectModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-white">
                            <h3 className="text-2xl font-heading font-bold text-secondary uppercase">
                                {isEditingProject ? "Edit Project" : "Add New Project"}
                            </h3>
                            <button onClick={() => { setShowProjectModal(false); resetProjectForm(); }} className="text-slate-400 hover:text-slate-600">
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

                            <div>
                                <label className="block text-sm font-heading font-semibold text-slate-700 mb-2 uppercase">Image URL</label>
                                <input
                                    type="text"
                                    required
                                    value={newProject.image_url || ''}
                                    onChange={(e) => setNewProject({ ...newProject, image_url: e.target.value })}
                                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-sm focus:border-primary focus:outline-none"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => { setShowProjectModal(false); resetProjectForm(); }}
                                    className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-sm font-heading font-bold uppercase hover:bg-slate-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-primary text-white rounded-sm font-heading font-bold uppercase hover:bg-primary-dark transition-all"
                                >
                                    {isEditingProject ? "Save Changes" : "Add Project"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
                
            {/* Vacancy Modal */}
            {showVacancyModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold uppercase">{isEditingVacancy ? 'Edit Vacancy' : 'Add Vacancy'}</h3>
                            <button onClick={() => {setShowVacancyModal(false); resetVacancyForm();}}><X /></button>
                        </div>
                        <form onSubmit={handleSaveVacancy} className="space-y-4">
                            <input type="text" required placeholder="Title" value={newVacancy.title} onChange={e => setNewVacancy({...newVacancy, title: e.target.value})} className="w-full p-2 border" />
                            <input type="text" required placeholder="Experience (e.g. 5+ Years)" value={newVacancy.exp} onChange={e => setNewVacancy({...newVacancy, exp: e.target.value})} className="w-full p-2 border" />
                            <input type="text" required placeholder="Location" value={newVacancy.loc} onChange={e => setNewVacancy({...newVacancy, loc: e.target.value})} className="w-full p-2 border" />
                            <textarea required placeholder="Description" value={newVacancy.desc} onChange={e => setNewVacancy({...newVacancy, desc: e.target.value})} className="w-full p-2 border" rows="3"></textarea>
                            <button type="submit" className="w-full bg-primary text-white p-3 font-bold uppercase">Save</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Team Modal */}
            {showTeamModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold uppercase">{isEditingTeam ? 'Edit Member' : 'Add Member'}</h3>
                            <button onClick={() => {setShowTeamModal(false); resetTeamForm();}}><X /></button>
                        </div>
                        <form onSubmit={handleSaveTeam} className="space-y-4">
                            <input type="text" required placeholder="Name" value={newTeam.name} onChange={e => setNewTeam({...newTeam, name: e.target.value})} className="w-full p-2 border" />
                            <input type="text" required placeholder="Position" value={newTeam.position} onChange={e => setNewTeam({...newTeam, position: e.target.value})} className="w-full p-2 border" />
                            <input type="text" required placeholder="Email" value={newTeam.email} onChange={e => setNewTeam({...newTeam, email: e.target.value})} className="w-full p-2 border" />
                            <input type="text" required placeholder="Phone" value={newTeam.phone} onChange={e => setNewTeam({...newTeam, phone: e.target.value})} className="w-full p-2 border" />
                            <input type="text" required placeholder="Image URL" value={newTeam.image} onChange={e => setNewTeam({...newTeam, image: e.target.value})} className="w-full p-2 border" />
                            <textarea required placeholder="Bio" value={newTeam.bio} onChange={e => setNewTeam({...newTeam, bio: e.target.value})} className="w-full p-2 border" rows="3"></textarea>
                            <button type="submit" className="w-full bg-primary text-white p-3 font-bold uppercase">Save</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Hero Modal */}
            {showHeroModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold uppercase">{isEditingHero ? 'Edit Slide' : 'Add Slide'}</h3>
                            <button onClick={() => {setShowHeroModal(false); resetHeroForm();}}><X /></button>
                        </div>
                        <form onSubmit={handleSaveHero} className="space-y-4">
                            <input type="text" required placeholder="Title" value={newHero.title} onChange={e => setNewHero({...newHero, title: e.target.value})} className="w-full p-2 border" />
                            <input type="text" required placeholder="Subtitle" value={newHero.subtitle} onChange={e => setNewHero({...newHero, subtitle: e.target.value})} className="w-full p-2 border" />
                            <input type="text" required placeholder="Tab Name (e.g. Integrity)" value={newHero.tab} onChange={e => setNewHero({...newHero, tab: e.target.value})} className="w-full p-2 border" />
                            <input type="text" required placeholder="Image URL" value={newHero.image} onChange={e => setNewHero({...newHero, image: e.target.value})} className="w-full p-2 border" />
                            <button type="submit" className="w-full bg-primary text-white p-3 font-bold uppercase">Save</button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminDashboard;
