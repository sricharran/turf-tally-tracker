
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface Team {
  id: string;
  name: string;
}

interface Match {
  id: string;
  date: string;
  location: string;
  team1_id: string;
  team1_score: number;
  team1_wickets: number;
  team1_overs: number;
  team2_id: string;
  team2_score: number;
  team2_wickets: number;
  team2_overs: number;
  winner_id: string;
  team1: Team;
  team2: Team;
  winner: Team;
}

const fetchMatches = async (): Promise<Match[]> => {
  // Fetch matches with team names using joins
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      team1:team1_id(id, name),
      team2:team2_id(id, name),
      winner:winner_id(id, name)
    `);
  
  if (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
  
  // Process the data to handle any potential null/error values
  // and ensure it matches our Match interface
  const processedMatches = (data || []).map(match => {
    return {
      ...match,
      team1: match.team1 || { id: match.team1_id || '', name: 'Unknown Team' },
      team2: match.team2 || { id: match.team2_id || '', name: 'Unknown Team' },
      winner: match.winner || { id: match.winner_id || '', name: 'Unknown Team' }
    };
  }) as Match[];
  
  return processedMatches;
};

const Matches = () => {
  const { data: matches = [], isLoading, error } = useQuery({
    queryKey: ['matches'],
    queryFn: fetchMatches
  });

  if (isLoading) {
    return (
      <div className="container max-w-7xl py-10">
        <h1 className="text-3xl font-bold tracking-tight">Matches</h1>
        <p className="text-muted-foreground mt-2">Loading match data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-7xl py-10">
        <h1 className="text-3xl font-bold tracking-tight">Matches</h1>
        <p className="text-red-500 mt-2">Error loading match data. Please try again later.</p>
      </div>
    );
  }

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
                      {match.team1_score}/{match.team1_wickets}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({match.team1_overs} ov)
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-mono">
                      {match.team2_score}/{match.team2_wickets}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({match.team2_overs} ov)
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-muted-foreground">
                    {match.location}
                  </p>
                  <p className="text-sm font-medium">
                    {match.winner.name} won
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
