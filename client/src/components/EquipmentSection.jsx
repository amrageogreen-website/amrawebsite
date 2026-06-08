import React from 'react';
import { motion } from 'framer-motion';
import { 
    Settings, Wrench, Truck, PenTool as Tool2, 
    Tractor, Zap, HardHat, Car, Map,
    Hammer, Maximize, Target, CircleDot,
    Compass, Battery, Activity, Shield, Box
} from 'lucide-react';

const equipmentFleet = [
    { name: 'Excavator', count: 10, icon: <Truck size={24} /> },
    { name: 'Tipper', count: 11, icon: <Truck size={24} /> },
    { name: 'Car', count: 9, icon: <Car size={24} /> },
    { name: 'Generator', count: 6, icon: <Zap size={24} /> },
    { name: 'Mini Mixure', count: 6, icon: <Settings size={24} /> },
    { name: 'Rock Breaker', count: 5, icon: <Hammer size={24} /> },
    { name: 'Backhoe Loader', count: 5, icon: <Tractor size={24} /> },
    { name: 'Flori', count: 4, icon: <Truck size={24} /> },
    { name: 'Auto Level', count: 3, icon: <Target size={24} /> },
    { name: 'Light Tower', count: 3, icon: <Activity size={24} /> },
    { name: 'Tractor', count: 3, icon: <Tractor size={24} /> },
    { name: 'Total Station', count: 2, icon: <Compass size={24} /> },
    { name: 'Vibrator', count: 2, icon: <Activity size={24} /> },
    { name: 'Diesel Tanker', count: 2, icon: <Battery size={24} /> },
    { name: 'Bike', count: 10, icon: <Car size={24} /> },
    { name: 'Air Compressor', count: 1, icon: <Box size={24} /> },
    { name: 'Concrete Pump', count: 1, icon: <Settings size={24} /> },
    { name: 'Crusher', count: 1, icon: <Hammer size={24} /> },
    { name: 'Bar Bending', count: 1, icon: <Wrench size={24} /> },
    { name: 'Paver', count: 1, icon: <Tractor size={24} /> },
    { name: 'Roller', count: 1, icon: <CircleDot size={24} /> },
    { name: 'Camper', count: 1, icon: <Car size={24} /> },
    { name: 'Short Kit Machine', count: 1, icon: <Box size={24} /> },
    { name: 'Welding Machine', count: 1, icon: <Zap size={24} /> },
    { name: 'Grouting Pump', count: 1, icon: <Settings size={24} /> },
    { name: 'Tractor With Grader', count: 1, icon: <Tractor size={24} /> },
    { name: 'Trailer', count: 1, icon: <Truck size={24} /> },
    { name: 'WMM Plant', count: 1, icon: <Settings size={24} /> },
].sort((a, b) => b.count - a.count);

const EquipmentSection = () => {
    return (
        <section className="section bg-white border-t border-slate-100">
            <div className="container">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Our Resources</span>
                    <h2 className="text-4xl font-heading font-bold text-secondary mb-4 uppercase">Equipment & Machinery</h2>
                    <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        We own and operate a modern fleet of construction equipment and resources to ensure efficient, safe, and timely execution of projects across diverse terrains and environments.
                    </p>
                </div>

                {/* Resource Strength Highlight */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
                    <div className="col-span-2 md:col-span-1 bg-secondary text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
                        <Wrench className="w-10 h-10 text-primary mb-3" />
                        <span className="text-4xl font-extrabold text-primary mb-1">76+</span>
                        <span className="text-xs uppercase tracking-widest font-semibold text-slate-300">Total Assets</span>
                    </div>
                    {[
                        { count: 10, label: 'Excavators', icon: <Truck className="w-8 h-8 text-secondary mb-3" /> },
                        { count: 11, label: 'Tippers', icon: <Truck className="w-8 h-8 text-secondary mb-3" /> },
                        { count: 6, label: 'Generators', icon: <Settings className="w-8 h-8 text-secondary mb-3" /> },
                        { count: 2, label: 'Total Stations', icon: <Tool2 className="w-8 h-8 text-secondary mb-3" /> }
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-100 p-6 rounded-lg shadow-sm flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                            {stat.icon}
                            <span className="text-3xl font-extrabold text-secondary mb-1">{stat.count}</span>
                            <span className="text-xs uppercase tracking-widest font-semibold text-slate-500">{stat.label}</span>
                        </div>
                    ))}
                </div>

                {/* Full Equipment Fleet Grid */}
                <h3 className="text-2xl font-bold text-slate-800 mb-8 border-l-4 border-primary pl-4">Complete Equipment Fleet</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {equipmentFleet.map((eq, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: idx * 0.02 }}
                            viewport={{ once: true }}
                            className="bg-slate-50 border border-slate-100 p-6 rounded-lg flex flex-col items-center justify-center text-center hover:bg-primary/5 hover:border-primary/50 hover:shadow-md transition-all group"
                        >
                            <div className="mb-3 text-slate-400 group-hover:text-primary transition-colors">
                                {eq.icon}
                            </div>
                            <span className="text-2xl font-bold text-secondary mb-1">{eq.count}</span>
                            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide group-hover:text-secondary transition-colors">{eq.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EquipmentSection;
