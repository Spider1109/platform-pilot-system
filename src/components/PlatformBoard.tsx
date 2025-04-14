
import { Train } from '@/utils/trainData';
import { useState } from 'react';
import TrainCard from './TrainCard';
import { Button } from './ui/button';

interface PlatformBoardProps {
  trains: Train[];
  onEditTrain: (train: Train) => void;
  onDeleteTrain: (id: string) => void;
}

const PlatformBoard = ({ trains, onEditTrain, onDeleteTrain }: PlatformBoardProps) => {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  const filteredTrains = statusFilter 
    ? trains.filter(train => train.status === statusFilter)
    : trains;
    
  const sortedTrains = [...filteredTrains].sort((a, b) => {
    // Sort by estimated arrival time
    return a.estimatedArrival.localeCompare(b.estimatedArrival);
  });
  
  const statuses = ['on-time', 'delayed', 'arrived', 'departed', 'cancelled'];
  
  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Platform Assignments</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={statusFilter === null ? "default" : "outline"}
            onClick={() => setStatusFilter(null)}
            className="whitespace-nowrap"
          >
            All
          </Button>
          {statuses.map(status => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              onClick={() => setStatusFilter(status as any)}
              className="whitespace-nowrap capitalize"
            >
              {status.replace('-', ' ')}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="hidden md:grid grid-cols-12 bg-gray-100 p-3 rounded-t-md font-semibold">
        <div className="col-span-1">Platform</div>
        <div className="col-span-2">Train</div>
        <div className="col-span-4">Route</div>
        <div className="col-span-3">Status</div>
        <div className="col-span-2">Actions</div>
      </div>
      
      <div className="space-y-2">
        {sortedTrains.length > 0 ? (
          sortedTrains.map((train) => (
            <TrainCard 
              key={train.id} 
              train={train} 
              onEdit={onEditTrain}
              onDelete={onDeleteTrain}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-md">
            <p className="text-gray-500">No trains match your filter</p>
            {statusFilter && (
              <Button 
                variant="link" 
                onClick={() => setStatusFilter(null)}
                className="mt-2"
              >
                Clear filter
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlatformBoard;
