import React from 'react';
import { CalculatorsSuite } from '../components/CalculatorsSuite';

interface CalculatorsPageProps {
  onBack?: () => void;
  initialCalcId?: number;
}

export const CalculatorsPage: React.FC<CalculatorsPageProps> = ({ onBack, initialCalcId }) => {
  return (
    <div className="pb-12">
      <CalculatorsSuite onBack={onBack} initialCalcId={initialCalcId} />
    </div>
  );
};
