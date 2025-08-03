import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Mountain } from "lucide-react";
import type { Park } from "@shared/schema";

interface RankingsTableProps {
  rankings: Park[];
  previousRankings?: Park[];
}

export function RankingsTable({ rankings, previousRankings = [] }: RankingsTableProps) {
  const getRankChange = (park: Park, currentRank: number) => {
    if (previousRankings.length === 0) return 0;
    
    const previousRank = previousRankings.findIndex(p => p.id === park.id) + 1;
    if (previousRank === 0) return 0;
    
    return previousRank - currentRank;
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-400";
    if (rank === 2) return "bg-gray-400";
    if (rank === 3) return "bg-orange-400";
    return "bg-green-400";
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
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-2 font-semibold text-gray-900 text-sm">Rank</th>
            <th className="text-left py-3 px-2 font-semibold text-gray-900 text-sm">Park</th>
            <th className="text-right py-3 px-2 font-semibold text-gray-900 text-sm">Score</th>
            <th className="text-right py-3 px-2 font-semibold text-gray-900 text-sm">Change</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((park, index) => {
            const rank = index + 1;
            const change = getRankChange(park, rank);
            
            return (
              <tr key={park.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                <td className="py-4 px-2">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-900 w-8">{rank}</span>
                    <div className={`w-6 h-6 rounded-full ${getRankBadgeColor(rank)} flex items-center justify-center ml-2`}>
                      <Mountain className="text-white text-xs w-3 h-3" />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center">
                    <img 
                      src={park.imageUrl || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=40"}
                      alt={park.name}
                      className="w-10 h-8 rounded object-cover mr-3"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{park.name}</div>
                      <div className="text-xs text-gray-500">{getStateAbbreviation(park.state)}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2 text-right">
                  <span className="font-bold text-gray-900">{park.eloRating}</span>
                </td>
                <td className="py-4 px-2 text-right">
                  {change > 0 && (
                    <span className="inline-flex items-center text-green-600 text-sm font-medium">
                      <ArrowUp className="text-xs mr-1 w-3 h-3" />
                      {change}
                    </span>
                  )}
                  {change < 0 && (
                    <span className="inline-flex items-center text-red-600 text-sm font-medium">
                      <ArrowDown className="text-xs mr-1 w-3 h-3" />
                      {Math.abs(change)}
                    </span>
                  )}
                  {change === 0 && (
                    <span className="inline-flex items-center text-gray-500 text-sm font-medium">
                      <span className="w-4 text-center">—</span>0
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
