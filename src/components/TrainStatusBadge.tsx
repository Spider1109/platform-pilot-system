
import { TrainStatus, getStatusColor, getStatusText } from '@/utils/trainData';
import { cn } from '@/lib/utils';

interface TrainStatusBadgeProps {
  status: TrainStatus;
  className?: string;
}

const TrainStatusBadge = ({ status, className }: TrainStatusBadgeProps) => {
  const isBlinking = status === 'delayed' || status === 'cancelled';
  
  return (
    <span 
      className={cn(
        'px-2 py-1 text-xs font-semibold rounded-md whitespace-nowrap',
        getStatusColor(status),
        isBlinking && 'blink',
        className
      )}
    >
      {getStatusText(status)}
    </span>
  );
};

export default TrainStatusBadge;
