
import React, { useState } from 'react';
import { Goal, Task } from '@/lib/types';
import GoalItem from './GoalItem';
import TaskItem from './TaskItem';

interface SidebarProps {
  goals: Goal[];
  tasks: Task[];
  onTaskDragStart: (task: Task) => void;
}

const Sidebar = ({ goals, tasks, onTaskDragStart }: SidebarProps) => {
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  
  const handleGoalClick = (goalId: string) => {
    setSelectedGoalId(prevId => prevId === goalId ? null : goalId);
  };
  
  const filteredTasks = selectedGoalId 
    ? tasks.filter(task => task.goalId === selectedGoalId)
    : tasks;
  
  const getGoalColor = (goalId: string): string => {
    const goal = goals.find(g => g.id === goalId);
    return goal ? goal.color : '#000000';
  };

  return (
    <div className="w-64 border-r h-full overflow-y-auto bg-gray-50 flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">GOALS</h2>
        <div className="mt-2 space-y-1">
          {goals.map(goal => (
            <GoalItem 
              key={goal.id} 
              goal={goal} 
              isSelected={selectedGoalId === goal.id}
              onClick={() => handleGoalClick(goal.id)}
            />
          ))}
        </div>
      </div>
      
      <div className="p-4 flex-1">
        <h2 className="text-lg font-semibold text-gray-800">TASKS</h2>
        <div className="mt-2 space-y-1">
          {filteredTasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              goalColor={getGoalColor(task.goalId)}
              onDragStart={onTaskDragStart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
