import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import type { Park } from "@shared/schema";

interface ParkCardProps {
  park: Park;
  onClick: () => void;
  disabled?: boolean;
}

export function ParkCard({ park, onClick, disabled }: ParkCardProps) {
  const getStateBadgeColor = (state: string) => {
    switch (state) {
      case "New South Wales":
      case "NSW":
        return "bg-green-100 text-green-800";
      case "Northern Territory":
      case "NT":
        return "bg-orange-100 text-orange-800";
      case "Queensland":
      case "QLD":
        return "bg-blue-100 text-blue-800";
      case "Tasmania":
      case "TAS":
        return "bg-purple-100 text-purple-800";
      case "Victoria":
      case "VIC":
        return "bg-red-100 text-red-800";
      case "Western Australia":
      case "WA":
        return "bg-yellow-100 text-yellow-800";
      case "South Australia":
      case "SA":
        return "bg-pink-100 text-pink-800";
      case "Australian Capital Territory":
      case "ACT":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStateAbbreviation = (state: string) => {
    switch (state) {
      case "New South Wales":
        return "NSW";
      case "Northern Territory":
        return "NT";
      case "Queensland":
        return "QLD";
      case "Tasmania":
        return "TAS";
      case "Victoria":
        return "VIC";
      case "Western Australia":
        return "WA";
      case "South Australia":
        return "SA";
      case "Australian Capital Territory":
        return "ACT";
      default:
        return state;
    }
  };

  return (
    <Card 
      className={`park-card group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-80 h-96 overflow-hidden ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={disabled ? undefined : onClick}
    >
      <div className="relative">
        <img 
          src={park.imageUrl || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=240"}
          alt={`${park.name} landscape`}
          className="w-full h-48 object-cover group-hover:brightness-110 transition-all duration-300"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{park.name}</h3>
          <Badge className={`text-xs font-medium px-2 py-1 rounded-full ${getStateBadgeColor(park.state)}`}>
            {getStateAbbreviation(park.state)}
          </Badge>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {park.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 text-xs">
            <Calendar className="w-3 h-3 mr-1" />
            <span>Est. {park.establishedDate}</span>
          </div>
          <Button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            disabled={disabled}
          >
            Vote
          </Button>
        </div>
      </div>
    </Card>
  );
}
