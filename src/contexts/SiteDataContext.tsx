import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc, collection, query, orderBy, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';

export interface SiteSettings {
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  officeAddress: string;
  ceoName: string;
  ceoRole: string;
  ceoInitials: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  order: number;
}

interface SiteDataContextType {
  settings: SiteSettings | null;
  team: TeamMember[];
  loading: boolean;
  updateSettings: (settings: SiteSettings) => Promise<void>;
  upsertTeamMember: (member: Omit<TeamMember, 'id'>, id?: string) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

const defaultSettings: SiteSettings = {
  companyName: 'j s Media',
  contactEmail: 'contact@jsmedia.com',
  contactPhone: '+91 98765 43210',
  officeAddress: '123 Business Hub, Pune, Maharashtra, India',
  ceoName: 'Javed Sayyad',
  ceoRole: 'Founder & CEO',
  ceoInitials: 'JS'
};

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    // Listen to settings
    const settingsUnsubscribe = onSnapshot(doc(db, 'settings', 'site'), (doc) => {
      if (doc.exists()) {
        setSettings(doc.data() as SiteSettings);
      } else {
        setSettings(defaultSettings);
      }
      setLoading(false);
    });

    // Listen to team
    const teamQuery = query(collection(db, 'team'), orderBy('order', 'asc'));
    const teamUnsubscribe = onSnapshot(teamQuery, (snapshot) => {
      const teamData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TeamMember[];
      setTeam(teamData);
    });

    return () => {
      settingsUnsubscribe();
      teamUnsubscribe();
    };
  }, []);

  const updateSettings = async (newSettings: SiteSettings) => {
    if (!isAdmin) throw new Error('Unauthorized');
    await setDoc(doc(db, 'settings', 'site'), newSettings);
  };

  const upsertTeamMember = async (member: Omit<TeamMember, 'id'>, id?: string) => {
    if (!isAdmin) throw new Error('Unauthorized');
    const memberDoc = id ? doc(db, 'team', id) : doc(collection(db, 'team'));
    await setDoc(memberDoc, member);
  };

  const deleteTeamMember = async (id: string) => {
    if (!isAdmin) throw new Error('Unauthorized');
    await deleteDoc(doc(db, 'team', id));
  };

  return (
    <SiteDataContext.Provider value={{ settings, team, loading, updateSettings, upsertTeamMember, deleteTeamMember }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (context === undefined) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}
