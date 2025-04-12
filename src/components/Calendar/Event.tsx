
import React from 'react';
import { Event as EventType } from '@/lib/types';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

interface EventProps {
  event: EventType;
  onClick: () => void;
}

const Event = ({ event, onClick }: EventProps) => {
  const startTime = parseISO(event.startTime);
  const endTime = parseISO(event.endTime);
  
  return (
    <div 
      className={cn(
        "rounded-md p-2 text-xs font-medium shadow-sm cursor-pointer",
        "hover:opacity-90 transition-opacity",
        "truncate overflow-hidden",
        {
          "bg-category-exercise text-white": event.category === 'exercise',
          "bg-category-eating text-black": event.category === 'eating',
          "bg-category-work text-white": event.category === 'work',
          "bg-category-relax text-white": event.category === 'relax',
          "bg-category-family text-white": event.category === 'family',
          "bg-category-social text-white": event.category === 'social',
        }
      )}
      style={event.taskId ? { backgroundColor: event.color } : {}}
      onClick={onClick}
    >
      <div className="font-bold">{event.title}</div>
      <div>
        {format(startTime, 'h:mm a')} - {format(endTime, 'h:mm a')}
      </div>
    </div>
  );
};

export default Event;
