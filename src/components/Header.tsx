
import { Input } from "@/components/ui/input";
import { TrainFront, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onAddTrainClick: () => void;
}

const Header = ({ searchTerm, setSearchTerm, onAddTrainClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-10 bg-railway-blue text-white p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <TrainFront className="h-8 w-8 mr-3" />
            <h1 className="text-2xl font-bold">Railway Platform Assignment System</h1>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search trains..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 bg-white text-black w-full"
              />
            </div>
            <Button 
              onClick={onAddTrainClick}
              className="bg-railway-yellow hover:bg-yellow-600 text-railway-blue"
            >
              Add Train
            </Button>
            <Button variant="outline" size="icon" className="border-white text-white hover:bg-white/10">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
