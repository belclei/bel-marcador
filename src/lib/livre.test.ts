import { describe, expect, it } from "vitest";
import { addLivreRound, checkWinner, createLivreMatch, undoLastRound } from "~/lib/livre";
import type { LivreMatch } from "~/types";

function makeMatch(maxScore = 200): LivreMatch {
  return createLivreMatch({ teamAName: "Nós", teamBName: "Eles", maxScore });
}

describe("createLivreMatch", () => {
  it("sets gameType to livre", () => {
    const m = makeMatch();
    expect(m.gameType).toBe("livre");
  });

  it("uses defaults when names are empty", () => {
    const m = createLivreMatch({ teamAName: "", teamBName: "", maxScore: 100 });
    expect(m.teamA.name).toBe("Nós");
    expect(m.teamB.name).toBe("Eles");
  });

  it("initializes scores to 0 and rounds to empty", () => {
    const m = makeMatch();
    expect(m.teamA.score).toBe(0);
    expect(m.teamB.score).toBe(0);
    expect(m.rounds).toHaveLength(0);
  });
});

describe("addLivreRound", () => {
  it("adds points to both teams", () => {
    const m = makeMatch();
    const updated = addLivreRound(m, 100, 50);
    expect(updated.teamA.score).toBe(100);
    expect(updated.teamB.score).toBe(50);
  });

  it("accumulates across rounds", () => {
    const m = makeMatch();
    const m1 = addLivreRound(m, 100, 50);
    const m2 = addLivreRound(m1, 50, 75);
    expect(m2.teamA.score).toBe(150);
    expect(m2.teamB.score).toBe(125);
  });

  it("caps scores at maxScore", () => {
    const m = makeMatch(100);
    const updated = addLivreRound(m, 150, 200);
    expect(updated.teamA.score).toBe(100);
    expect(updated.teamB.score).toBe(100);
  });

  it("stores cumulative scores in round", () => {
    const m = makeMatch();
    const m1 = addLivreRound(m, 100, 50);
    const m2 = addLivreRound(m1, 30, 20);
    expect(m2.rounds[1].teamAScore).toBe(130);
    expect(m2.rounds[1].teamBScore).toBe(70);
  });

  it("does not mutate the original match", () => {
    const m = makeMatch();
    addLivreRound(m, 100, 50);
    expect(m.teamA.score).toBe(0);
  });
});

describe("checkWinner", () => {
  it("returns null when no team has reached maxScore", () => {
    const m = addLivreRound(makeMatch(200), 50, 50);
    expect(checkWinner(m)).toBeNull();
  });

  it("returns A when teamA reaches maxScore", () => {
    const m = addLivreRound(makeMatch(100), 100, 50);
    expect(checkWinner(m)).toBe("A");
  });

  it("returns B when teamB reaches maxScore", () => {
    const m = addLivreRound(makeMatch(100), 50, 100);
    expect(checkWinner(m)).toBe("B");
  });
});

describe("undoLastRound", () => {
  it("returns match unchanged when no rounds", () => {
    const m = makeMatch();
    expect(undoLastRound(m)).toEqual(m);
  });

  it("marks last round as undone and resets scores", () => {
    const m = addLivreRound(addLivreRound(makeMatch(), 100, 50), 30, 20);
    const undone = undoLastRound(m);
    expect(undone.rounds[1].undone).toBe(true);
    expect(undone.teamA.score).toBe(100);
    expect(undone.teamB.score).toBe(50);
  });

  it("skips already-undone rounds", () => {
    const m1 = addLivreRound(addLivreRound(makeMatch(), 100, 50), 30, 20);
    const m2 = undoLastRound(m1);
    const m3 = undoLastRound(m2);
    expect(m3.rounds[0].undone).toBe(true);
    expect(m3.teamA.score).toBe(0);
    expect(m3.teamB.score).toBe(0);
  });

  it("returns to zero scores when all rounds undone", () => {
    const m = addLivreRound(makeMatch(), 100, 50);
    const undone = undoLastRound(m);
    expect(undone.teamA.score).toBe(0);
    expect(undone.teamB.score).toBe(0);
  });
});
