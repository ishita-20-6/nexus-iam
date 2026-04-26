import React, { useEffect, useState } from 'react';
import { Shield, Lock, FileText, UserCircle, Activity, LogOut, X, Clock, Zap, Search } from 'lucide-react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { supabase } from './supabase';
import { PERMISSIONS } from './permissions';
import UserGovernance from './components/UserGovernance';

function Dashboard() {
    const { user } = useUser();
    const { signOut } = useClerk();

    const [showGovernance, setShowGovernance] = useState(false);
    const [logs, setLogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [graphData, setGraphData] = useState([40, 70, 45, 90, 65, 30, 85, 50, 75, 40, 60, 95]);

    const userRole = user?.publicMetadata?.role || 'VIEWER';
    const can = (act) => PERMISSIONS[userRole]?.includes(act);

    // Initial Fetch
    const fetchLogs = async () => {
        const { data, error } = await supabase
            .from('audit_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(6);

        if (data) setLogs(data);
        if (error) console.error("Log Fetch Error:", error.message);
    };

    useEffect(() => {
        const syncUser = async () => {
            if (user) {
                await supabase.from('profiles').upsert({
                    id: user.id,
                    email: user.primaryEmailAddress?.emailAddress,
                    updated_at: new Date()
                });
            }
        };

        syncUser();
        fetchLogs();

        // REALTIME SUBSCRIPTION: Live Updates ke liye
        const channel = supabase
            .channel('audit-changes')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'audit_logs' },
                (payload) => {
                    // Update Logs List
                    setLogs((prev) => [payload.new, ...prev].slice(0, 6));

                    // Trigger "Live" Graph Movement
                    setGraphData((prev) => {
                        const newData = [...prev.slice(1), Math.floor(Math.random() * 70) + 30];
                        return newData;
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    // Modal close hone par logs refresh karo
    useEffect(() => {
        if (!showGovernance) fetchLogs();
    }, [showGovernance]);

    const filteredLogs = logs.filter(log =>
        log.target_user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans selection:bg-blue-500/30 overflow-x-hidden">

            {/* GOVERNANCE MODAL */}
            {showGovernance && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
                    <div className="relative w-full max-w-4xl bg-slate-900 border border-blue-500/20 rounded-[2.5rem] shadow-2xl overflow-hidden">
                        <button onClick={() => setShowGovernance(false)} className="absolute top-6 right-6 p-2.5 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-500 rounded-full transition-all z-10 border border-white/5">
                            <X size={18} />
                        </button>
                        <div className="max-h-[85vh] overflow-y-auto">
                            <UserGovernance />
                        </div>
                    </div>
                </div>
            )}

            {/* HEADER */}
            <header className="flex flex-row justify-between items-center mb-12 gap-4">
                <div className="flex items-center gap-3 flex-shrink-0 group">
                    <div className="p-2 bg-blue-600/10 rounded-xl border border-blue-500/20 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
                        <Shield className="text-blue-500" size={30} />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black tracking-tighter italic uppercase">
                        Nexus<span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]">.IAM</span>
                    </h1>
                </div>

                <div className="flex items-center gap-3 ml-auto">
                    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-xl whitespace-nowrap min-w-fit">
                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                        <div className="flex flex-col">
                            <span className="text-[7px] text-slate-500 font-mono uppercase tracking-widest mb-0.5">System Operator</span>
                            <div className="flex items-center gap-2">
                                <p className="text-xs font-bold tracking-tight">USER: <span className="text-blue-400">{user?.firstName || 'Agent'}</span></p>
                                <span className="text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded font-black uppercase">{userRole}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => signOut()} className="p-3 bg-slate-900/50 border border-white/5 rounded-2xl hover:bg-red-500/10 hover:text-red-500 transition-all">
                        <LogOut size={18} />
                    </button>
                </div>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* PUBLIC REPO */}
                <div className="p-8 bg-slate-900/30 border border-white/5 rounded-[2.5rem] group hover:bg-slate-900/50 transition-all">
                    <div className="w-12 h-12 bg-slate-800/50 rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:border-blue-500/30 transition-all">
                        <FileText className="text-slate-400 group-hover:text-blue-400" size={24} />
                    </div>
                    <h2 className="text-xl font-bold mb-2 uppercase italic tracking-tighter">Public Repository</h2>
                    <p className="text-slate-400 text-sm leading-relaxed">Identity confirmed. Access granted to shared resources.</p>
                </div>

                {/* USER GOVERNANCE MODULE */}
                {can('manage_users') ? (
                    <div className="p-8 bg-blue-600/5 border border-blue-500/20 rounded-[2.5rem] hover:bg-blue-600/10 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <UserCircle size={80} className="text-blue-500" />
                        </div>
                        <UserCircle className="text-blue-500 mb-6" size={32} />
                        <h2 className="text-xl font-bold mb-2 text-blue-500 uppercase italic tracking-tighter">User Governance</h2>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8">Control user lifecycle and permission sets.</p>
                        <button onClick={() => setShowGovernance(true)} className="w-full bg-blue-600 hover:bg-blue-500 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95">
                            Execute Module
                        </button>
                    </div>
                ) : (
                    <div className="p-8 bg-slate-900/10 border border-white/5 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center text-center opacity-50">
                        <Lock className="text-slate-600 mb-4" size={24} />
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Access Restricted</p>
                    </div>
                )}

                {/* AUDIT LOGS - Live Section */}
                <div className="p-8 bg-slate-900/30 border border-white/5 rounded-[2.5rem] flex flex-col h-full group overflow-hidden relative">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Activity className="text-purple-500 animate-pulse" size={22} />
                            <h2 className="text-xl font-bold uppercase italic tracking-tighter">Audit Logs</h2>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-24 focus:w-32 bg-slate-800/50 border border-white/5 rounded-lg px-2 py-1 text-[10px] transition-all outline-none focus:border-purple-500/50"
                            />
                            <Search size={10} className="absolute right-2 top-2 text-slate-500" />
                        </div>
                    </div>

                    {/* LIVE MINI ACTIVITY GRAPH */}
                    <div className="flex items-end gap-1.5 h-12 mb-8 px-1">
                        {graphData.map((h, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-purple-500/20 rounded-t-sm hover:bg-purple-400 transition-all duration-500"
                                style={{ height: `${h}%` }}
                            ></div>
                        ))}
                    </div>

                    <div className="flex-1 space-y-4 overflow-y-auto max-h-[250px] custom-scrollbar pr-1">
                        {filteredLogs.length > 0 ? (
                            filteredLogs.map((log) => (
                                <div key={log.id} className="border-l-2 border-slate-800 hover:border-purple-500/50 pl-4 py-1 transition-all">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${log.action.includes('DELETE') ? 'text-red-400 border-red-500/20 bg-red-500/5' :
                                                log.action.includes('UPDATE') ? 'text-blue-400 border-blue-500/20 bg-blue-500/5' :
                                                    'text-green-400 border-green-500/20 bg-green-500/5'
                                            }`}>
                                            {log.action}
                                        </span>
                                        <span className="text-[9px] text-slate-600 font-mono">
                                            {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 truncate">
                                        <span className="text-slate-500">{log.admin_email?.split('@')[0]}</span> ➔ <span className="text-slate-200">{log.target_user?.split('@')[0]}</span>
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full opacity-20 text-[10px] font-mono italic">
                                NO_LOGS_FOUND_IN_BUFFER
                            </div>
                        )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[9px] font-mono tracking-widest text-slate-500">
                        <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-ping"></span>
                            REALTIME_ACTIVE
                        </span>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;