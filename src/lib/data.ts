
// Mock data for the app until we implement a proper backend

export interface Player {
  id: string;
  name: string;
  image?: string;
  matches: number;
  totalRuns: number;
  highestScore: number;
  battingAverage: number;
  wickets: number;
  bowlingAverage: number;
  catches: number;
  runOuts: number;
}

export interface BattingInnings {
  playerId: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  outStatus: string;
}

export interface BowlingSpell {
  playerId: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
}

export interface Team {
  name: string;
  players: string[];
  score: number;
  wickets: number;
  overs: number;
}

export interface Match {
  id: string;
  date: string;
  team1: Team;
  team2: Team;
  winner: string;
  location: string;
  batting: BattingInnings[];
  bowling: BowlingSpell[];
}

export const players: Player[] = [
  {
    id: "p1",
    name: "Alex Johnson",
    matches: 15,
    totalRuns: 456,
    highestScore: 78,
    battingAverage: 38.0,
    wickets: 12,
    bowlingAverage: 24.5,
    catches: 8,
    runOuts: 3
  },
  {
    id: "p2",
    name: "Sam Wilson",
    matches: 14,
    totalRuns: 325,
    highestScore: 65,
    battingAverage: 32.5,
    wickets: 18,
    bowlingAverage: 20.3,
    catches: 5,
    runOuts: 1
  },
  {
    id: "p3",
    name: "Jamie Smith",
    matches: 12,
    totalRuns: 421,
    highestScore: 92,
    battingAverage: 42.1,
    wickets: 3,
    bowlingAverage: 38.7,
    catches: 10,
    runOuts: 4
  },
  {
    id: "p4",
    name: "Taylor Brown",
    matches: 15,
    totalRuns: 380,
    highestScore: 71,
    battingAverage: 34.5,
    wickets: 22,
    bowlingAverage: 18.2,
    catches: 7,
    runOuts: 2
  },
  {
    id: "p5",
    name: "Jordan Lee",
    matches: 13,
    totalRuns: 289,
    highestScore: 54,
    battingAverage: 28.9,
    wickets: 15,
    bowlingAverage: 22.6,
    catches: 6,
    runOuts: 5
  }
];

export const matches: Match[] = [
  {
    id: "m1",
    date: "2025-04-15",
    location: "East Field",
    team1: {
      name: "Red Wolves",
      players: ["p1", "p3", "p5"],
      score: 187,
      wickets: 4,
      overs: 20
    },
    team2: {
      name: "Blue Sharks",
      players: ["p2", "p4"],
      score: 165,
      wickets: 6,
      overs: 20
    },
    winner: "Red Wolves",
    batting: [
      { playerId: "p1", runs: 65, balls: 42, fours: 8, sixes: 2, outStatus: "Caught" },
      { playerId: "p3", runs: 48, balls: 36, fours: 5, sixes: 1, outStatus: "Not Out" },
      { playerId: "p5", runs: 32, balls: 28, fours: 3, sixes: 0, outStatus: "Bowled" },
      { playerId: "p2", runs: 42, balls: 38, fours: 4, sixes: 1, outStatus: "Run Out" },
      { playerId: "p4", runs: 54, balls: 40, fours: 6, sixes: 2, outStatus: "LBW" }
    ],
    bowling: [
      { playerId: "p1", overs: 4, maidens: 0, runs: 38, wickets: 2 },
      { playerId: "p3", overs: 3, maidens: 0, runs: 26, wickets: 0 },
      { playerId: "p5", overs: 4, maidens: 1, runs: 32, wickets: 3 },
      { playerId: "p2", overs: 4, maidens: 0, runs: 42, wickets: 1 },
      { playerId: "p4", overs: 4, maidens: 0, runs: 36, wickets: 2 }
    ]
  },
  {
    id: "m2",
    date: "2025-04-22",
    location: "West Park",
    team1: {
      name: "Blue Sharks",
      players: ["p1", "p4"],
      score: 193,
      wickets: 5,
      overs: 20
    },
    team2: {
      name: "Red Wolves",
      players: ["p2", "p3", "p5"],
      score: 175,
      wickets: 8,
      overs: 20
    },
    winner: "Blue Sharks",
    batting: [
      { playerId: "p1", runs: 72, balls: 48, fours: 9, sixes: 3, outStatus: "Not Out" },
      { playerId: "p4", runs: 58, balls: 42, fours: 7, sixes: 1, outStatus: "Caught" },
      { playerId: "p2", runs: 34, balls: 30, fours: 3, sixes: 1, outStatus: "Bowled" },
      { playerId: "p3", runs: 45, balls: 35, fours: 5, sixes: 2, outStatus: "Stumped" },
      { playerId: "p5", runs: 28, balls: 25, fours: 2, sixes: 0, outStatus: "Run Out" }
    ],
    bowling: [
      { playerId: "p1", overs: 4, maidens: 0, runs: 36, wickets: 3 },
      { playerId: "p4", overs: 4, maidens: 1, runs: 30, wickets: 2 },
      { playerId: "p2", overs: 4, maidens: 0, runs: 38, wickets: 1 },
      { playerId: "p3", overs: 3, maidens: 0, runs: 28, wickets: 1 },
      { playerId: "p5", overs: 4, maidens: 0, runs: 34, wickets: 2 }
    ]
  }
];

