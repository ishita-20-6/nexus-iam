import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useUser } from '@clerk/clerk-react';
import { User, ShieldCheck, Trash2, ArrowUpCircle, RefreshCw } from 'lucide-react';

const UserGovernance = () => {
    const { user: adminUser } = useUser();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('updated_at', { ascending: false });

        if (data) setUsers(data);
        if (error) console.error("Fetch Error:", error.message);
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUpdateRole = async (targetUser, newRole) => {
        // 1. Role Update in DB
        const { error: updateError } = await supabase
            .from('profiles')
            .update({
                role: newRole,
                updated_at: new Date().toISOString()
            })
            .eq('id', targetUser.id);

        if (updateError) {
            console.error("Update failed:", updateError.message);
            return;
        }

        // 2. Audit Log for Realtime Graph
        await supabase
            .from('audit_logs')
            .insert([{
                admin_email: adminUser?.primaryEmailAddress?.emailAddress || 'System Admin',
                action: `UPDATE_${newRole}`,
                target_user: targetUser.email,
                created_at: new Date().toISOString()
            }])
            .select();

        // 3. FORCE REFRESH: Agar admin khud ka role change kare ya permissions unlock karni ho
        // Isse "Viewer" wala restriction turant hat jayega
        if (targetUser.email === adminUser?.primaryEmailAddress?.emailAddress) {
            window.location.reload();
        } else {
            fetchUsers();
            console.log(`SUCCESS: ${targetUser.email} promoted to ${newRole}`);
        }
    };

    const handleDeleteUser = async (targetUser) => {
        if (window.confirm(`Revoke access for ${targetUser.email}?`)) {
            const { error: deleteError } = await supabase
                .from('profiles')
                .delete()
                .eq('id', targetUser.id);

            if (deleteError) return;

            await supabase.from('audit_logs').insert([{
                admin_email: adminUser?.primaryEmailAddress?.emailAddress || 'System Admin',
                action: 'DELETE_USER',
                target_user: targetUser.email
            }]).select();

            setUsers(users.filter(u => u.id !== targetUser.id));
        }
    };

    return (
        <div className="p-8 bg-slate-900 text-white min-h-[400px]">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black italic uppercase flex items-center gap-3 tracking-tighter">
                    <ShieldCheck className="text-blue-500" size={28} />
                    User <span className="text-blue-500">Governance</span>
                </h2>
                <button onClick={fetchUsers} className={`p-2.5 bg-slate-800/50 hover:bg-slate-800 rounded-xl border border-white/5 ${loading ? 'animate-spin' : ''}`}>
                    <RefreshCw size={18} className="text-slate-400" />
                </button>
            </div>

            <div className="grid gap-4">
                {users.map((u) => (
                    <div key={u.id} className="group p-5 bg-slate-800/20 border border-white/5 rounded-[2rem] flex justify-between items-center hover:bg-slate-800/40 transition-all shadow-xl">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-blue-500/5 rounded-2xl flex items-center justify-center border border-blue-500/10">
                                <User size={20} className="text-blue-500/70" />
                            </div>
                            <div>
                                <p className="font-mono text-sm font-bold text-slate-200">{u.email}</p>
                                <span className={`text-[9px] px-2 py-0.5 rounded-md font-black uppercase border ${u.role === 'ADMIN' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-slate-800 text-slate-500 border-white/5'}`}>
                                    {u.role}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                            <button
                                onClick={() => handleUpdateRole(u, u.role === 'ADMIN' ? 'VIEWER' : 'ADMIN')}
                                className="px-4 py-2.5 bg-blue-500/10 hover:bg-blue-600 text-blue-400 hover:text-white rounded-xl text-[10px] font-black uppercase transition-all"
                            >
                                <ArrowUpCircle size={14} className="inline mr-2" />
                                {u.role === 'ADMIN' ? 'Demote' : 'Promote'}
                            </button>
                            <button onClick={() => handleDeleteUser(u)} className="p-2.5 bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white rounded-xl transition-all">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserGovernance;