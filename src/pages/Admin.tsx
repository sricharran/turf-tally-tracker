
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Redirect } from '../components/Redirect';

const Admin = () => {
  const [isAdmin] = useLocalStorage('isAdmin', false);
  const { toast } = useToast();

  if (!isAdmin) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container max-w-7xl py-10">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage matches, players, and statistics.
        </p>
      </div>

      <Tabs defaultValue="matches" className="mt-6">
        <TabsList>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="players">Players</TabsTrigger>
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
              <p className="text-center py-8">
                This is a demo version with mock data.
                <br />
                In a full implementation, you would be able to add and edit matches here.
              </p>
              <div className="flex justify-center">
                <Button 
                  onClick={() => toast({
                    title: "Feature coming soon",
                    description: "The ability to add new matches will be available in a future update.",
                  })}
                >
                  Add New Match (Demo)
                </Button>
              </div>
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
              <p className="text-center py-8">
                This is a demo version with mock data.
                <br />
                In a full implementation, you would be able to add and edit players here.
              </p>
              <div className="flex justify-center">
                <Button 
                  onClick={() => toast({
                    title: "Feature coming soon",
                    description: "The ability to add new players will be available in a future update.",
                  })}
                >
                  Add New Player (Demo)
                </Button>
              </div>
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
