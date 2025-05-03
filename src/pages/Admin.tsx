
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Redirect } from '../components/Redirect';
import AddMatchForm from '../components/AddMatchForm';
import AddPerformanceForm from '../components/AddPerformanceForm';
import AddPlayerForm from '../components/AddPlayerForm';
import AddTeamForm from '../components/AddTeamForm';
import { Plus } from 'lucide-react';

const Admin = () => {
  const [isAdmin] = useLocalStorage('isAdmin', false);
  const { toast } = useToast();
  const [activeDialog, setActiveDialog] = useState<string | null>(null);

  if (!isAdmin) {
    return <Redirect to="/login" />;
  }

  const closeDialog = () => setActiveDialog(null);

  return (
    <div className="container max-w-7xl py-10">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage matches, players, teams, and statistics.
        </p>
      </div>

      <Tabs defaultValue="matches" className="mt-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="matches">
          <Card>
            <CardHeader>
              <CardTitle>Match Management</CardTitle>
              <CardDescription>
                Create, edit, or delete match records.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog open={activeDialog === 'match'} onOpenChange={(open) => open ? setActiveDialog('match') : closeDialog()}>
                <DialogTrigger asChild>
                  <Button className="gap-1">
                    <Plus size={16} />
                    <span>Add New Match</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add New Match</DialogTitle>
                    <DialogDescription>
                      Enter the details for the new match.
                    </DialogDescription>
                  </DialogHeader>
                  <AddMatchForm onSuccess={closeDialog} />
                </DialogContent>
              </Dialog>
              <p className="text-sm text-muted-foreground">
                Create new match records or navigate to existing matches to edit their details.
                You can view all matches in the Matches section.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="players">
          <Card>
            <CardHeader>
              <CardTitle>Player Management</CardTitle>
              <CardDescription>
                Add, edit, or remove player profiles.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog open={activeDialog === 'player'} onOpenChange={(open) => open ? setActiveDialog('player') : closeDialog()}>
                <DialogTrigger asChild>
                  <Button className="gap-1">
                    <Plus size={16} />
                    <span>Add New Player</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Player</DialogTitle>
                    <DialogDescription>
                      Enter the details for the new player.
                    </DialogDescription>
                  </DialogHeader>
                  <AddPlayerForm onSuccess={closeDialog} />
                </DialogContent>
              </Dialog>
              <p className="text-sm text-muted-foreground">
                Create new player profiles or navigate to existing players to edit their details.
                You can view all players in the Players section.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="teams">
          <Card>
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>
                Add or edit team information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog open={activeDialog === 'team'} onOpenChange={(open) => open ? setActiveDialog('team') : closeDialog()}>
                <DialogTrigger asChild>
                  <Button className="gap-1">
                    <Plus size={16} />
                    <span>Add New Team</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Team</DialogTitle>
                    <DialogDescription>
                      Enter the details for the new team.
                    </DialogDescription>
                  </DialogHeader>
                  <AddTeamForm onSuccess={closeDialog} />
                </DialogContent>
              </Dialog>
              <p className="text-sm text-muted-foreground">
                Create new teams that can be assigned to matches.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Statistics Management</CardTitle>
              <CardDescription>
                Record player performances and statistics.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog open={activeDialog === 'stats'} onOpenChange={(open) => open ? setActiveDialog('stats') : closeDialog()}>
                <DialogTrigger asChild>
                  <Button className="gap-1">
                    <Plus size={16} />
                    <span>Add Performance Record</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px]">
                  <DialogHeader>
                    <DialogTitle>Add Player Performance</DialogTitle>
                    <DialogDescription>
                      Record a player's batting or bowling statistics for a match.
                    </DialogDescription>
                  </DialogHeader>
                  <AddPerformanceForm onSuccess={closeDialog} />
                </DialogContent>
              </Dialog>
              <p className="text-sm text-muted-foreground">
                Record individual player performances for matches. This data will be used to calculate
                player statistics shown on the Statistics page.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 text-center">
        <Link to="/">
          <Button variant="outline">Return to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
