export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      batting_performances: {
        Row: {
          balls: number | null
          created_at: string
          fours: number | null
          id: string
          match_id: string | null
          out_status: string | null
          player_id: string | null
          runs: number | null
          sixes: number | null
        }
        Insert: {
          balls?: number | null
          created_at?: string
          fours?: number | null
          id?: string
          match_id?: string | null
          out_status?: string | null
          player_id?: string | null
          runs?: number | null
          sixes?: number | null
        }
        Update: {
          balls?: number | null
          created_at?: string
          fours?: number | null
          id?: string
          match_id?: string | null
          out_status?: string | null
          player_id?: string | null
          runs?: number | null
          sixes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "batting_performances_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "batting_performances_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_batting_stats"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "batting_performances_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_bowling_stats"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "batting_performances_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      bowling_performances: {
        Row: {
          created_at: string
          id: string
          maidens: number | null
          match_id: string | null
          overs: number | null
          player_id: string | null
          runs: number | null
          wickets: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          maidens?: number | null
          match_id?: string | null
          overs?: number | null
          player_id?: string | null
          runs?: number | null
          wickets?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          maidens?: number | null
          match_id?: string | null
          overs?: number | null
          player_id?: string | null
          runs?: number | null
          wickets?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bowling_performances_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bowling_performances_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_batting_stats"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "bowling_performances_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_bowling_stats"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "bowling_performances_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      match_players: {
        Row: {
          created_at: string
          id: string
          match_id: string | null
          player_id: string | null
          team_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          match_id?: string | null
          player_id?: string | null
          team_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          match_id?: string | null
          player_id?: string | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "match_players_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_players_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_batting_stats"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "match_players_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_bowling_stats"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "match_players_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_players_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          created_at: string
          date: string
          id: string
          location: string
          team1_id: string | null
          team1_overs: number | null
          team1_score: number | null
          team1_wickets: number | null
          team2_id: string | null
          team2_overs: number | null
          team2_score: number | null
          team2_wickets: number | null
          winner_id: string | null
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          location: string
          team1_id?: string | null
          team1_overs?: number | null
          team1_score?: number | null
          team1_wickets?: number | null
          team2_id?: string | null
          team2_overs?: number | null
          team2_score?: number | null
          team2_wickets?: number | null
          winner_id?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          location?: string
          team1_id?: string | null
          team1_overs?: number | null
          team1_score?: number | null
          team1_wickets?: number | null
          team2_id?: string | null
          team2_overs?: number | null
          team2_score?: number | null
          team2_wickets?: number | null
          winner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_team1_id_fkey"
            columns: ["team1_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_team2_id_fkey"
            columns: ["team2_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_winner_id_fkey"
            columns: ["winner_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          batting_average: number | null
          bowling_average: number | null
          catches: number | null
          created_at: string
          highest_score: number | null
          id: string
          image_url: string | null
          matches: number | null
          name: string
          run_outs: number | null
          total_runs: number | null
          wickets: number | null
        }
        Insert: {
          batting_average?: number | null
          bowling_average?: number | null
          catches?: number | null
          created_at?: string
          highest_score?: number | null
          id?: string
          image_url?: string | null
          matches?: number | null
          name: string
          run_outs?: number | null
          total_runs?: number | null
          wickets?: number | null
        }
        Update: {
          batting_average?: number | null
          bowling_average?: number | null
          catches?: number | null
          created_at?: string
          highest_score?: number | null
          id?: string
          image_url?: string | null
          matches?: number | null
          name?: string
          run_outs?: number | null
          total_runs?: number | null
          wickets?: number | null
        }
        Relationships: []
      }
      teams: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      player_batting_stats: {
        Row: {
          batting_average: number | null
          fours: number | null
          highest_score: number | null
          innings: number | null
          player_id: string | null
          player_name: string | null
          sixes: number | null
          strike_rate: number | null
          total_balls: number | null
          total_runs: number | null
        }
        Relationships: []
      }
      player_bowling_stats: {
        Row: {
          bowling_average: number | null
          economy: number | null
          maidens: number | null
          matches_bowled: number | null
          player_id: string | null
          player_name: string | null
          runs_conceded: number | null
          strike_rate: number | null
          total_overs: number | null
          wickets: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
