import { describe, expect, it } from "vitest";
import { UNIVERSITIES } from "@/data/extendedData";
import { matchUniversities } from "@/lib/matching";
import type { Profile } from "@/lib/profile";

const profile: Profile = {
  firstName: "Alex",
  lastName: "Morgan",
  country: "Uzbekistan",
  gpa: "3.8",
  gpaScale: "4.0",
  major: "Computer Science",
  regions: ["USA"],
  tests: { IELTS: "8", SAT: "1500" },
  activeTests: ["IELTS", "SAT"],
  noTests: false,
  extracurricular: "Led a national robotics team and published research",
  needsAid: "yes",
  aidTracks: ["full-ride"],
  income: "0-10k",
  difficulty: "1-25",
};

describe("university matching", () => {
  it("ranks a pool larger than 500", () => {
    expect(UNIVERSITIES.length).toBeGreaterThanOrEqual(500);
    expect(matchUniversities(profile).matches.length).toBe(UNIVERSITIES.length);
  });

  it("wires every requested profile factor into the score", () => {
    const baseline = matchUniversities(profile);
    const changed = matchUniversities({
      ...profile,
      gpa: "2.5",
      major: "Law",
      regions: ["Europe"],
      tests: { IELTS: "5.5", SAT: "1000" },
      difficulty: "51-75",
    });
    const first = baseline.matches.find((match) => match.university.id === "mit");
    const second = changed.matches.find((match) => match.university.id === "mit");
    expect(first).toBeDefined();
    expect(second).toBeDefined();
    expect(first?.factors.gpa).not.toBe(second?.factors.gpa);
    expect(first?.factors.tests).not.toBe(second?.factors.tests);
    expect(first?.factors.major).not.toBe(second?.factors.major);
    expect(first?.factors.region).not.toBe(second?.factors.region);
    expect(first?.factors.difficulty).not.toBe(second?.factors.difficulty);
    expect(baseline.matches[0]?.university.id).not.toBe(changed.matches[0]?.university.id);
  });
});