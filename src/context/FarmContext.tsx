import React, { createContext, useContext, useState, useEffect } from 'react';
import { Farm, FarmField, FarmActivity, FarmFinancialRecord, FarmHarvestRecord } from '../types';

interface FarmContextType {
  farms: Farm[];
  currentFarm: Farm | null;
  setCurrentFarm: (farm: Farm) => void;
  fields: FarmField[];
  activities: FarmActivity[];
  financials: FarmFinancialRecord[];
  harvests: FarmHarvestRecord[];
  addFarm: (farm: Omit<Farm, 'id' | 'createdAt'>) => void;
  addField: (field: Omit<FarmField, 'id'>) => void;
  addActivity: (activity: Omit<FarmActivity, 'id'>) => void;
  toggleActivity: (id: string) => void;
  addFinancial: (record: Omit<FarmFinancialRecord, 'id'>) => void;
  addHarvest: (record: Omit<FarmHarvestRecord, 'id'>) => void;
  totalIncomeKES: number;
  totalExpensesKES: number;
  netProfitKES: number;
  exportCSV: () => void;
}

const initialFarms: Farm[] = [
  {
    id: 'farm-1',
    name: 'Rift Valley Green Fields',
    county: 'Uasin Gishu',
    subCounty: 'Moiben',
    acreage: 15.0,
    soilType: 'Red Volcanic Loam',
    waterSource: 'Borehole & Seasonal Stream',
    createdAt: '2026-01-15'
  }
];

const initialFields: FarmField[] = [
  {
    id: 'field-1',
    farmId: 'farm-1',
    name: 'North Block (Maize H614)',
    acreage: 8.0,
    cropOrEnterprise: 'Hybrid Maize (H614D)',
    variety: 'H614D',
    plantingDate: '2026-04-05',
    targetHarvestDate: '2026-10-25',
    growthStage: 'Maturity / Harvest'
  },
  {
    id: 'field-2',
    farmId: 'farm-1',
    name: 'South Block (Common Beans GLP-2)',
    acreage: 3.5,
    cropOrEnterprise: 'Rosecoco Beans (GLP-2)',
    variety: 'Rosecoco',
    plantingDate: '2026-04-10',
    targetHarvestDate: '2026-07-15',
    growthStage: 'Post-Harvest'
  },
  {
    id: 'field-3',
    farmId: 'farm-1',
    name: 'Dairy Fodder & Silage Block',
    acreage: 3.5,
    cropOrEnterprise: 'Brachiaria & Silage Corn',
    variety: 'Brachiaria Basilisk',
    plantingDate: '2026-03-20',
    targetHarvestDate: 'Continuous',
    growthStage: 'Vegetative'
  }
];

const initialActivities: FarmActivity[] = [
  {
    id: 'act-1',
    farmId: 'farm-1',
    date: '2026-10-14',
    activityType: 'Harvesting',
    details: 'Initiate harvesting of North Block maize on 8 acres. Shelling tractor team booked.',
    costKES: 18000,
    completed: false
  },
  {
    id: 'act-2',
    farmId: 'farm-1',
    date: '2026-10-18',
    activityType: 'Livestock',
    details: 'Quarterly deworming of 6 Ayrshire dairy cows with Albendazole drench.',
    costKES: 2400,
    completed: false
  },
  {
    id: 'act-3',
    farmId: 'farm-1',
    date: '2026-09-28',
    activityType: 'Fertilizing',
    details: 'Applied 4 bags CAN top-dressing on Brachiaria fodder ratoon crop.',
    costKES: 10400,
    completed: true
  }
];

const initialFinancials: FarmFinancialRecord[] = [
  {
    id: 'fin-1',
    farmId: 'farm-1',
    date: '2026-04-02',
    type: 'Expense',
    category: 'Seeds/Seedlings',
    amountKES: 24000,
    notes: 'Purchased 80kg certified H614D maize seed from Kenya Seed Kitale'
  },
  {
    id: 'fin-2',
    farmId: 'farm-1',
    date: '2026-04-04',
    type: 'Expense',
    category: 'Fertilizers',
    amountKES: 45000,
    notes: '8 bags of planting DAP fertilizer (50kg each)'
  },
  {
    id: 'fin-3',
    farmId: 'farm-1',
    date: '2026-07-22',
    type: 'Income',
    category: 'Harvest Sales',
    amountKES: 216000,
    notes: 'Sold 24 bags Rosecoco beans at KES 9,000/bag to Highland Grain Processors'
  },
  {
    id: 'fin-4',
    farmId: 'farm-1',
    date: '2026-09-30',
    type: 'Income',
    category: 'Harvest Sales',
    amountKES: 95400,
    notes: 'September raw milk sales to local dairy cooperative (1,908 litres at KES 50/L)'
  }
];