export function getPlayerById(id: string): Player | undefined {
  return players.find(player => player.id === id);
}

export function getMatchById(id: string): Match | undefined {
  return matches.find(match => match.id === id);
}

export function getPlayerMatches(playerId: string): Match[] {
  return matches.filter(match => 
    match.team1.players.includes(playerId) || 
    match.team2.players.includes(playerId)
  );
}

export function getPlayerBattingStats(playerId: string) {
  const allInnings = matches.flatMap(match => 
    match.batting.filter(innings => innings.playerId === playerId)
  );
  
  const totalRuns = allInnings.reduce((sum, innings) => sum + innings.runs, 0);
  const totalBalls = allInnings.reduce((sum, innings) => sum + innings.balls, 0);
  const totalFours = allInnings.reduce((sum, innings) => sum + innings.fours, 0);
  const totalSixes = allInnings.reduce((sum, innings) => sum + innings.sixes, 0);
  const highestScore = Math.max(...allInnings.map(innings => innings.runs));
  const strikeRate = totalBalls > 0 ? (totalRuns / totalBalls) * 100 : 0;
  
  const outInnings = allInnings.filter(innings => innings.outStatus !== "Not Out");
  const battingAverage = outInnings.length > 0 ? totalRuns / outInnings.length : totalRuns;
  
  return {
    innings: allInnings.length,
    runs: totalRuns,
    balls: totalBalls,
    fours: totalFours,
    sixes: totalSixes,
    highestScore,
    average: battingAverage.toFixed(2),
    strikeRate: strikeRate.toFixed(2)
  };
}

export function getPlayerBowlingStats(playerId: string) {
  const allSpells = matches.flatMap(match => 
    match.bowling.filter(spell => spell.playerId === playerId)
  );
  
  const totalOvers = allSpells.reduce((sum, spell) => sum + spell.overs, 0);
  const totalMaidens = allSpells.reduce((sum, spell) => sum + spell.maidens, 0);
  const totalRuns = allSpells.reduce((sum, spell) => sum + spell.runs, 0);
  const totalWickets = allSpells.reduce((sum, spell) => sum + spell.wickets, 0);
  
  const economy = totalOvers > 0 ? totalRuns / totalOvers : 0;
  const average = totalWickets > 0 ? totalRuns / totalWickets : 0;
  const strikeRate = totalWickets > 0 ? (totalOvers * 6) / totalWickets : 0;
  
  return {
    spells: allSpells.length,
    overs: totalOvers,
    maidens: totalMaidens,
    runs: totalRuns,
    wickets: totalWickets,
    economy: economy.toFixed(2),
    average: average.toFixed(2),
    strikeRate: strikeRate.toFixed(2)
  };
}
