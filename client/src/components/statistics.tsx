import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface StatisticsProps {
  totalVotes: number;
  totalParks: number;
  votesToday: number;
  mostContested: string;
}

export function Statistics({ totalVotes, totalParks, votesToday, mostContested }: StatisticsProps) {
  return (
    <div className="space-y-6">
      {/* Vote Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-900">Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Votes</span>
              <span className="font-bold text-gray-900">{totalVotes.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Parks Ranked</span>
              <span className="font-bold text-gray-900">{totalParks}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Votes Today</span>
              <span className="font-bold text-green-600">{votesToday}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Most Contested</span>
              <span className="font-bold text-gray-900 text-sm">{mostContested}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How ELO Works */}
      <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold mb-3">How ELO Ranking Works</h3>
          <p className="text-sm text-blue-100 mb-4">
            Each park starts with 1500 points. When parks compete head-to-head, the winner gains points while the loser loses points based on their relative rankings.
          </p>
          <Button 
            variant="ghost" 
            className="text-sm text-blue-200 hover:text-white font-medium p-0 h-auto"
          >
            Learn more <ArrowRight className="ml-1 w-3 h-3" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
