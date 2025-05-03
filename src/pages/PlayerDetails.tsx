
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getPlayerById, getPlayerMatches, getPlayerBattingStats, getPlayerBowlingStats } from '@/lib/data';
import { ArrowLeft, User } from 'lucide-react';

const PlayerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const player = getPlayerById(id || '');
  const playerMatches = getPlayerMatches(id || '');
  const battingStats = getPlayerBattingStats(id || '');
  const bowlingStats = getPlayerBowlingStats(id || '');

  if (!player) {
    return (
      <div className="container max-w-5xl py-10 text-center">
        <h2 className="text-xl">Player not found</h2>
        <Link to="/players">
          <Button variant="link" className="mt-4">Go back to players</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl py-10">
      <div className="mb-6">
        <Link to="/players" className="flex items-center text-primary hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to players
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        <div className="flex items-center justify-center h-24 w-24 rounded-full bg-secondary">
          <User size={48} className="text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{player.name}</h1>
          <p className="text-muted-foreground">
            {player.matches} matches played
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 mt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Total Runs</p>
              <p className="text-3xl font-bold font-mono mt-1">{player.totalRuns}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Highest Score</p>
              <p className="text-3xl font-bold font-mono mt-1">{player.highestScore}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Wickets</p>
              <p className="text-3xl font-bold font-mono mt-1">{player.wickets}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Catches</p>
              <p className="text-3xl font-bold font-mono mt-1">{player.catches}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="batting" className="mt-8">
        <TabsList>
          <TabsTrigger value="batting">Batting</TabsTrigger>
          <TabsTrigger value="bowling">Bowling</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
        </TabsList>
        <TabsContent value="batting">
          <Card>
            <CardHeader>
              <CardTitle>Batting Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-muted-foreground text-sm">Innings</p>
                  <p className="text-2xl font-mono mt-1">{battingStats.innings}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Average</p>
                  <p className="text-2xl font-mono mt-1">{battingStats.average}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Strike Rate</p>
                  <p className="text-2xl font-mono mt-1">{battingStats.strikeRate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Highest</p>
                  <p className="text-2xl font-mono mt-1">{battingStats.highestScore}</p>
                </div>
              </div>
              <Separator className="my-6" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-muted-foreground text-sm">Runs</p>
                  <p className="text-2xl font-mono mt-1">{battingStats.runs}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Balls</p>
                  <p className="text-2xl font-mono mt-1">{battingStats.balls}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">4s</p>
                  <p className="text-2xl font-mono mt-1">{battingStats.fours}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">6s</p>
                  <p className="text-2xl font-mono mt-1">{battingStats.sixes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bowling">
          <Card>
            <CardHeader>
              <CardTitle>Bowling Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-muted-foreground text-sm">Spells</p>
                  <p className="text-2xl font-mono mt-1">{bowlingStats.spells}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Wickets</p>
                  <p className="text-2xl font-mono mt-1">{bowlingStats.wickets}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Economy</p>
                  <p className="text-2xl font-mono mt-1">{bowlingStats.economy}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Average</p>
                  <p className="text-2xl font-mono mt-1">{bowlingStats.average}</p>
                </div>
              </div>
              <Separator className="my-6" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-muted-foreground text-sm">Overs</p>
                  <p className="text-2xl font-mono mt-1">{bowlingStats.overs}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Maidens</p>
                  <p className="text-2xl font-mono mt-1">{bowlingStats.maidens}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Runs</p>
                  <p className="text-2xl font-mono mt-1">{bowlingStats.runs}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Strike Rate</p>
                  <p className="text-2xl font-mono mt-1">{bowlingStats.strikeRate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="matches">
          <Card>
            <CardHeader>
              <CardTitle>Match Participation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="cricket-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Match</th>
                      <th>Result</th>
                      <th>Team</th>
                    </tr>
                  </thead>
                  <tbody>
                    {playerMatches.map((match) => (
                      <tr key={match.id}>
                        <td>{new Date(match.date).toLocaleDateString()}</td>
                        <td>
                          <Link to={`/matches/${match.id}`} className="text-primary hover:underline">
                            {match.team1.name} vs {match.team2.name}
                          </Link>
                        </td>
                        <td>{match.winner} won</td>
                        <td>
                          {match.team1.players.includes(player.id) 
                            ? match.team1.name 
                            : match.team2.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlayerDetails;
