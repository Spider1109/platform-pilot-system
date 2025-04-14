
import { Card } from "@/components/ui/card";
import { Train } from "@/utils/trainData";
import TrainStatusBadge from "./TrainStatusBadge";
import { Clock, Map, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface TrainCardProps {
  train: Train;
  onEdit: (train: Train) => void;
  onDelete: (id: string) => void;
}

const TrainCard = ({ train, onEdit, onDelete }: TrainCardProps) => {
  const [showActions, setShowActions] = useState(false);
  
  const isDelayed = train.scheduledArrival !== train.estimatedArrival;
  
  return (
    <Card 
      className="mb-4 overflow-hidden hover:shadow-lg transition-shadow duration-300 border-l-4"
      style={{ borderLeftColor: train.status === 'on-time' ? '#16A34A' : 
                            train.status === 'delayed' ? '#F59E0B' : 
                            train.status === 'cancelled' ? '#DC2626' : '#1A365D' }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="grid grid-cols-12 p-4 gap-2 items-center">
        <div className="col-span-1 text-2xl font-bold text-railway-blue text-center">
          {train.platform}
        </div>
        
        <div className="col-span-3 lg:col-span-2">
          <div className="text-lg font-bold">{train.trainNumber}</div>
          <div className="flex items-center text-xs text-gray-600">
            <Clock className="h-3 w-3 mr-1" />
            <span className={isDelayed ? 'line-through text-gray-400' : ''}>
              {train.scheduledArrival}
            </span>
            {isDelayed && (
              <span className="ml-1 text-railway-amber font-medium">
                {train.estimatedArrival}
              </span>
            )}
          </div>
        </div>
        
        <div className="col-span-7 lg:col-span-4">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-gray-600" />
            <span className="font-medium">{train.origin}</span>
            <Map className="h-4 w-4 mx-2 text-gray-600" />
            <span className="font-medium">{train.destination}</span>
          </div>
          {train.remarks && (
            <div className="text-sm text-gray-600 mt-1">
              {train.remarks}
            </div>
          )}
        </div>
        
        <div className="hidden lg:block lg:col-span-3">
          <TrainStatusBadge status={train.status} />
        </div>
        
        <div className="col-span-1 lg:col-span-2 flex justify-end gap-2">
          {showActions && (
            <>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => onEdit(train)}
                className="h-8 text-xs"
              >
                Edit
              </Button>
              <Button 
                size="sm" 
                variant="destructive" 
                onClick={() => onDelete(train.id)}
                className="h-8 text-xs"
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TrainCard;
