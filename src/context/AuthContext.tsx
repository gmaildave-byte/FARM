import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  login: (email: string, name?: string, role?: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const mockProfiles: Record<UserRole, UserProfile> = {
  guest: {
    id: 'user-guest',
    username: 'guest',
    name: 'Guest Visitor',
    email: 'visitor@agriknowledge.co.ke',
    role: 'guest',
    userType: 'farmer',
    county: 'Nairobi',
    country: 'Kenya',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    farmingInterests: ['General Agriculture'],
    joinedDate: '2026-01-01',
    followersCount: 0,
    followingCount: 0,
    verifiedBadge: false,
  },
  farmer: {
    id: 'user-farmer-1',
    username: 'kiprono_farms',
    name: 'Kiprono Cheruiyot',
    email: 'kiprono@highlandfarms.co.ke',
    role: 'farmer',
    userType: 'farmer',
    county: 'Uasin Gishu',
    country: 'Kenya',
    farmName: 'Rift Valley Green Farms',
    phone: '+254 712 345 678',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    bio: 'Mixed crop & dairy farmer managing 15 acres of maize, wheat, and 6 zero-grazing Ayrshire cows.',
    farmingInterests: ['Maize', 'Dairy Cattle', 'Soil Health', 'Drip Irrigation'],
    joinedDate: '2024-03-15',
    followersCount: 342,
    followingCount: 88,
    verifiedBadge: true,
  },
  buyer: {
    id: 'user-buyer-1',
    username: 'omondi_procurement',
    name: 'David Omondi',
    email: 'omondi@highlandgrains.co.ke',
    role: 'buyer',
    userType: 'buyer',
    county: 'Nairobi',
    country: 'Kenya',
    phone: '+254 722 889 001',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    bio: 'Bulk procurement manager for Highland Grain Processors Ltd.',
    farmingInterests: ['Dry Maize', 'Soybeans', 'Irish Potatoes'],
    joinedDate: '2024-06-10',
    followersCount: 156,
    followingCount: 45,
    verifiedBadge: true,
  },
  expert: {
    id: 'user-expert-1',
    username: 'dr_beatrice_wambui',
    name: 'Dr. Beatrice Wambui, PhD',
    email: 'dr.wambui@kalro-alumni.org',
    role: 'expert',
    userType: 'expert',
    county: 'Nakuru',
    country: 'Kenya',
    phone: '+254 733 445 566',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    bio: 'Senior Agronomist specializing in cereal pathology and sustainable soil health.',
    farmingInterests: ['Crop Protection', 'Integrated Pest Management', 'Soil Fertility'],
    joinedDate: '2023-11-01',
    followersCount: 1240,
    followingCount: 120,
    verifiedBadge: true,
  },
  editor: {
    id: 'user-editor-1',
    username: 'mercy_achieng_editor',
    name: 'Mercy Achieng',
    email: 'm.achieng@agriknowledge.co.ke',
    role: 'editor',
    userType: 'expert',
    county: 'Kisumu',
    country: 'Kenya',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    bio: 'Agricultural content editor and extension communications officer.',
    farmingInterests: ['Agronomy Research', 'Indigenous Vegetables', 'Aquaculture'],
    joinedDate: '2024-01-15',
    followersCount: 512,
    followingCount: 230,
    verifiedBadge: true,
  },
  moderator: {
    id: 'user-mod-1',
    username: 'jackson_mod',
    name: 'Jackson Ndung\'u',
    email: 'j.ndungu@agriknowledge.co.ke',
    role: 'moderator',
    userType: 'agribusiness',
    county: 'Nairobi',
    country: 'Kenya',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    bio: 'Community safety and forum integrity moderator.',
    farmingInterests: ['Horticulture', 'Greenhouses', 'AgTech'],
    joinedDate: '2024-02-20',
    followersCount: 280,
    followingCount: 95,
    verifiedBadge: true,
  },
  admin: {
    id: 'user-admin-1',
    username: 'admin_agrihub',
    name: 'System Administrator (AgriHub)',
    email: 'admin@agriknowledge.co.ke',
    role: 'admin',
    userType: 'agribusiness',
    county: 'Nairobi',
    country: 'Kenya',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    bio: 'Platform systems & content administration supervisor.',
    farmingInterests: ['All Farming Sectors', 'National Agronomy Data'],
    joinedDate: '2023-01-01',
    followersCount: 3500,
    followingCount: 200,
    verifiedBadge: true,
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('agri_role');
    return (saved as UserRole) || 'farmer';
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    const initialRole = (localStorage.getItem('agri_role') as UserRole) || 'farmer';
    return mockProfiles[initialRole] || mockProfiles.farmer;
  });

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    setUser(mockProfiles[newRole]);
    localStorage.setItem('agri_role', newRole);
  };

  const login = (email: string, name = 'Registered User', userRole: UserRole = 'farmer') => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: userRole,
      county: 'Uasin Gishu',
      farmName: 'My Family Farm',
    };
    setUser(newUser);
    setRoleState(userRole);
    localStorage.setItem('agri_role', userRole);
  };

  const logout = () => {
    setRole('guest');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        setRole,
        login,
        logout,
        isAuthenticated: role !== 'guest',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
