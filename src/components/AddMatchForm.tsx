
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
import { Loader2 } from 'lucide-react';

const matchFormSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  location: z.string().min(1, 'Location is required'),
  team1_id: z.string().uuid('Please select Team 1'),
  team2_id: z.string().uuid('Please select Team 2'),
  team1_score: z.coerce.number().int().nonnegative(),
  team1_wickets: z.coerce.number().int().min(0).max(10),
  team1_overs: z.coerce.number().nonnegative().max(50),
  team2_score: z.coerce.number().int().nonnegative(),
  team2_wickets: z.coerce.number().int().min(0).max(10),
  team2_overs: z.coerce.number().nonnegative().max(50),
  winner_id: z.string().uuid('Please select the winner'),
});

type MatchFormValues = z.infer<typeof matchFormSchema>;

const AddMatchForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<MatchFormValues>({
    resolver: zodResolver(matchFormSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      location: '',
      team1_score: 0,
      team1_wickets: 0,
      team1_overs: 0,
      team2_score: 0,
      team2_wickets: 0,
      team2_overs: 0,
    },
  });

  const { data: teams = [], isLoading: isLoadingTeams } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const { data, error } = await supabase.from('teams').select('*');
      if (error) throw error;
      return data;
    },
  });

  const onSubmit = async (data: MatchFormValues) => {
    setIsSubmitting(true);
    try {
      // Ensure all required fields are present and match the Supabase schema
      const sanitizedData = {
        date: data.date,
        location: data.location,
        team1_id: data.team1_id,
        team2_id: data.team2_id,
        team1_score: data.team1_score || 0, // Ensure non-nullable values
        team1_wickets: data.team1_wickets || 0,
        team1_overs: data.team1_overs || 0,
        team2_score: data.team2_score || 0,
        team2_wickets: data.team2_wickets || 0,
        team2_overs: data.team2_overs || 0,
        winner_id: data.winner_id,
      };
  
      const { error } = await supabase.from('matches').insert([sanitizedData]);
  
      if (error) {
        throw error;
      }
  
      toast({
        title: "Success!",
        description: "Match has been created successfully.",
      });
  
      form.reset();
  
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error adding match:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add match. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const team1Id = form.watch('team1_id');
  const team2Id = form.watch('team2_id');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Match Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter match location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="team1_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team 1</FormLabel>
                <Select disabled={isLoadingTeams} onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Team 1" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="team2_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team 2</FormLabel>
                <Select disabled={isLoadingTeams} onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Team 2" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem 
                        key={team.id} 
                        value={team.id} 
                        disabled={team.id === team1Id}
                      >
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4 border p-4 rounded-md">
            <h4 className="font-medium">Team 1 Score</h4>
            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="team1_score"
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
                control={form.control}
                name="team1_wickets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wickets</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="team1_overs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Overs</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="50" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="space-y-4 border p-4 rounded-md">
            <h4 className="font-medium">Team 2 Score</h4>
            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="team2_score"
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
                control={form.control}
                name="team2_wickets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wickets</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="team2_overs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Overs</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="50" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name="winner_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Match Winner</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Winner" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {teams
                    .filter(team => team.id === team1Id || team.id === team2Id)
                    .map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting || isLoadingTeams}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Add Match'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddMatchForm;
