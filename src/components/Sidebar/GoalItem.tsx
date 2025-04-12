
import React from 'react';
import { Goal } from '@/lib/types';

interface GoalItemProps {
  goal: Goal;
  isSelected: boolean;
  onClick: () => void;
}

const GoalItem = ({ goal, isSelected, onClick }: GoalItemProps) => {
  return (
    <div 
      className={`flex items-center p-2 rounded-md cursor-pointer ${isSelected ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
      onClick={onClick}
    >
      <div 
        className="w-4 h-4 rounded-full mr-2" 
        style={{ backgroundColor: goal.color }}
      />
      <span className="text-sm font-medium">{goal.title}</span>
    </div>
  );
};

export default GoalItem;
