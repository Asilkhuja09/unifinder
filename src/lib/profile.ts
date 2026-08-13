import type { DifficultyTier, Region, TestName } from "@/data/extendedData";

export type Profile = {
  firstName: string;
  lastName: string;
  country: string;
  gpa: string;
  gpaScale: string;
  major: string;
  regions: Region[];
  tests: Partial<Record<TestName, string>>;
  activeTests: TestName[];
  /** user has no standardized test scores yet */
  noTests: boolean;
  extracurricular: string;
  needsAid: "yes" | "no" | "";
  aidTracks: string[];
  income: string;
  difficulty: DifficultyTier | "";
};

export const emptyProfile: Profile = {
  firstName: "",
  lastName: "",
  country: "",
  gpa: "",
  gpaScale: "",
  major: "",
  regions: [],
  tests: {},
  activeTests: [],
  noTests: false,
  extracurricular: "",
  needsAid: "",
  aidTracks: [],
  income: "",
  difficulty: "",
};