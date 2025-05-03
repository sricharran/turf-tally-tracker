// src/components/MatchPlayerAssignmentForm.tsx

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

const MatchPlayerAssignmentForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { toast } = useToast();

  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/matches')
      .then((res) => res.json())
      .then(setMatches);
    fetch('/api/teams')
      .then((res) => res.json())
      .then(setTeams);
  }, []);

  useEffect(() => {
    if (selectedTeam) {
      fetch(`/api/players?team_id=${selectedTeam}`)
        .then((res) => res.json())
        .then(setPlayers);
    }
  }, [selectedTeam]);

  const togglePlayerSelection = (playerId: string) => {
    setSelectedPlayers((prev) =>
      prev.includes(playerId)
        ? prev.filter((id) => id !== playerId)
        : [...prev, playerId]
    );
  };

  const handleSubmit = async () => {
    const assignments = selectedPlayers.map((playerId) => ({
      match_id: selectedMatch,
      team_id: selectedTeam,
      player_id: playerId,
    }));

    const res = await fetch('/api/match_players', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assignments),
    });

    if (res.ok) {
      toast({ title: 'Players assigned to match successfully' });
      onSuccess();
    } else {
      toast({ title: 'Failed to assign players', variant: 'destructive' });
    }
  };

  return (
    <form className="space-y-4">
      <div>
        <Label>Select Match</Label>
        <Select onValueChange={setSelectedMatch}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a match" />
          </SelectTrigger>
          <SelectContent>
            {matches.map((match) => (
              <SelectItem key={match.id} value={match.id}>
                {match.location} - {match.date}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Select Team</Label>
        <Select onValueChange={setSelectedTeam}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a team" />
          </SelectTrigger>
          <SelectContent>
            {teams.map((team) => (
              <SelectItem key={team.id} value={team.id}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Select Players</Label>
        <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto border rounded p-2">
          {players.map((player) => (
            <label key={player.id} className="flex items-center gap-2">
              <Checkbox
                checked={selectedPlayers.includes(player.id)}
                onCheckedChange={() => togglePlayerSelection(player.id)}
              />
              {player.name}
            </label>
          ))}
        </div>
      </div>

      <DialogFooter>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={
            !selectedMatch || !selectedTeam || selectedPlayers.length === 0
          }
        >
          Assign Players
        </Button>
      </DialogFooter>
    </form>
  );
};

export default MatchPlayerAssignmentForm;