const initialHarvests: FarmHarvestRecord[] = [
  {
    id: 'harv-1',
    farmId: 'farm-1',
    date: '2026-07-20',
    enterprise: 'Rosecoco Beans (GLP-2)',
    quantity: 24,
    unit: 'bags (90kg)',
    grade: 'Grade 1 Sorted',
    storedOrSold: 'Sold',
    revenueRealizedKES: 216000
  }
];

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [farms, setFarms] = useState<Farm[]>(() => {
    const saved = localStorage.getItem('agri_farms');
    return saved ? JSON.parse(saved) : initialFarms;
  });

  const [currentFarm, setCurrentFarm] = useState<Farm | null>(() => {
    return farms.length > 0 ? farms[0] : null;
  });

  const [fields, setFields] = useState<FarmField[]>(() => {
    const saved = localStorage.getItem('agri_fields');
    return saved ? JSON.parse(saved) : initialFields;
  });

  const [activities, setActivities] = useState<FarmActivity[]>(() => {
    const saved = localStorage.getItem('agri_activities');
    return saved ? JSON.parse(saved) : initialActivities;
  });

  const [financials, setFinancials] = useState<FarmFinancialRecord[]>(() => {
    const saved = localStorage.getItem('agri_financials');
    return saved ? JSON.parse(saved) : initialFinancials;
  });

  const [harvests, setHarvests] = useState<FarmHarvestRecord[]>(() => {
    const saved = localStorage.getItem('agri_harvests');
    return saved ? JSON.parse(saved) : initialHarvests;
  });

  useEffect(() => {
    localStorage.setItem('agri_farms', JSON.stringify(farms));
  }, [farms]);

  useEffect(() => {
    localStorage.setItem('agri_fields', JSON.stringify(fields));
  }, [fields]);

  useEffect(() => {
    localStorage.setItem('agri_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('agri_financials', JSON.stringify(financials));
  }, [financials]);

  useEffect(() => {
    localStorage.setItem('agri_harvests', JSON.stringify(harvests));
  }, [harvests]);

  const addFarm = (farmData: Omit<Farm, 'id' | 'createdAt'>) => {
    const newFarm: Farm = {
      ...farmData,
      id: `farm-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setFarms(prev => [...prev, newFarm]);
    setCurrentFarm(newFarm);
  };

  const addField = (fieldData: Omit<FarmField, 'id'>) => {
    const newField: FarmField = {
      ...fieldData,
      id: `field-${Date.now()}`,
    };
    setFields(prev => [...prev, newField]);
  };

  const addActivity = (actData: Omit<FarmActivity, 'id'>) => {
    const newAct: FarmActivity = {
      ...actData,
      id: `act-${Date.now()}`,
    };
    setActivities(prev => [newAct, ...prev]);
  };

  const toggleActivity = (id: string) => {
    setActivities(prev =>
      prev.map(a => (a.id === id ? { ...a, completed: !a.completed } : a))
    );
  };

  const addFinancial = (finData: Omit<FarmFinancialRecord, 'id'>) => {
    const newFin: FarmFinancialRecord = {
      ...finData,
      id: `fin-${Date.now()}`,
    };
    setFinancials(prev => [newFin, ...prev]);
  };

  const addHarvest = (harvData: Omit<FarmHarvestRecord, 'id'>) => {
    const newHarv: FarmHarvestRecord = {
      ...harvData,
      id: `harv-${Date.now()}`,
    };
    setHarvests(prev => [newHarv, ...prev]);
  };

  const totalIncomeKES = financials
    .filter(f => f.type === 'Income')
    .reduce((sum, f) => sum + f.amountKES, 0);

  const totalExpensesKES = financials
    .filter(f => f.type === 'Expense')
    .reduce((sum, f) => sum + f.amountKES, 0);

  const netProfitKES = totalIncomeKES - totalExpensesKES;

  const exportCSV = () => {
    const headers = 'Date,Type,Category,Amount_KES,Notes\n';
    const rows = financials
      .map(f => `"${f.date}","${f.type}","${f.category}",${f.amountKES},"${f.notes.replace(/"/g, '""')}"`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `farm_records_${currentFarm?.name || 'export'}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <FarmContext.Provider
      value={{
        farms,
        currentFarm,
        setCurrentFarm,
        fields,
        activities,
        financials,
        harvests,
        addFarm,
        addField,
        addActivity,
        toggleActivity,
        addFinancial,
        addHarvest,
        totalIncomeKES,
        totalExpensesKES,
        netProfitKES,
        exportCSV,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
