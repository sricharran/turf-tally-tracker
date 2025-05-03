import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

// Define TypeScript interfaces with the correct property names
interface PlayerBattingStats {
  player_id: string;
  player_name: string;
  innings: number;
  total_runs: number;
  highest_score: number;
  batting_average: number;
  strike_rate: number;
  fours: number;
  sixes: number;
}

interface PlayerBowlingStats {
  player_id: string;
  player_name: string;
  matches_bowled: number;
  total_overs: number;
  wickets: number;
  economy: number;
  bowling_average: number;
  maidens: number;
  strike_rate: number;
}

interface PlayerWithStats {
  id: string;
  name: string;
  battingStats: PlayerBattingStats;
  bowlingStats: PlayerBowlingStats;
}

// Fetch player batting statistics
const fetchPlayerBattingStats = async (): Promise<PlayerBattingStats[]> => {
  const { data, error } = await supabase
    .from('player_batting_stats')
    .select('*');
  
  if (error) {
    console.error('Error fetching batting stats:', error);
    throw error;
  }
  
  return data || [];
};

// Fetch player bowling statistics
const fetchPlayerBowlingStats = async (): Promise<PlayerBowlingStats[]> => {
  const { data, error } = await supabase
    .from('player_bowling_stats')
    .select('*');
  
  if (error) {
    console.error('Error fetching bowling stats:', error);
    throw error;
  }
  
  return data || [];
};

const Stats = () => {
  const { data: battingStats = [], isLoading: battingLoading } = useQuery({
    queryKey: ['battingStats'],
    queryFn: fetchPlayerBattingStats
  });

  const { data: bowlingStats = [], isLoading: bowlingLoading } = useQuery({
    queryKey: ['bowlingStats'],
    queryFn: fetchPlayerBowlingStats
  });

  const isLoading = battingLoading || bowlingLoading;

  if (isLoading) {
    return (
      <div className="container max-w-7xl py-10">
        <h1 className="text-3xl font-bold tracking-tight">Statistics</h1>
        <p className="text-muted-foreground mt-2">Loading statistics...</p>
      </div>
    );
  }

  // Prepare sorted statistics
  const topRunScorers = [...battingStats].sort((a, b) => Number(b.total_runs) - Number(a.total_runs));
  const topAverages = [...battingStats]
    .filter(p => Number(p.innings) > 0)
    .sort((a, b) => Number(b.batting_average) - Number(a.batting_average));
  const topStrikeRates = [...battingStats]
    .filter(p => p.innings > 0)
    .sort((a, b) => Number(b.strike_rate) - Number(a.strike_rate));
  
  const topWicketTakers = [...bowlingStats].sort((a, b) => Number(b.wickets) - Number(a.wickets));
  const bestEconomy = [...bowlingStats]
    .filter(p => Number(p.total_overs) > 2)
    .sort((a, b) => Number(a.economy) - Number(b.economy));
  const bestBowlingAverage = [...bowlingStats]
    .filter(p => Number(p.wickets) > 0)
    .sort((a, b) => Number(a.bowling_average) - Number(b.bowling_average));

  return (
    <div className="container max-w-7xl py-10">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Statistics</h1>
        <p className="text-muted-foreground">
          Team and player performance statistics across all matches.
        </p>
      </div>

      <Tabs defaultValue="batting" className="mt-6">
        <TabsList>
          <TabsTrigger value="batting">Batting</TabsTrigger>
          <TabsTrigger value="bowling">Bowling</TabsTrigger>
        </TabsList>
        
        <TabsContent value="batting">
          <div className="grid gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Most Runs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="cricket-table">
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Player</th>
                        <th>Runs</th>
                        <th>Innings</th>
                        <th>Average</th>
                        <th>Strike Rate</th>
                        <th>4s</th>
                        <th>6s</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topRunScorers.slice(0, 10).map((player, index) => (
                        <tr key={player.player_id}>
                          <td>{index + 1}</td>
                          <td>
                            <Link to={`/players/${player.player_id}`} className="text-primary hover:underline">
                              {player.player_name}
                            </Link>
                          </td>
                          <td className="font-mono">{player.total_runs}</td>
                          <td className="font-mono">{player.innings}</td>
                          <td className="font-mono">{player.batting_average}</td>
                          <td className="font-mono">{player.strike_rate}</td>
                          <td className="font-mono">{player.fours}</td>
                          <td className="font-mono">{player.sixes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Best Batting Average</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="cricket-table">
                      <thead>
                        <tr>
                          <th>Rank</th>
                          <th>Player</th>
                          <th>Average</th>
                          <th>Innings</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topAverages.slice(0, 5).map((player, index) => (
                          <tr key={player.player_id}>
                            <td>{index + 1}</td>
                            <td>
                              <Link to={`/players/${player.player_id}`} className="text-primary hover:underline">
                                {player.player_name}
                              </Link>
                            </td>
                            <td className="font-mono">{player.batting_average}</td>
                            <td className="font-mono">{player.innings}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Best Strike Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="cricket-table">
                      <thead>
                        <tr>
                          <th>Rank</th>
                          <th>Player</th>
                          <th>Strike Rate</th>
                          <th>Runs</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topStrikeRates.slice(0, 5).map((player, index) => (
                          <tr key={player.player_id}>
                            <td>{index + 1}</td>
                            <td>
                              <Link to={`/players/${player.player_id}`} className="text-primary hover:underline">
                                {player.player_name}
                              </Link>
                            </td>
                            <td className="font-mono">{player.strike_rate}</td>
                            <td className="font-mono">{player.total_runs}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bowling">
          <div className="grid gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Most Wickets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="cricket-table">
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Player</th>
                        <th>Wickets</th>
                        <th>Overs</th>
                        <th>Average</th>
                        <th>Economy</th>
                        <th>Strike Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topWicketTakers.slice(0, 10).map((player, index) => (
                        <tr key={player.player_id}>
                          <td>{index + 1}</td>
                          <td>
                            <Link to={`/players/${player.player_id}`} className="text-primary hover:underline">
                              {player.player_name}
                            </Link>
                          </td>
                          <td className="font-mono">{player.wickets}</td>
                          <td className="font-mono">{player.total_overs}</td>
                          <td className="font-mono">{player.bowling_average}</td>
                          <td className="font-mono">{player.economy}</td>
                          <td className="font-mono">{player.strike_rate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Best Economy Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="cricket-table">
                      <thead>
                        <tr>
                          <th>Rank</th>
                          <th>Player</th>
                          <th>Economy</th>
                          <th>Overs</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bestEconomy.slice(0, 5).map((player, index) => (
                          <tr key={player.player_id}>
                            <td>{index + 1}</td>
                            <td>
                              <Link to={`/players/${player.player_id}`} className="text-primary hover:underline">
                                {player.player_name}
                              </Link>
                            </td>
                            <td className="font-mono">{player.economy}</td>
                            <td className="font-mono">{player.total_overs}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Best Bowling Average</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="cricket-table">
                      <thead>
                        <tr>
                          <th>Rank</th>
                          <th>Player</th>
                          <th>Average</th>
                          <th>Wickets</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bestBowlingAverage.slice(0, 5).map((player, index) => (
                          <tr key={player.player_id}>
                            <td>{index + 1}</td>
                            <td>
                              <Link to={`/players/${player.player_id}`} className="text-primary hover:underline">
                                {player.player_name}
                              </Link>
                            </td>
                            <td className="font-mono">{player.bowling_average}</td>
                            <td className="font-mono">{player.wickets}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Stats;
