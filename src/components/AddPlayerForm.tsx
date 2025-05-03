
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
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
import { Loader2 } from 'lucide-react';

const playerFormSchema = z.object({
  name: z.string().min(1, 'Player name is required'),
  image_url: z.string().optional(),
});

type PlayerFormValues = z.infer<typeof playerFormSchema>;

const AddPlayerForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<PlayerFormValues>({
    resolver: zodResolver(playerFormSchema),
    defaultValues: {
      name: '',
      image_url: '',
    },
  });

  const onSubmit = async (data: PlayerFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('players').insert([{
        name: data.name,
        image_url: data.image_url || null,
        matches: 0,
        total_runs: 0,
        highest_score: 0,
        batting_average: 0,
        wickets: 0,
        bowling_average: 0,
        catches: 0,
        run_outs: 0,
      }]);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Success!",
        description: "Player has been added successfully.",
      });
      
      form.reset();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error adding player:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add player. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Player Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter player name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter image URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Add Player'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddPlayerForm;
