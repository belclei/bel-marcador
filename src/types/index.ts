import { z } from "zod";

export const RoundSchema = z.object({
  teamAScore: z.number(),
  teamBScore: z.number(),
  undone: z.boolean().default(false),
});

export const TeamSchema = z.object({
  name: z.string(),
  members: z.array(z.string()),
  score: z.number().default(0),
});

export const TrucoMatchSchema = z.object({
  id: z.string(),
  gameType: z.literal("truco"),
  teamA: TeamSchema,
  teamB: TeamSchema,
  maxScore: z.number(),
  rounds: z.array(RoundSchema),
  createdAt: z.string(),
  finishedAt: z.string().optional(),
});

export const GameStorageSchema = z.object({
  matches: z.array(TrucoMatchSchema),
});

export type Round = z.infer<typeof RoundSchema>;
export type Team = z.infer<typeof TeamSchema>;
export type TrucoMatch = z.infer<typeof TrucoMatchSchema>;
export type GameStorage = z.infer<typeof GameStorageSchema>;

export interface TrucoSetup {
  teamAName: string;
  teamAMembers: string[];
  teamBName: string;
  teamBMembers: string[];
  maxScore: number;
}
