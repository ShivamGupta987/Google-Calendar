
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CalendarGrid from '@/components/Calendar/CalendarGrid';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Event, Task } from '@/lib/types';
import { mockEvents, mockGoals, mockTasks } from '@/lib/mockData';
import EventModal from '@/components/Calendar/EventModal';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ startTime: string; endTime: string } | null>(null);
  
  const { toast } = useToast();

  // Handle event creation
  const handleEventCreate = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: uuidv4(),
    };
    
    setEvents(prevEvents => [...prevEvents, newEvent]);
    toast({
      title: "Event Created",
      description: `${newEvent.title} has been added to your calendar.`,
    });
  };
  
  // Handle event update
  const handleEventUpdate = (updatedEvent: Event) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    
    toast({
      title: "Event Updated",
      description: `${updatedEvent.title} has been updated.`,
    });
  };
  
  // Handle event deletion
  const handleEventDelete = (eventId: string) => {
    const eventToDelete = events.find(event => event.id === eventId);
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    
    toast({
      title: "Event Deleted",
      description: eventToDelete ? `${eventToDelete.title} has been deleted.` : "Event has been deleted.",
      variant: "destructive",
    });
  };
  
  // Handle task drag start
  const handleTaskDragStart = (task: Task) => {
    setDraggedTask(task);
  };
  
  // Handle drop on calendar
  const handleCalendarDrop = (e: React.DragEvent, day: Date, hour: number) => {
    e.preventDefault();
    
    if (!draggedTask) return;
    
    const taskId = e.dataTransfer.getData('taskId');
    if (!taskId) return;
    
    // Create start and end times for the event
    const startTime = new Date(day);
    startTime.setHours(hour, 0, 0, 0);
    
    const endTime = new Date(startTime);
    endTime.setHours(hour + 1, 0, 0, 0);
    
    setSelectedTimeSlot({
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    });
    
    setIsTaskModalOpen(true);
  };
  
  // Handle creating event from task
  const handleCreateEventFromTask = (eventData: Omit<Event, 'id'>) => {
    if (!draggedTask) return;
    
    const newEvent: Event = {
      ...eventData,
      id: uuidv4(),
      title: eventData.title || draggedTask.title,
      taskId: draggedTask.id,
    };
    
    setEvents(prevEvents => [...prevEvents, newEvent]);
    setDraggedTask(null);
    setIsTaskModalOpen(false);
    
    toast({
      title: "Task Added to Calendar",
      description: `${newEvent.title} has been added to your calendar.`,
    });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        goals={mockGoals} 
        tasks={mockTasks} 
        onTaskDragStart={handleTaskDragStart}
      />
      
      {/* Calendar */}
      <div className="flex-1 overflow-hidden">
        <CalendarGrid 
          events={events}
          onEventCreate={handleEventCreate}
          onEventUpdate={handleEventUpdate}
          onEventDelete={handleEventDelete}
        />
      </div>
      
      {/* Task to Event Modal */}
      <EventModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setDraggedTask(null);
        }}
        onSave={handleCreateEventFromTask}
        selectedTime={selectedTimeSlot || undefined}
      />
    </div>
  );
};

export default Index;
