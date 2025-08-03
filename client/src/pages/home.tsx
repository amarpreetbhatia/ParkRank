import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { ParkCard } from "@/components/park-card";
import { RankingsTable } from "@/components/rankings-table";
import { RecentVotes } from "@/components/recent-votes";
import { Statistics } from "@/components/statistics";
import { Mountain, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import type { Park, Vote } from "@shared/schema";

interface MatchupResponse {
  parks: [Park, Park];
}

interface RankingsResponse {
  rankings: Park[];
}

interface VotesResponse {
  votes: (Vote & { winner: Park; loser: Park })[];
}

interface StatisticsResponse {
  totalVotes: number;
  totalParks: number;
  votesToday: number;
  mostContested: string;
}

export default function Home() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [votingDisabled, setVotingDisabled] = useState(false);

  // Initialize parks data on first load
  useEffect(() => {
    const initializeParks = async () => {
      try {
        await apiRequest("POST", "/api/initialize-parks");
        queryClient.invalidateQueries({ queryKey: ["/api"] });
      } catch (error) {
        console.log("Parks may already be initialized");
      }
    };
    
    initializeParks();
  }, [queryClient]);

  // Fetch matchup
  const { data: matchupData, isLoading: matchupLoading, refetch: refetchMatchup } = useQuery<MatchupResponse>({
    queryKey: ["/api/matchup"],
    refetchOnWindowFocus: false,
  });

  // Fetch rankings
  const { data: rankingsData, isLoading: rankingsLoading } = useQuery<RankingsResponse>({
    queryKey: ["/api/rankings"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Fetch recent votes
  const { data: votesData, isLoading: votesLoading } = useQuery<VotesResponse>({
    queryKey: ["/api/recent-votes"],
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  // Fetch statistics
  const { data: statisticsData, isLoading: statisticsLoading } = useQuery<StatisticsResponse>({
    queryKey: ["/api/statistics"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Vote mutation
  const voteMutation = useMutation({
    mutationFn: async ({ winnerId, loserId }: { winnerId: string; loserId: string }) => {
      const response = await apiRequest("POST", "/api/vote", { winnerId, loserId });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/rankings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/recent-votes"] });
      queryClient.invalidateQueries({ queryKey: ["/api/statistics"] });
      refetchMatchup();
      
      toast({
        title: "Vote submitted!",
        description: "Thanks for your vote. Rankings have been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit vote",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setVotingDisabled(false);
    }
  });

  const handleVote = (winnerId: string, loserId: string) => {
    setVotingDisabled(true);
    voteMutation.mutate({ winnerId, loserId });
  };

  const handleSkipMatchup = () => {
    refetchMatchup();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mountain className="text-blue-600 text-2xl" />
              <h1 className="text-2xl font-bold text-gray-900">nps rank</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-blue-600 font-medium">Vote</Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Voting Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Which park would you rather visit?</h2>
            <p className="text-gray-600">Help us rank Australia's best national parks</p>
          </div>

          {/* Park Matchup */}
          {matchupLoading ? (
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-8">
              <Skeleton className="w-80 h-96 rounded-2xl" />
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold shadow-lg">
                VS
              </div>
              <Skeleton className="w-80 h-96 rounded-2xl" />
            </div>
          ) : matchupData?.parks ? (
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-8">
              <ParkCard 
                park={matchupData.parks[0]} 
                onClick={() => handleVote(matchupData.parks[0].id, matchupData.parks[1].id)}
                disabled={votingDisabled || voteMutation.isPending}
              />
              
              {/* VS Divider */}
              <div className="flex items-center justify-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold shadow-lg">
                  VS
                </div>
              </div>
              
              <ParkCard 
                park={matchupData.parks[1]} 
                onClick={() => handleVote(matchupData.parks[1].id, matchupData.parks[0].id)}
                disabled={votingDisabled || voteMutation.isPending}
              />
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No parks available for matchup</p>
            </div>
          )}

          {/* Skip Button */}
          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={handleSkipMatchup}
              disabled={matchupLoading}
              className="text-gray-500 hover:text-gray-700 font-medium"
            >
              Skip this matchup <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Rankings */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">rankings</CardTitle>
                  <div className="text-sm text-gray-500">
                    Updated recently
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {rankingsLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : rankingsData?.rankings ? (
                  <>
                    <RankingsTable rankings={rankingsData.rankings.slice(0, 10)} />
                    <div className="mt-6 text-center">
                      <Button variant="ghost" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        View full rankings <ArrowRight className="ml-1 w-3 h-3" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No rankings available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <div className="space-y-6">
            {/* Recent Votes */}
            {votesLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : votesData?.votes ? (
              <RecentVotes votes={votesData.votes} />
            ) : null}

            {/* Statistics */}
            {statisticsLoading ? (
              <Skeleton className="h-48 w-full" />
            ) : statisticsData ? (
              <Statistics {...statisticsData} />
            ) : null}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Mountain className="text-blue-600 text-xl" />
              <span className="font-bold text-gray-900">nps rank</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-blue-600">About</a>
              <a href="#" className="hover:text-blue-600">Privacy</a>
              <a href="#" className="hover:text-blue-600">Contact</a>
              <span>© 2024 NPS Rank</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
