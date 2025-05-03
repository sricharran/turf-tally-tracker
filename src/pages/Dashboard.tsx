
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { matches, players } from '@/lib/data';
import { Trophy, Users, CalendarDays, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  // Get the most recent match
  const latestMatch = [...matches].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  // Get top run scorer
  const topScorer = [...players].sort((a, b) => b.totalRuns - a.totalRuns)[0];
  
  // Get top wicket taker
  const topBowler = [...players].sort((a, b) => b.wickets - a.wickets)[0];

  return (
    <div className="container max-w-7xl py-10">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Turf Tally Dashboard</h1>
        <p className="text-muted-foreground">
          Track cricket stats for your inter-team turf contests.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{matches.length}</div>
            <p className="text-xs text-muted-foreground">
              Matches recorded in the system
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Players</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{players.length}</div>
            <p className="text-xs text-muted-foreground">
              Registered players
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Scorer</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topScorer.name}</div>
            <p className="text-xs text-muted-foreground">
              {topScorer.totalRuns} runs, avg {topScorer.battingAverage}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Bowler</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topBowler.name}</div>
            <p className="text-xs text-muted-foreground">
              {topBowler.wickets} wickets, avg {topBowler.bowlingAverage}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Latest Match</CardTitle>
            <CardDescription>
              {new Date(latestMatch.date).toLocaleDateString()} at {latestMatch.location}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{latestMatch.team1.name}</h3>
                  <p className="text-2xl font-bold">
                    {latestMatch.team1.score}/{latestMatch.team1.wickets} 
                    <span className="text-sm text-muted-foreground ml-2">
                      ({latestMatch.team1.overs} overs)
                    </span>
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-secondary px-3 py-1 rounded-full text-xs font-medium">
                    VS
                  </div>
                </div>
                <div className="text-right">
                  <h3 className="font-medium">{latestMatch.team2.name}</h3>
                  <p className="text-2xl font-bold">
                    {latestMatch.team2.score}/{latestMatch.team2.wickets}
                    <span className="text-sm text-muted-foreground ml-2">
                      ({latestMatch.team2.overs} overs)
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <p className="text-center font-medium">
                  {latestMatch.winner} won the match
                </p>
                <div className="mt-4 text-center">
                  <Link 
                    to={`/matches/${latestMatch.id}`}
                    className="text-sm text-primary hover:underline">
                    View full scorecard
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Overall performance highlights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Highest Team Score</span>
                <span className="font-mono">
                  {Math.max(...matches.map(m => Math.max(m.team1.score, m.team2.score)))}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Most Runs in a Match</span>
                <span className="font-mono">
                  {Math.max(...matches.flatMap(m => m.batting.map(b => b.runs)))}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Most Wickets in a Match</span>
                <span className="font-mono">
                  {Math.max(...matches.flatMap(m => m.bowling.map(b => b.wickets)))}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Most Sixes</span>
                <span className="font-mono">
                  {Math.max(...matches.flatMap(m => m.batting.map(b => b.sixes)))}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Most Maidens</span>
                <span className="font-mono">
                  {Math.max(...matches.flatMap(m => m.bowling.map(b => b.maidens)))}
                </span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Link to="/stats" className="text-sm text-primary hover:underline">
                View all statistics
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
