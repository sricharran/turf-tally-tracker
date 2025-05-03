
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { players, getPlayerBattingStats, getPlayerBowlingStats } from '@/lib/data';

const Stats = () => {
  // Prepare batting statistics
  const battingStats = players.map(player => {
    const stats = getPlayerBattingStats(player.id);
    return {
      ...player,
      battingStats: stats,
    };
  });
  
  // Prepare bowling statistics
  const bowlingStats = players.map(player => {
    const stats = getPlayerBowlingStats(player.id);
    return {
      ...player,
      bowlingStats: stats,
    };
  });

  // Sort by different criteria
  const topRunScorers = [...battingStats].sort((a, b) => b.battingStats.runs - a.battingStats.runs);
  const topAverages = [...battingStats]
    .filter(p => p.battingStats.innings > 0)
    .sort((a, b) => parseFloat(b.battingStats.average) - parseFloat(a.battingStats.average));
  const topStrikeRates = [...battingStats]
    .filter(p => p.battingStats.balls > 10)
    .sort((a, b) => parseFloat(b.battingStats.strikeRate) - parseFloat(a.battingStats.strikeRate));
  
  const topWicketTakers = [...bowlingStats].sort((a, b) => b.bowlingStats.wickets - a.bowlingStats.wickets);
  const bestEconomy = [...bowlingStats]
    .filter(p => p.bowlingStats.overs > 2)
    .sort((a, b) => parseFloat(a.bowlingStats.economy) - parseFloat(b.bowlingStats.economy));
  const bestBowlingAverage = [...bowlingStats]
    .filter(p => p.bowlingStats.wickets > 0)
    .sort((a, b) => parseFloat(a.bowlingStats.average) - parseFloat(b.bowlingStats.average));

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
                        <tr key={player.id}>
                          <td>{index + 1}</td>
                          <td>
                            <Link to={`/players/${player.id}`} className="text-primary hover:underline">
                              {player.name}
                            </Link>
                          </td>
                          <td className="font-mono">{player.battingStats.runs}</td>
                          <td className="font-mono">{player.battingStats.innings}</td>
                          <td className="font-mono">{player.battingStats.average}</td>
                          <td className="font-mono">{player.battingStats.strikeRate}</td>
                          <td className="font-mono">{player.battingStats.fours}</td>
                          <td className="font-mono">{player.battingStats.sixes}</td>
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
                          <tr key={player.id}>
                            <td>{index + 1}</td>
                            <td>
                              <Link to={`/players/${player.id}`} className="text-primary hover:underline">
                                {player.name}
                              </Link>
                            </td>
                            <td className="font-mono">{player.battingStats.average}</td>
                            <td className="font-mono">{player.battingStats.innings}</td>
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
                          <tr key={player.id}>
                            <td>{index + 1}</td>
                            <td>
                              <Link to={`/players/${player.id}`} className="text-primary hover:underline">
                                {player.name}
                              </Link>
                            </td>
                            <td className="font-mono">{player.battingStats.strikeRate}</td>
                            <td className="font-mono">{player.battingStats.runs}</td>
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
                        <tr key={player.id}>
                          <td>{index + 1}</td>
                          <td>
                            <Link to={`/players/${player.id}`} className="text-primary hover:underline">
                              {player.name}
                            </Link>
                          </td>
                          <td className="font-mono">{player.bowlingStats.wickets}</td>
                          <td className="font-mono">{player.bowlingStats.overs}</td>
                          <td className="font-mono">{player.bowlingStats.average}</td>
                          <td className="font-mono">{player.bowlingStats.economy}</td>
                          <td className="font-mono">{player.bowlingStats.strikeRate}</td>
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
                          <tr key={player.id}>
                            <td>{index + 1}</td>
                            <td>
                              <Link to={`/players/${player.id}`} className="text-primary hover:underline">
                                {player.name}
                              </Link>
                            </td>
                            <td className="font-mono">{player.bowlingStats.economy}</td>
                            <td className="font-mono">{player.bowlingStats.overs}</td>
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
                          <tr key={player.id}>
                            <td>{index + 1}</td>
                            <td>
                              <Link to={`/players/${player.id}`} className="text-primary hover:underline">
                                {player.name}
                              </Link>
                            </td>
                            <td className="font-mono">{player.bowlingStats.average}</td>
                            <td className="font-mono">{player.bowlingStats.wickets}</td>
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
