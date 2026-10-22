/**
 * Model examples written by UniFinder to show what strong activity lists and essay openings look like.
 * They are NOT real applicants and NOT real admission results; the page labels them as examples.
 */
export type ModelStory = {
  id: string;
  field: string;
  profile: string;
  activities: string[];
  excerpt: string;
  whyItWorks: string[];
};

export const STORY_FIELDS = [
  "Computer Science",
  "Engineering",
  "Life Sciences & Medicine",
  "Business & Economics",
  "Humanities & Law",
  "Design & Arts",
] as const;

export const MODEL_STORIES: ModelStory[] = [
  {
    id: "cs-bus-app",
    field: "Computer Science",
    profile: "Model example: applicant to a US research university",
    activities: [
      "Built a free app that tells commuters when the next minibus is full; 1,800 monthly users in one city",
      "Lead organiser of a school coding club: grew from 4 to 31 members, runs weekly Saturday sessions",
      "Regional informatics olympiad, 2nd place; trained two younger students who qualified the next year",
      "Part-time job repairing laptops for a local shop (12 hours a week)",
      "Translated a beginner Python course into the local language with 3 classmates",
    ],
    excerpt:
      "The app broke on its second day. A driver in the app's test group stopped sending locations because his phone had run out of data, and for two hours the map showed a minibus parked in the river. I fixed the bug, but the real fix came later, when I rode that route for a week and saw that nobody was looking at their phones at all. They were watching the road. So I rebuilt the app to talk: one tap on the stop's sign, and a voice says how far away the bus is.",
    whyItWorks: [
      "Opens in a specific moment, not a statement about passion.",
      "Shows the writer changing his approach after watching real users.",
      "Activities list numbers and outcomes instead of titles.",
    ],
  },
  {
    id: "eng-water",
    field: "Engineering",
    profile: "Model example: applicant to a European technical university",
    activities: [
      "Designed and installed a rainwater filter for a village school with a physics teacher; tested water quality monthly for a year",
      "National physics olympiad finalist",
      "Robotics team: responsible for the drive system, wrote the maintenance manual the team still uses",
      "Tutor in maths and physics for 6 younger students",
    ],
    excerpt:
      "The first filter clogged in nine days. I had calculated flow rate carefully and forgotten about leaves. My teacher did not say anything; he handed me a bucket and we spent Saturday taking the whole thing apart. By the third version I stopped drawing the filter first and started with a list of everything that could go wrong.",
    whyItWorks: [
      "Admits a real failure and what it taught, in plain language.",
      "Technical depth appears through a concrete problem, not a list of skills.",
      "The ending shows a change in how the writer works.",
    ],
  },
  {
    id: "bio-grandmother",
    field: "Life Sciences & Medicine",
    profile: "Model example: applicant to a UK medical or biomedical programme",
    activities: [
      "Volunteered 120 hours at a hospital ward, helping patients with forms and directions",
      "Looked after a grandparent with diabetes; learned to read glucose logs and meal plans",
      "School science fair: study on how sleep affects reaction time in 60 classmates",
      "First-aid trainer for students aged 12 to 14",
    ],
    excerpt:
      "My grandmother's glucose log was a column of numbers in blue ink. For months I thought the numbers were the story. Then I noticed the margin, where she had written what she ate and who had visited. The spikes followed the visits. Medicine, I began to see, also happens in the margin.",
    whyItWorks: [
      "A small, precise detail carries the idea.",
      "Clinical hours and care at home are both shown and connected.",
      "The research project is small but honest about its size.",
    ],
  },
  {
    id: "biz-market",
    field: "Business & Economics",
    profile: "Model example: applicant to a business or economics programme",
    activities: [
      "Ran a student-made stationery stall at the school market; tracked every sale in a spreadsheet and reduced waste by 40% over one term",
      "Treasurer of the student council: managed a budget of about $900",
      "Wrote a short analysis of local bread prices over 18 months and presented it to the economics class",
      "Debate club, finalist in the city league",
    ],
    excerpt:
      "I priced the notebooks at 3,000 and sold four. At 2,000 I sold forty. Nobody had told me that the difference between a bad price and a good one could be so loud. I spent the next month going through my sales sheet with the same question: who stopped buying, and why?",
    whyItWorks: [
      "Numbers make a small business story believable.",
      "Curiosity about causes, not only results.",
      "Leadership shown through responsibility, not titles.",
    ],
  },
  {
    id: "law-community",
    field: "Humanities & Law",
    profile: "Model example: applicant to a law or politics programme",
    activities: [
      "Helped neighbours write official letters and complaints in a free Sunday clinic run with a local lawyer",
      "Editor of the school magazine; published a 2,000-word investigation on school canteen contracts",
      "Model UN: best delegate award at a regional conference",
      "Volunteer reader at a children's library",
    ],
    excerpt:
      "Mrs. Karimova brought us a letter from the water company that she had read eleven times. It did not say she owed money. It said, in four different ways, that she might. We sat at the plastic table and rewrote it in plain sentences, and for the first time I understood that language could be a kind of power, and that most of it is kept in forms.",
    whyItWorks: [
      "Real people and a real scene, told with restraint.",
      "The activity list matches the interest in the essay.",
      "The reflection is earned by the story, not announced.",
    ],
  },
  {
    id: "design-signs",
    field: "Design & Arts",
    profile: "Model example: applicant to a design programme",
    activities: [
      "Redesigned the signage of a school with 900 students; tested three versions with new students and measured how long they took to find a room",
      "Portfolio of 14 projects, including a poster series on local dialect words",
      "Assistant in a weekend ceramics studio",
      "Co-founded a school zine, 4 issues, 300 copies each",
    ],
    excerpt:
      "New students were late for the first two weeks every year, and everyone blamed them. I stood by the entrance with a stopwatch and a clipboard instead. The room numbers were fine. The arrows pointed the wrong way for anyone who came in through the side door, which is the door the buses use.",
    whyItWorks: [
      "Design treated as problem solving, backed by a small test.",
      "Specific, observed detail makes the story memorable.",
      "Portfolio items and activities support each other.",
    ],
  },
];
