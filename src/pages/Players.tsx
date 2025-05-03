
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

// Define TypeScript interface for player data
interface Player {
  id: string;
  name: string;
  matches: number;
  total_runs: number;
  wickets: number;
  catches: number;
}

const fetchPlayers = async (): Promise<Player[]> => {
  const { data, error } = await supabase
    .from('players')
    .select('*');
  
  if (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
  
  return data || [];
};

const Players = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const { data: players = [], isLoading, error } = useQuery({
    queryKey: ['players'],
    queryFn: fetchPlayers
  });

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="container max-w-7xl py-10">
        <h1 className="text-3xl font-bold tracking-tight">Players</h1>
        <p className="text-muted-foreground mt-2">Loading player data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-7xl py-10">
        <h1 className="text-3xl font-bold tracking-tight">Players</h1>
        <p className="text-red-500 mt-2">Error loading player data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl py-10">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Players</h1>
        <p className="text-muted-foreground">
          Browse all players and their career statistics.
        </p>
      </div>

      <div className="flex items-center mt-6 mb-4 relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search players..."
          className="pl-8 max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
        {filteredPlayers.map(player => (
          <Link key={player.id} to={`/players/${player.id}`}>
            <Card className="hover:border-primary/50 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{player.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Matches</p>
                    <p className="font-mono">{player.matches}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Runs</p>
                    <p className="font-mono">{player.total_runs}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Wickets</p>
                    <p className="font-mono">{player.wickets}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Catches</p>
                    <p className="font-mono">{player.catches}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      {filteredPlayers.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No players found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default Players;
