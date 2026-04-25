import { describe, expect, it } from "vitest";
import { addScore, checkWinner, createTrucoMatch, resetMatch, undoLastRound } from "./truco";
import type { TrucoSetup } from "~/types";

const baseSetup: TrucoSetup = {
  teamAName: "Nós",
  teamAMembers: [],
  teamBName: "Eles",
  teamBMembers: [],
  maxScore: 12,
};

describe("createTrucoMatch", () => {
  it("uses provided team names and maxScore", () => {
    const match = createTrucoMatch(baseSetup);
    expect(match.teamA.name).toBe("Nós");
    expect(match.teamB.name).toBe("Eles");
    expect(match.maxScore).toBe(12);
  });

  it("falls back to 'Nós' and 'Eles' when names are empty strings", () => {
    const match = createTrucoMatch({ ...baseSetup, teamAName: "", teamBName: "" });
    expect(match.teamA.name).toBe("Nós");
    expect(match.teamB.name).toBe("Eles");
  });

  it("starts with score 0 and no rounds", () => {
    const match = createTrucoMatch(baseSetup);
    expect(match.teamA.score).toBe(0);
    expect(match.teamB.score).toBe(0);
    expect(match.rounds).toHaveLength(0);
  });

  it("creates match with gameType truco", () => {
    const match = createTrucoMatch(baseSetup);
    expect(match.gameType).toBe("truco");
  });
});

describe("addScore", () => {
  it("adds points to team A without changing team B", () => {
    const match = createTrucoMatch(baseSetup);
    const updated = addScore(match, "A", 3);
    expect(updated.teamA.score).toBe(3);
    expect(updated.teamB.score).toBe(0);
  });

  it("adds points to team B without changing team A", () => {
    const match = createTrucoMatch(baseSetup);
    const updated = addScore(match, "B", 6);
    expect(updated.teamA.score).toBe(0);
    expect(updated.teamB.score).toBe(6);
  });

  it("accumulates score across multiple calls", () => {
    const match = createTrucoMatch(baseSetup);
    const updated = addScore(addScore(match, "A", 3), "A", 1);
    expect(updated.teamA.score).toBe(4);
  });

  it("appends a round with cumulative scores after each call", () => {
    const match = createTrucoMatch(baseSetup);
    const after1 = addScore(match, "A", 3);
    const after2 = addScore(after1, "B", 1);
    expect(after2.rounds).toHaveLength(2);
    expect(after2.rounds[1]).toEqual({ teamAScore: 3, teamBScore: 1, undone: false });
  });

  it("caps score at maxScore when points would exceed it", () => {
    const match = addScore(createTrucoMatch(baseSetup), "A", 9); // score = 9
    const capped = addScore(match, "A", 6); // 9 + 6 = 15, but max is 12
    expect(capped.teamA.score).toBe(12);
    expect(capped.rounds.at(-1)?.teamAScore).toBe(12);
  });

  it("does not mutate the original match", () => {
    const match = createTrucoMatch(baseSetup);
    addScore(match, "A", 3);
    expect(match.teamA.score).toBe(0);
    expect(match.rounds).toHaveLength(0);
  });
});

describe("undoLastRound", () => {
  it("returns the same match reference when there are no rounds", () => {
    const match = createTrucoMatch(baseSetup);
    expect(undoLastRound(match)).toBe(match);
  });

  it("returns the same match reference when all rounds are already undone", () => {
    const withRound = addScore(createTrucoMatch(baseSetup), "A", 3);
    const allUndone = undoLastRound(withRound);
    expect(undoLastRound(allUndone)).toBe(allUndone);
  });

  it("marks the last active round as undone", () => {
    const match = undoLastRound(addScore(createTrucoMatch(baseSetup), "A", 3));
    expect(match.rounds[0]?.undone).toBe(true);
  });

  it("resets scores to 0 when the only round is undone", () => {
    const match = undoLastRound(addScore(createTrucoMatch(baseSetup), "A", 3));
    expect(match.teamA.score).toBe(0);
    expect(match.teamB.score).toBe(0);
  });

  it("restores scores from the previous active round after undo", () => {
    const match = createTrucoMatch(baseSetup);
    const after1 = addScore(match, "A", 3);
    const after2 = addScore(after1, "B", 6);
    const undone = undoLastRound(after2);
    expect(undone.teamA.score).toBe(3);
    expect(undone.teamB.score).toBe(0);
  });

  it("skips already-undone rounds and undoes the next active one", () => {
    const match = createTrucoMatch(baseSetup);
    const after1 = addScore(match, "A", 3);
    const after2 = addScore(after1, "B", 6);
    const undo1 = undoLastRound(after2); // undoes round 2
    const undo2 = undoLastRound(undo1);  // undoes round 1
    expect(undo2.teamA.score).toBe(0);
    expect(undo2.teamB.score).toBe(0);
    expect(undo2.rounds.every((r) => r.undone)).toBe(true);
  });
});

describe("resetMatch", () => {
  it("zeroes both team scores and clears rounds", () => {
    const match = addScore(addScore(createTrucoMatch(baseSetup), "A", 6), "B", 3);
    const reset = resetMatch(match);
    expect(reset.teamA.score).toBe(0);
    expect(reset.teamB.score).toBe(0);
    expect(reset.rounds).toHaveLength(0);
  });

  it("preserves team names and maxScore", () => {
    const match = createTrucoMatch({ ...baseSetup, teamAName: "Alpha", teamBName: "Beta", maxScore: 24 });
    const reset = resetMatch(match);
    expect(reset.teamA.name).toBe("Alpha");
    expect(reset.teamB.name).toBe("Beta");
    expect(reset.maxScore).toBe(24);
  });

  it("removes finishedAt after reset", () => {
    const finished = { ...createTrucoMatch(baseSetup), finishedAt: "2026-01-01T00:00:00.000Z" };
    const reset = resetMatch(finished);
    expect(reset.finishedAt).toBeUndefined();
  });
});

describe("checkWinner", () => {
  it("returns null when both scores are below maxScore", () => {
    expect(checkWinner(createTrucoMatch(baseSetup))).toBeNull();
  });

  it("returns 'A' when teamA score exactly reaches maxScore", () => {
    const match = addScore(createTrucoMatch(baseSetup), "A", 12);
    expect(checkWinner(match)).toBe("A");
  });

  it("returns 'B' when teamB score exactly reaches maxScore", () => {
    const match = addScore(createTrucoMatch(baseSetup), "B", 12);
    expect(checkWinner(match)).toBe("B");
  });

  it("returns null when scores are non-zero but still below maxScore", () => {
    const match = addScore(addScore(createTrucoMatch(baseSetup), "A", 6), "B", 9);
    expect(checkWinner(match)).toBeNull();
  });
});
