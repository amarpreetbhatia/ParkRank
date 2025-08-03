import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import type { Vote, Park } from "@shared/schema";

interface RecentVotesProps {
  votes: (Vote & { winner: Park; loser: Park })[];
}

export function RecentVotes({ votes }: RecentVotesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-900">Recent Votes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {votes.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No votes yet. Be the first to vote!
            </div>
          ) : (
            votes.map((vote) => (
              <div key={vote.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{vote.winner.name}</div>
                  <div className="text-gray-500 text-xs">beat {vote.loser.name}</div>
                </div>
                <div className="text-xs text-gray-500">
                  {vote.createdAt && formatDistanceToNow(new Date(vote.createdAt), { addSuffix: true })}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
