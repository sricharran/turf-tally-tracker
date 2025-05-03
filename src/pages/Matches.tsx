
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { matches } from '@/lib/data';
import { CalendarIcon } from 'lucide-react';

const Matches = () => {
  // Sort matches by date, newest first
  const sortedMatches = [...matches].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="container max-w-7xl py-10">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Matches</h1>
        <p className="text-muted-foreground">
          View all recorded cricket matches and their details.
        </p>
      </div>

      <div className="grid gap-4 mt-6">
        {sortedMatches.map(match => (
          <Link key={match.id} to={`/matches/${match.id}`}>
            <Card className="hover:border-primary/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{match.team1.name} vs {match.team2.name}</CardTitle>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {new Date(match.date).toLocaleDateString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-mono">
                      {match.team1.score}/{match.team1.wickets}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({match.team1.overs} ov)
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-mono">
                      {match.team2.score}/{match.team2.wickets}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({match.team2.overs} ov)
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-muted-foreground">
                    {match.location}
                  </p>
                  <p className="text-sm font-medium">
                    {match.winner} won
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Matches;
