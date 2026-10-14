import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, UserProfile, NotificationItem } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  login: (email: string, name?: string, role?: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  dismissNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

export const mockProfiles: Record<UserRole, UserProfile> = {
  guest: {
    id: 'user-guest',
    username: 'guest',
    name: 'Guest Visitor',
    email: 'visitor@agrihub.app',
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
    email: 'm.achieng@agrihub.app',
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
    email: 'j.ndungu@agrihub.app',
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
    username: 'adams_kering',
    name: 'Adams Kipkoech Kering',
    email: 'adams.kering@agrihub.app',
    role: 'admin',
    userType: 'agribusiness',
    county: 'Uasin Gishu',
    country: 'Kenya',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    bio: 'Founder & Full-Stack Agricultural Technology Developer of AgriHub. Dedicated to advancing farmer livelihoods and agricultural market access across Kenya and Africa.',
    farmingInterests: ['All Farming Sectors', 'National Agronomy Data', 'AgTech Systems'],
    joinedDate: '2023-01-01',
    followersCount: 4200,
    followingCount: 210,
    verifiedBadge: true,
  }
};

const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'user-farmer-1',
    type: 'like',
    title: 'New Like on Harvest Post',
    message: 'Sarah M. liked your post "Drying down our SC Duma maize crop after early rains 🌽".',
    read: false,
    createdAt: '10m ago'
  },
  {
    id: 'notif-2',
    userId: 'user-farmer-1',
    type: 'comment',
    title: 'New Agronomy Reply',
    message: 'Dr. Beatrice Wambui replied to your enquiry about soil pH liming in Eldoret.',
    read: false,
    createdAt: '1h ago'
  },
  {
    id: 'notif-3',
    userId: 'user-farmer-1',
    type: 'enquiry',
    title: 'New Marketplace Buyer Enquiry',
    message: 'David Omondi requested quote for 15 crates of Anna F1 tomatoes.',
    read: true,
    createdAt: '1d ago'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('agri_role');
    return (saved as UserRole) || 'farmer';
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedProfile = localStorage.getItem('agri_user_profile');
    if (savedProfile) {
      try {
        return JSON.parse(savedProfile);
      } catch (e) {
        // Fallback
      }
    }
    const initialRole = (localStorage.getItem('agri_role') as UserRole) || 'farmer';
    return mockProfiles[initialRole] || mockProfiles.farmer;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('agri_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    const profile = mockProfiles[newRole];
    setUser(profile);
    localStorage.setItem('agri_role', newRole);
    localStorage.setItem('agri_user_profile', JSON.stringify(profile));
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!user) return;
    const next = { ...user, ...updated };
    setUser(next);
    localStorage.setItem('agri_user_profile', JSON.stringify(next));
  };

  const login = (email: string, name = 'Adams Kipkoech Kering', userRole: UserRole = 'farmer') => {
    const base = mockProfiles[userRole] || mockProfiles.farmer;
    const newUser: UserProfile = {
      ...base,
      id: `user-${Date.now()}`,
      name,
      email,
      role: userRole,
    };
    setUser(newUser);
    setRoleState(userRole);
    localStorage.setItem('agri_role', userRole);
    localStorage.setItem('agri_user_profile', JSON.stringify(newUser));
  };

  const logout = () => {
    setRole('guest');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
      localStorage.setItem('agri_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      localStorage.setItem('agri_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== id);
      localStorage.setItem('agri_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    localStorage.setItem('agri_notifications', JSON.stringify([]));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        setRole,
        updateProfile,
        login,
        logout,
        isAuthenticated: role !== 'guest',
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        dismissNotification,
        clearAllNotifications,
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
