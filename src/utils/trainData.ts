
import { v4 as uuidv4 } from 'uuid';

export type TrainStatus = 'on-time' | 'delayed' | 'arrived' | 'departed' | 'cancelled';

export interface Train {
  id: string;
  trainNumber: string;
  origin: string;
  destination: string;
  scheduledArrival: string;
  estimatedArrival: string;
  platform: number;
  status: TrainStatus;
  remarks?: string;
}

// Initial sample data
export const initialTrains: Train[] = [
  {
    id: uuidv4(),
    trainNumber: 'EXP 1023',
    origin: 'London',
    destination: 'Manchester',
    scheduledArrival: '08:30',
    estimatedArrival: '08:30',
    platform: 3,
    status: 'on-time',
  },
  {
    id: uuidv4(),
    trainNumber: 'IC 456',
    origin: 'Birmingham',
    destination: 'Edinburgh',
    scheduledArrival: '08:45',
    estimatedArrival: '09:05',
    platform: 5,
    status: 'delayed',
    remarks: '20 minutes delay due to signaling issue',
  },
  {
    id: uuidv4(),
    trainNumber: 'LOC 789',
    origin: 'Liverpool',
    destination: 'Leeds',
    scheduledArrival: '09:00',
    estimatedArrival: '09:00',
    platform: 2,
    status: 'on-time',
  },
  {
    id: uuidv4(),
    trainNumber: 'EXP 2045',
    origin: 'Glasgow',
    destination: 'London',
    scheduledArrival: '09:15',
    estimatedArrival: '09:15',
    platform: 1,
    status: 'arrived',
  },
  {
    id: uuidv4(),
    trainNumber: 'IC 321',
    origin: 'Cardiff',
    destination: 'Newcastle',
    scheduledArrival: '09:30',
    estimatedArrival: '09:45',
    platform: 4,
    status: 'delayed',
    remarks: '15 minutes delay due to heavy rain',
  },
  {
    id: uuidv4(),
    trainNumber: 'EXP 1078',
    origin: 'Bristol',
    destination: 'Sheffield',
    scheduledArrival: '08:15',
    estimatedArrival: '08:15',
    platform: 6,
    status: 'departed',
  },
  {
    id: uuidv4(),
    trainNumber: 'IC 587',
    origin: 'Oxford',
    destination: 'Cambridge',
    scheduledArrival: '10:00',
    estimatedArrival: '10:00',
    platform: 7,
    status: 'on-time',
  },
];

// Helper functions for status colors
export const getStatusColor = (status: TrainStatus): string => {
  switch (status) {
    case 'on-time':
      return 'bg-railway-green text-white';
    case 'delayed':
      return 'bg-railway-amber text-black';
    case 'arrived':
      return 'bg-blue-500 text-white';
    case 'departed':
      return 'bg-gray-500 text-white';
    case 'cancelled':
      return 'bg-railway-red text-white';
    default:
      return 'bg-gray-300 text-gray-800';
  }
};

export const getStatusText = (status: TrainStatus): string => {
  switch (status) {
    case 'on-time':
      return 'On Time';
    case 'delayed':
      return 'Delayed';
    case 'arrived':
      return 'Arrived';
    case 'departed':
      return 'Departed';
    case 'cancelled':
      return 'Cancelled';
    default:
      return 'Unknown';
  }
};
