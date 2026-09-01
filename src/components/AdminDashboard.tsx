import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { useSiteData, SiteSettings, TeamMember } from '../contexts/SiteDataContext';
import { Save, LogOut, Plus, Trash2, Edit2, X, Check, Users, Settings, User as UserIcon, Phone, Mail, MapPin, MessageSquare, Calendar, Menu, ArrowUp } from 'lucide-react';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Enquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: any;
  status: string;
}

interface AdminDashboardProps {
  onBack: () => void;
}

export default function AdminDashboard({ onBack }: AdminDashboardProps) {
  const { user, login, logout, isAdmin, loading: authLoading } = useAuth();
  const { settings, team, loading: dataLoading, updateSettings, upsertTeamMember, deleteTeamMember } = useSiteData();
  
  const [activeTab, setActiveTab] = useState<'settings' | 'team' | 'enquiries'>('settings');
  const [editingMember, setEditingMember] = useState<Partial<TeamMember> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [formData, setFormData] = useState<SiteSettings | null>(null);

  React.useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  React.useEffect(() => {
    if (!isAdmin) return;
    const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEnquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Enquiry)));
    });
    return () => unsubscribe();
  }, [isAdmin]);

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-pink-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full text-center border border-gray-100"
        >
          <div className="w-20 h-20 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <UserIcon className="w-10 h-10 text-pink-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Admin Access</h2>
          <p className="text-gray-600 mb-8">This portal is for authorized j s Media staff only. Please sign in with your office account.</p>
          <button 
            onClick={login}
            className="w-full bg-pink-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-pink-700 transition-all shadow-xl shadow-pink-200"
          >
            Sign in with Google
          </button>
        </motion.div>
      </div>
    );
  }

  const handleSaveSettings = async () => {
    if (!formData) return;
    setIsSaving(true);
    try {
      await updateSettings(formData);
    } catch (error) {
      alert('Error saving settings: ' + error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember?.name || !editingMember?.role) return;
    
    setIsSaving(true);
    try {
      await upsertTeamMember({
        name: editingMember.name,
        role: editingMember.role,
        imageUrl: editingMember.imageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
        order: editingMember.order ?? team.length,
        isSpecial: editingMember.isSpecial || false
      }, editingMember.id);
      alert('Team member saved successfully! (टीम मेंबर जतन झाले!)');
      setEditingMember(null);
    } catch (error) {
      alert('Error saving team member: ' + error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-b md:border-r border-gray-200 flex flex-col">
        <div className="p-6 flex items-center justify-between md:block">
          <div>
            <h1 className="text-2xl font-bold text-pink-600">j s Media</h1>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mt-1">Admin Panel</p>
          </div>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-500"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-1 px-4 py-4 flex-col space-y-2`}>
          <button 
            onClick={onBack}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-pink-600 hover:bg-pink-50 transition-all border border-pink-100 mb-4"
          >
            <ArrowUp className="w-5 h-5 rotate-[-90deg]" />
            Back to Website
          </button>

          <button 
            onClick={() => { setActiveTab('settings'); setIsMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'settings' ? 'bg-pink-50 text-pink-600' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Settings className="w-5 h-5" />
            Site Settings
          </button>
          <button 
            onClick={() => { setActiveTab('team'); setIsMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'team' ? 'bg-pink-50 text-pink-600' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Users className="w-5 h-5" />
            Team Members
          </button>
          <button 
            onClick={() => { setActiveTab('enquiries'); setIsMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'enquiries' ? 'bg-pink-50 text-pink-600' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <MessageSquare className="w-5 h-5" />
            Enquiries
            {enquiries.length > 0 && (
              <span className="ml-auto bg-pink-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                {enquiries.length}
              </span>
            )}
          </button>
        </nav>

        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block p-4 border-t border-gray-100`}>
          <div className="flex items-center gap-3 px-2 mb-4">
            <img src={user.photoURL || ''} alt="" className="w-10 h-10 rounded-full border-2 border-pink-100" />
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-900 truncate">{user.displayName}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 font-bold hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {activeTab === 'settings' ? 'Global Site Settings' : activeTab === 'team' ? 'Manage Our Team' : 'User Enquiries'}
            </h2>
            <p className="text-gray-500 mt-1">Updates will reflect live on the website instantly.</p>
          </div>
          
          {activeTab === 'settings' && (
            <button 
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="hidden md:flex items-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-pink-700 transition-all shadow-lg shadow-pink-100 disabled:opacity-50"
            >
              {isSaving ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" /> : <Save className="w-5 h-5" />}
              Save Changes
            </button>
          )}

          {activeTab === 'team' && (
            <button 
              onClick={() => setEditingMember({})}
              className="flex items-center justify-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-pink-700 transition-all shadow-lg shadow-pink-100"
            >
              <Plus className="w-5 h-5" />
              Add Member
            </button>
          )}
        </header>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-10">
          {activeTab === 'settings' && formData && (
            <div className="max-w-2xl mx-auto space-y-12">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3 pb-2 border-b border-gray-100">
                  <Phone className="w-6 h-6 text-pink-600" /> Contact Details
                </h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                    <input 
                      type="text" 
                      value={formData.companyName}
                      onChange={e => setFormData({...formData, companyName: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-pink-600 focus:ring-4 focus:ring-pink-50 outline-none transition-all text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Contact Email</label>
                    <input 
                      type="email" 
                      value={formData.contactEmail}
                      onChange={e => setFormData({...formData, contactEmail: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-pink-600 focus:ring-4 focus:ring-pink-50 outline-none transition-all text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Contact Phone</label>
                    <input 
                      type="text" 
                      value={formData.contactPhone}
                      onChange={e => setFormData({...formData, contactPhone: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-pink-600 focus:ring-4 focus:ring-pink-50 outline-none transition-all text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Office Address</label>
                    <textarea 
                      rows={4}
                      value={formData.officeAddress}
                      onChange={e => setFormData({...formData, officeAddress: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-pink-600 focus:ring-4 focus:ring-pink-50 outline-none transition-all text-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3 pb-2 border-b border-gray-100">
                  <UserIcon className="w-6 h-6 text-pink-600" /> CEO Details
                </h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">CEO Name</label>
                    <input 
                      type="text" 
                      value={formData.ceoName}
                      onChange={e => setFormData({...formData, ceoName: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-pink-600 focus:ring-4 focus:ring-pink-50 outline-none transition-all text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">CEO Role</label>
                    <input 
                      type="text" 
                      value={formData.ceoRole}
                      onChange={e => setFormData({...formData, ceoRole: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-pink-600 focus:ring-4 focus:ring-pink-50 outline-none transition-all text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Avatar Initials</label>
                    <input 
                      type="text" 
                      maxLength={4}
                      value={formData.ceoInitials}
                      onChange={e => setFormData({...formData, ceoInitials: e.target.value})}
                      className="w-40 px-5 py-4 rounded-2xl border border-gray-200 focus:border-pink-600 focus:ring-4 focus:ring-pink-50 outline-none transition-all text-lg text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="w-full flex items-center justify-center gap-3 bg-pink-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-pink-700 transition-all shadow-xl shadow-pink-200 disabled:opacity-50"
                >
                  {isSaving ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-6 h-6 border-3 border-white border-t-transparent rounded-full" /> : <Save className="w-6 h-6" />}
                  Save All Settings
                </button>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {team.map((member) => (
                  <motion.div 
                    key={member.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group relative bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-pink-200 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <img src={member.imageUrl} alt={member.name} className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-sm" />
                      <div>
                        <h4 className="font-bold text-gray-900">{member.name}</h4>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => setEditingMember(member)}
                        className="p-2 bg-white text-blue-600 rounded-lg shadow-sm hover:bg-blue-50 transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteTeamMember(member.id)}
                        className="p-2 bg-white text-red-600 rounded-lg shadow-sm hover:bg-red-50 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {activeTab === 'enquiries' && (
            <div className="space-y-4">
              {enquiries.length > 0 ? (
                enquiries.map((enquiry) => (
                  <div key={enquiry.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-gray-900">{enquiry.name}</h4>
                        <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {enquiry.createdAt?.toDate().toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 mb-4">
                        <a href={`mailto:${enquiry.email}`} className="text-sm text-pink-600 font-medium flex items-center gap-2 hover:underline">
                          <Mail className="w-4 h-4" /> {enquiry.email}
                        </a>
                      </div>
                      <p className="text-gray-600 bg-white p-4 rounded-xl border border-gray-200 text-sm whitespace-pre-wrap">
                        {enquiry.message}
                      </p>
                    </div>
                    <button 
                      onClick={async () => {
                        if (confirm('Delete this enquiry?')) {
                          await deleteDoc(doc(db, 'enquiries', enquiry.id));
                        }
                      }}
                      className="ml-6 p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-400 font-medium">No enquiries yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingMember(null)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">
                  {editingMember.id ? 'Edit Team Member' : 'Add New Member'}
                </h3>
                <button onClick={() => setEditingMember(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSaveMember} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Member Full Name (नाव)</label>
                  <input 
                    required
                    type="text" 
                    value={editingMember.name || ''}
                    onChange={e => setEditingMember({...editingMember, name: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-pink-600 focus:ring-4 focus:ring-pink-50 outline-none transition-all text-lg"
                    placeholder="उदा. Swapnil Jadhav"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Role / Post (हुद्दा)</label>
                  <input 
                    required
                    type="text" 
                    value={editingMember.role || ''}
                    onChange={e => setEditingMember({...editingMember, role: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-pink-600 focus:ring-4 focus:ring-pink-50 outline-none transition-all text-lg"
                    placeholder="उदा. Director & CEO"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Profile Photo (फोटो निवडा)</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50">
                      {editingMember.imageUrl ? (
                        <img src={editingMember.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Plus className="w-8 h-8 text-gray-300" />
                      )}
                    </div>
                    <label className="flex-1">
                      <div className="bg-white border-2 border-pink-100 text-pink-600 px-4 py-3 rounded-xl font-bold text-center cursor-pointer hover:bg-pink-50 transition-all">
                        Select from Gallery
                      </div>
                      <input 
                        type="file" 
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.size > 1024 * 1024) {
                              alert('Image size should be less than 1MB');
                              return;
                            }
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setEditingMember({...editingMember, imageUrl: reader.result as string});
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2">Maximum size: 1MB. Recommended: Square photo.</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Display Priority (क्रम)</label>
                  <input 
                    type="number" 
                    value={editingMember.order ?? 0}
                    onChange={e => setEditingMember({...editingMember, order: parseInt(e.target.value)})}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-pink-600 focus:ring-4 focus:ring-pink-50 outline-none transition-all text-lg"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-2xl border border-pink-100">
                  <input 
                    type="checkbox"
                    id="is-special"
                    checked={editingMember.isSpecial || false}
                    onChange={e => setEditingMember({...editingMember, isSpecial: e.target.checked})}
                    className="w-5 h-5 accent-pink-600"
                  />
                  <label htmlFor="is-special" className="text-sm font-bold text-pink-900 cursor-pointer">
                    Feature Member (स्टार दाखवा)
                  </label>
                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setEditingMember(null)}
                    className="flex-1 px-6 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all border border-gray-200"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 bg-pink-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-pink-700 transition-all shadow-xl shadow-pink-100 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSaving && <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />}
                    {editingMember.id ? 'Save Changes' : 'Add Member'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
