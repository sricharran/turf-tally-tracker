
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

const battingSchema = z.object({
  player_id: z.string().uuid('Please select a player'),
  match_id: z.string().uuid('Please select a match'),
  runs: z.coerce.number().int().nonnegative(),
  balls: z.coerce.number().int().nonnegative(),
  fours: z.coerce.number().int().nonnegative(),
  sixes: z.coerce.number().int().nonnegative(),
  out_status: z.string().optional(),
});

const bowlingSchema = z.object({
  player_id: z.string().uuid('Please select a player'),
  match_id: z.string().uuid('Please select a match'),
  overs: z.coerce.number().nonnegative(),
  maidens: z.coerce.number().int().nonnegative(),
  runs: z.coerce.number().int().nonnegative(),
  wickets: z.coerce.number().int().nonnegative(),
});

type BattingFormValues = z.infer<typeof battingSchema>;
type BowlingFormValues = z.infer<typeof bowlingSchema>;

const AddPerformanceForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [isSubmittingBatting, setIsSubmittingBatting] = useState(false);
  const [isSubmittingBowling, setIsSubmittingBowling] = useState(false);
  const { toast } = useToast();

  const battingForm = useForm<BattingFormValues>({
    resolver: zodResolver(battingSchema),
    defaultValues: {
      runs: 0,
      balls: 0,
      fours: 0,
      sixes: 0,
    },
  });

  const bowlingForm = useForm<BowlingFormValues>({
    resolver: zodResolver(bowlingSchema),
    defaultValues: {
      overs: 0,
      maidens: 0,
      runs: 0,
      wickets: 0,
    },
  });

  const { data: players = [], isLoading: isLoadingPlayers } = useQuery({
    queryKey: ['players'],
    queryFn: async () => {
      const { data, error } = await supabase.from('players').select('*');
      if (error) throw error;
      return data;
    },
  });

  const { data: matches = [], isLoading: isLoadingMatches } = useQuery({
    queryKey: ['matches'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('matches')
        .select(`
          id,
          date,
          team1:team1_id(id, name),
          team2:team2_id(id, name)
        `);
      if (error) throw error;
      return data;
    },
  });

  const onSubmitBatting = async (data: BattingFormValues) => {
    setIsSubmittingBatting(true);
    try {
      const { error } = await supabase.from('batting_performances').insert([data]);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Success!",
        description: "Batting performance has been recorded.",
      });
      
      battingForm.reset();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error adding batting performance:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add batting performance. Please try again.",
      });
    } finally {
      setIsSubmittingBatting(false);
    }
  };

  const onSubmitBowling = async (data: BowlingFormValues) => {
    setIsSubmittingBowling(true);
    try {
      const { error } = await supabase.from('bowling_performances').insert([data]);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Success!",
        description: "Bowling performance has been recorded.",
      });
      
      bowlingForm.reset();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error adding bowling performance:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add bowling performance. Please try again.",
      });
    } finally {
      setIsSubmittingBowling(false);
    }
  };

  const formatMatchOption = (match: any) => {
    const team1Name = match.team1?.name || 'Unknown';
    const team2Name = match.team2?.name || 'Unknown';
    const matchDate = new Date(match.date).toLocaleDateString();
    return `${team1Name} vs ${team2Name} (${matchDate})`;
  };

  return (
    <Tabs defaultValue="batting" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="batting">Batting Performance</TabsTrigger>
        <TabsTrigger value="bowling">Bowling Performance</TabsTrigger>
      </TabsList>
      
      <TabsContent value="batting">
        <Form {...battingForm}>
          <form onSubmit={battingForm.handleSubmit(onSubmitBatting)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={battingForm.control}
                name="player_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Player</FormLabel>
                    <Select disabled={isLoadingPlayers} onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Player" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {players.map((player) => (
                          <SelectItem key={player.id} value={player.id}>
                            {player.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={battingForm.control}
                name="match_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Match</FormLabel>
                    <Select disabled={isLoadingMatches} onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Match" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {matches.map((match) => (
                          <SelectItem key={match.id} value={match.id}>
                            {formatMatchOption(match)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <FormField
                control={battingForm.control}
                name="runs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Runs</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={battingForm.control}
                name="balls"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Balls</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={battingForm.control}
                name="fours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fours</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={battingForm.control}
                name="sixes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sixes</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={battingForm.control}
              name="out_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Out Status (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., bowled, caught, run out" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmittingBatting || isLoadingPlayers || isLoadingMatches}>
                {isSubmittingBatting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Record Batting Performance'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </TabsContent>
      
      <TabsContent value="bowling">
        <Form {...bowlingForm}>
          <form onSubmit={bowlingForm.handleSubmit(onSubmitBowling)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={bowlingForm.control}
                name="player_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Player</FormLabel>
                    <Select disabled={isLoadingPlayers} onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Player" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {players.map((player) => (
                          <SelectItem key={player.id} value={player.id}>
                            {player.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={bowlingForm.control}
                name="match_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Match</FormLabel>
                    <Select disabled={isLoadingMatches} onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Match" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {matches.map((match) => (
                          <SelectItem key={match.id} value={match.id}>
                            {formatMatchOption(match)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <FormField
                control={bowlingForm.control}
                name="overs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Overs</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={bowlingForm.control}
                name="maidens"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maidens</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={bowlingForm.control}
                name="runs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Runs</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={bowlingForm.control}
                name="wickets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wickets</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmittingBowling || isLoadingPlayers || isLoadingMatches}>
                {isSubmittingBowling ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Record Bowling Performance'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
};

export default AddPerformanceForm;
