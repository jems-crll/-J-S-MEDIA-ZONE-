import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc, collection, query, orderBy, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';

import { SiteSettings, TeamMember, Campaign } from '../types';

interface SiteDataContextType {
  settings: SiteSettings | null;
  team: TeamMember[];
  campaigns: Campaign[];
  loading: boolean;
  updateSettings: (settings: SiteSettings) => Promise<void>;
  upsertTeamMember: (member: Omit<TeamMember, 'id'>, id?: string) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;
  upsertCampaign: (campaign: Omit<Campaign, 'id'>, id?: string) => Promise<void>;
  deleteCampaign: (id: string) => Promise<void>;
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
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
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

    // Listen to campaigns
    const campaignsQuery = query(collection(db, 'campaigns'), orderBy('createdAt', 'desc'));
    const campaignsUnsubscribe = onSnapshot(campaignsQuery, (snapshot) => {
      const campaignsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Campaign[];
      setCampaigns(campaignsData);
    });

    return () => {
      settingsUnsubscribe();
      teamUnsubscribe();
      campaignsUnsubscribe();
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

  const upsertCampaign = async (campaign: Omit<Campaign, 'id'>, id?: string) => {
    if (!isAdmin) throw new Error('Unauthorized');
    const campaignDoc = id ? doc(db, 'campaigns', id) : doc(collection(db, 'campaigns'));
    await setDoc(campaignDoc, campaign);
  };

  const deleteCampaign = async (id: string) => {
    if (!isAdmin) throw new Error('Unauthorized');
    await deleteDoc(doc(db, 'campaigns', id));
  };

  return (
    <SiteDataContext.Provider value={{ 
      settings, 
      team, 
      campaigns,
      loading, 
      updateSettings, 
      upsertTeamMember, 
      deleteTeamMember,
      upsertCampaign,
      deleteCampaign
    }}>
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
