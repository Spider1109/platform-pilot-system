
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Train, TrainStatus } from "@/utils/trainData";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface AddTrainFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (train: Train) => void;
  editTrain?: Train | null;
}

const AddTrainForm = ({ isOpen, onClose, onSave, editTrain }: AddTrainFormProps) => {
  const [train, setTrain] = useState<Train>({
    id: '',
    trainNumber: '',
    origin: '',
    destination: '',
    scheduledArrival: '',
    estimatedArrival: '',
    platform: 1,
    status: 'on-time',
    remarks: '',
  });

  useEffect(() => {
    if (editTrain) {
      setTrain(editTrain);
    } else {
      // Reset form for new train
      setTrain({
        id: uuidv4(),
        trainNumber: '',
        origin: '',
        destination: '',
        scheduledArrival: '',
        estimatedArrival: '',
        platform: 1,
        status: 'on-time',
        remarks: '',
      });
    }
  }, [editTrain, isOpen]);

  const handleChange = (field: keyof Train, value: any) => {
    setTrain(prev => ({
      ...prev,
      [field]: value,
      // If scheduled arrival changes and status is on-time, update estimated arrival
      ...(field === 'scheduledArrival' && prev.status === 'on-time' 
        ? { estimatedArrival: value } 
        : {})
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(train);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editTrain ? 'Edit Train' : 'Add New Train'}</DialogTitle>
          <DialogDescription>
            Fill in the details for the train assignment
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="trainNumber">Train Number</Label>
              <Input
                id="trainNumber"
                value={train.trainNumber}
                onChange={(e) => handleChange('trainNumber', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select 
                value={train.platform.toString()} 
                onValueChange={(value) => handleChange('platform', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      Platform {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="origin">Origin</Label>
              <Input
                id="origin"
                value={train.origin}
                onChange={(e) => handleChange('origin', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                value={train.destination}
                onChange={(e) => handleChange('destination', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="scheduledArrival">Scheduled Time</Label>
              <Input
                id="scheduledArrival"
                value={train.scheduledArrival}
                onChange={(e) => handleChange('scheduledArrival', e.target.value)}
                placeholder="HH:MM"
                pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="estimatedArrival">Estimated Time</Label>
              <Input
                id="estimatedArrival"
                value={train.estimatedArrival}
                onChange={(e) => handleChange('estimatedArrival', e.target.value)}
                placeholder="HH:MM"
                pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={train.status} 
                onValueChange={(value) => handleChange('status', value as TrainStatus)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="on-time">On Time</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                  <SelectItem value="arrived">Arrived</SelectItem>
                  <SelectItem value="departed">Departed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Input
              id="remarks"
              value={train.remarks || ''}
              onChange={(e) => handleChange('remarks', e.target.value)}
              placeholder="Additional information"
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editTrain ? 'Update' : 'Add Train'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTrainForm;
