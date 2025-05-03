
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getMatchById, getPlayerById, Player } from '@/lib/data';
import { ArrowLeft } from 'lucide-react';

const MatchDetails = () => {
  const { id } = useParams<{ id: string }>();
  const match = getMatchById(id || '');

  if (!match) {
    return (
      <div className="container max-w-5xl py-10 text-center">
        <h2 className="text-xl">Match not found</h2>
        <Link to="/matches">
          <Button variant="link" className="mt-4">Go back to matches</Button>
        </Link>
      </div>
    );
  }

  const getPlayerName = (playerId: string): string => {
    const player = getPlayerById(playerId);
    return player ? player.name : 'Unknown Player';
  };

  return (
    <div className="container max-w-7xl py-10">
      <div className="mb-6">
        <Link to="/matches" className="flex items-center text-primary hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to matches
        </Link>
      </div>
      
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Match Details</h1>
        <p className="text-muted-foreground">
          {match.team1.name} vs {match.team2.name} | {new Date(match.date).toLocaleDateString()} at {match.location}
        </p>
      </div>

      <Card className="mt-6">
        <CardHeader className="pb-2">
          <CardTitle>Match Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium">{match.team1.name}</h3>
              <p className="text-3xl font-bold mt-1">
                {match.team1.score}/{match.team1.wickets}
              </p>
              <p className="text-sm text-muted-foreground">
                {match.team1.overs} overs
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium">{match.team2.name}</h3>
              <p className="text-3xl font-bold mt-1">
                {match.team2.score}/{match.team2.wickets}
              </p>
              <p className="text-sm text-muted-foreground">
                {match.team2.overs} overs
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-center">
            <p className="text-lg font-medium">
              {match.winner} won the match
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="batting" className="mt-6">
        <TabsList>
          <TabsTrigger value="batting">Batting</TabsTrigger>
          <TabsTrigger value="bowling">Bowling</TabsTrigger>
        </TabsList>
        <TabsContent value="batting">
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="cricket-table">
                  <thead>
                    <tr>
                      <th>Batter</th>
                      <th>Runs</th>
                      <th>Balls</th>
                      <th>4s</th>
                      <th>6s</th>
                      <th>S/R</th>
                      <th>Out Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {match.batting.map((inning, index) => (
                      <tr key={index}>
                        <td>
                          <Link 
                            to={`/players/${inning.playerId}`} 
                            className="hover:underline text-primary">
                            {getPlayerName(inning.playerId)}
                          </Link>
                        </td>
                        <td className="font-mono">{inning.runs}</td>
                        <td className="font-mono">{inning.balls}</td>
                        <td className="font-mono">{inning.fours}</td>
                        <td className="font-mono">{inning.sixes}</td>
                        <td className="font-mono">
                          {((inning.runs / inning.balls) * 100).toFixed(1)}
                        </td>
                        <td>{inning.outStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bowling">
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="cricket-table">
                  <thead>
                    <tr>
                      <th>Bowler</th>
                      <th>Overs</th>
                      <th>Maidens</th>
                      <th>Runs</th>
                      <th>Wickets</th>
                      <th>Economy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {match.bowling.map((spell, index) => (
                      <tr key={index}>
                        <td>
                          <Link 
                            to={`/players/${spell.playerId}`} 
                            className="hover:underline text-primary">
                            {getPlayerName(spell.playerId)}
                          </Link>
                        </td>
                        <td className="font-mono">{spell.overs}</td>
                        <td className="font-mono">{spell.maidens}</td>
                        <td className="font-mono">{spell.runs}</td>
                        <td className="font-mono">{spell.wickets}</td>
                        <td className="font-mono">
                          {(spell.runs / spell.overs).toFixed(1)}
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

export default MatchDetails;
