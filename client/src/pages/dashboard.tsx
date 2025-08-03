import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { RankingsTable } from "@/components/rankings-table";
import { Statistics } from "@/components/statistics";
import { Mountain, BarChart3, Trophy, Map } from "lucide-react";
import { Link } from "wouter";
import type { Park } from "@shared/schema";

interface RankingsResponse {
  rankings: Park[];
}

interface StatisticsResponse {
  totalVotes: number;
  totalParks: number;
  votesToday: number;
  mostContested: string;
}

const states = [
  { name: "All States", value: "all", color: "bg-blue-500" },
  { name: "New South Wales", value: "New South Wales", color: "bg-green-500" },
  { name: "Queensland", value: "Queensland", color: "bg-blue-500" },
  { name: "Victoria", value: "Victoria", color: "bg-red-500" },
  { name: "Western Australia", value: "Western Australia", color: "bg-yellow-500" },
  { name: "South Australia", value: "South Australia", color: "bg-pink-500" },
  { name: "Tasmania", value: "Tasmania", color: "bg-purple-500" },
  { name: "Northern Territory", value: "Northern Territory", color: "bg-orange-500" },
  { name: "Australian Capital Territory", value: "Australian Capital Territory", color: "bg-gray-500" },
];

export default function Dashboard() {
  const [selectedState, setSelectedState] = useState("all");

  // Fetch rankings
  const { data: rankingsData, isLoading: rankingsLoading } = useQuery<RankingsResponse>({
    queryKey: ["/api/rankings"],
    refetchInterval: 5000, // Real-time updates every 5 seconds
    refetchOnWindowFocus: true,
  });

  // Fetch statistics
  const { data: statisticsData, isLoading: statisticsLoading } = useQuery<StatisticsResponse>({
    queryKey: ["/api/statistics"],
    refetchInterval: 5000, // Real-time updates every 5 seconds
    refetchOnWindowFocus: true,
  });

  const filteredRankings = rankingsData?.rankings.filter(park => 
    selectedState === "all" || park.state === selectedState
  ) || [];

  const getStateStats = (stateName: string) => {
    if (!rankingsData?.rankings) return { count: 0, avgRating: 0 };
    
    const stateParks = rankingsData.rankings.filter(park => park.state === stateName);
    const avgRating = stateParks.length > 0 
      ? Math.round(stateParks.reduce((sum, park) => sum + park.eloRating, 0) / stateParks.length)
      : 0;
    
    return { count: stateParks.length, avgRating };
  };

  const getTopStateByRating = () => {
    if (!rankingsData?.rankings) return null;
    
    const stateRatings = states.slice(1).map(state => {
      const stateParks = rankingsData.rankings.filter(park => park.state === state.value);
      const avgRating = stateParks.length > 0 
        ? stateParks.reduce((sum, park) => sum + park.eloRating, 0) / stateParks.length
        : 0;
      return { ...state, avgRating, count: stateParks.length };
    });
    
    return stateRatings.reduce((best, current) => 
      current.avgRating > best.avgRating ? current : best
    );
  };

  const topState = getTopStateByRating();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mountain className="text-blue-600 text-2xl" />
              <h1 className="text-2xl font-bold text-gray-900">nps rank</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">Vote</Link>
              <Link href="/dashboard" className="text-blue-600 font-medium">Dashboard</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="text-blue-600 text-2xl" />
            <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          </div>
          <p className="text-gray-600">Explore rankings and statistics for Australian National Parks</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mountain className="text-blue-600 w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Parks</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {statisticsLoading ? "..." : statisticsData?.totalParks || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BarChart3 className="text-green-600 w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Votes</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {statisticsLoading ? "..." : statisticsData?.totalVotes.toLocaleString() || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Trophy className="text-orange-600 w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Top State</p>
                  <p className="text-lg font-bold text-gray-900">
                    {topState ? topState.name.split(' ')[0] : "..."}
                  </p>
                  <p className="text-xs text-gray-500">
                    {topState ? `${Math.round(topState.avgRating)} avg rating` : ""}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Map className="text-purple-600 w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Votes Today</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {statisticsLoading ? "..." : statisticsData?.votesToday || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* State Filter */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">Filter by State</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {states.map((state) => {
                    const stats = state.value !== "all" ? getStateStats(state.value) : null;
                    return (
                      <button
                        key={state.value}
                        onClick={() => setSelectedState(state.value)}
                        className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                          selectedState === state.value
                            ? "bg-blue-50 border-2 border-blue-200"
                            : "hover:bg-gray-50 border-2 border-transparent"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${state.color}`} />
                            <span className="font-medium text-gray-900 text-sm">{state.name}</span>
                          </div>
                          {stats && (
                            <div className="text-right">
                              <div className="text-xs text-gray-500">{stats.count} parks</div>
                              <div className="text-xs font-medium text-gray-700">{stats.avgRating}</div>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rankings */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {selectedState === "all" ? "All Parks Rankings" : `${selectedState} Rankings`}
                  </CardTitle>
                  <Badge variant="secondary" className="text-sm">
                    {filteredRankings.length} parks
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {rankingsLoading ? (
                  <div className="space-y-4">
                    {[...Array(10)].map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : filteredRankings.length > 0 ? (
                  <RankingsTable rankings={filteredRankings} />
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No parks found for this state</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* State Comparison */}
        {selectedState === "all" && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">State Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {states.slice(1).map((state) => {
                    const stats = getStateStats(state.value);
                    return (
                      <div key={state.value} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className={`w-3 h-3 rounded-full ${state.color}`} />
                          <h3 className="font-semibold text-gray-900 text-sm">{state.name}</h3>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Parks:</span>
                            <span className="font-medium">{stats.count}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Avg Rating:</span>
                            <span className="font-medium">{stats.avgRating}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}