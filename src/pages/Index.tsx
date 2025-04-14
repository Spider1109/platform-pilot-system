
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import PlatformBoard from '@/components/PlatformBoard';
import AddTrainForm from '@/components/AddTrainForm';
import { Train, initialTrains } from '@/utils/trainData';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

const Index = () => {
  const [trains, setTrains] = useState<Train[]>(initialTrains);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddTrainOpen, setIsAddTrainOpen] = useState(false);
  const [editingTrain, setEditingTrain] = useState<Train | null>(null);
  const { toast } = useToast();

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTrains(prevTrains => {
        // Randomly update a train's status or time occasionally
        const shouldUpdate = Math.random() > 0.7;
        if (!shouldUpdate) return prevTrains;

        const randomIndex = Math.floor(Math.random() * prevTrains.length);
        const trainToUpdate = { ...prevTrains[randomIndex] };
        const updateType = Math.random();
        
        // Update based on current status and randomness
        if (trainToUpdate.status === 'on-time' && updateType < 0.3) {
          // Sometimes trains get delayed
          const delayMinutes = [5, 10, 15, 20][Math.floor(Math.random() * 4)];
          const [hours, minutes] = trainToUpdate.scheduledArrival.split(':');
          const newTime = new Date();
          newTime.setHours(parseInt(hours, 10), parseInt(minutes, 10) + delayMinutes);
          
          trainToUpdate.status = 'delayed';
          trainToUpdate.estimatedArrival = `${String(newTime.getHours()).padStart(2, '0')}:${String(newTime.getMinutes()).padStart(2, '0')}`;
          trainToUpdate.remarks = `${delayMinutes} minutes delay due to ${['signaling issue', 'congestion', 'weather conditions', 'technical problem'][Math.floor(Math.random() * 4)]}`;
          
          toast({
            title: `Train ${trainToUpdate.trainNumber} Delayed`,
            description: `Now expected at ${trainToUpdate.estimatedArrival}`,
            variant: "destructive",
          });
        } else if (trainToUpdate.status === 'delayed' && updateType < 0.5) {
          // Sometimes delayed trains arrive
          trainToUpdate.status = 'arrived';
          trainToUpdate.remarks = 'Now boarding';
          
          toast({
            title: `Train ${trainToUpdate.trainNumber} Arrived`,
            description: `Now at platform ${trainToUpdate.platform}`,
          });
        } else if (trainToUpdate.status === 'arrived' && updateType < 0.7) {
          // Arrived trains eventually depart
          trainToUpdate.status = 'departed';
          trainToUpdate.remarks = '';
        }
        
        return prevTrains.map((train, index) => 
          index === randomIndex ? trainToUpdate : train
        );
      });
    }, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, [toast]);

  const handleAddTrain = () => {
    setEditingTrain(null);
    setIsAddTrainOpen(true);
  };

  const handleEditTrain = (train: Train) => {
    setEditingTrain(train);
    setIsAddTrainOpen(true);
  };

  const handleDeleteTrain = (id: string) => {
    setTrains(trains.filter(train => train.id !== id));
    toast({
      title: "Train Removed",
      description: "Train assignment has been deleted",
      variant: "default",
    });
  };

  const handleSaveTrain = (train: Train) => {
    if (editingTrain) {
      // Update existing train
      setTrains(trains.map(t => t.id === train.id ? train : t));
      toast({
        title: "Train Updated",
        description: `${train.trainNumber} details have been updated`,
        variant: "default",
      });
    } else {
      // Add new train
      const newTrain = {
        ...train,
        id: uuidv4(),
      };
      setTrains([...trains, newTrain]);
      toast({
        title: "Train Added",
        description: `${newTrain.trainNumber} has been assigned to platform ${newTrain.platform}`,
        variant: "default",
      });
    }
    setIsAddTrainOpen(false);
    setEditingTrain(null);
  };

  // Filter trains based on search term
  const filteredTrains = trains.filter(train => 
    train.trainNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    train.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    train.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    train.scheduledArrival.includes(searchTerm) ||
    String(train.platform).includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        onAddTrainClick={handleAddTrain} 
      />
      
      <main className="flex-1">
        <PlatformBoard 
          trains={filteredTrains}
          onEditTrain={handleEditTrain}
          onDeleteTrain={handleDeleteTrain}
        />
      </main>
      
      <footer className="bg-railway-blue text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>Railway Platform Assignment System</p>
          <p className="text-sm text-gray-300 mt-1">© {new Date().getFullYear()} Railway Authority</p>
        </div>
      </footer>
      
      <AddTrainForm 
        isOpen={isAddTrainOpen}
        onClose={() => setIsAddTrainOpen(false)}
        onSave={handleSaveTrain}
        editTrain={editingTrain}
      />
      
      <Toaster />
    </div>
  );
};

export default Index;
