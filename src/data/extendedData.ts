export type Region =
  | "USA"
  | "UK"
  | "Canada"
  | "Europe"
  | "Germany"
  | "China"
  | "Asia"
  | "Oceania";

export const REGIONS: Region[] = [
  "USA",
  "UK",
  "Canada",
  "Europe",
  "Germany",
  "China",
  "Asia",
  "Oceania",
];

export type DifficultyTier = "1-25" | "26-50" | "51-75" | "76-100";

export const DIFFICULTY_TIERS: { id: DifficultyTier; label: string; note: string }[] = [
  { id: "1-25", label: "1% – 25%", note: "Ultra-Elite" },
  { id: "26-50", label: "26% – 50%", note: "Highly Competitive" },
  { id: "51-75", label: "51% – 75%", note: "Target" },
  { id: "76-100", label: "76% – 100%", note: "Accessible" },
];

export type University = {
  id: string;
  name: string;
  city: string;
  country: string;
  region: Region;
  founded: number;
  acceptanceRate: number; // percent
  tuitionUSD: number;
  aidForInternationals: boolean;
  strengths: string[];
  description: string;
  website: string;
  mapsQuery: string;
};

export const UNIVERSITIES: University[] = [
  {
    id: "harvard",
    name: "Harvard University",
    city: "Cambridge, Massachusetts",
    country: "United States",
    region: "USA",
    founded: 1636,
    acceptanceRate: 3.6,
    tuitionUSD: 56550,
    aidForInternationals: true,
    strengths: ["Law", "Economics", "Medicine", "Political Science"],
    description:
      "The oldest institution of higher learning in the United States, founded in 1636. Harvard practises need-blind admission for international applicants and meets 100% of demonstrated financial need without loans.",
    website: "https://www.harvard.edu",
    mapsQuery: "Harvard University, Cambridge, MA 02138, USA",
  },
  {
    id: "mit",
    name: "Massachusetts Institute of Technology",
    city: "Cambridge, Massachusetts",
    country: "United States",
    region: "USA",
    founded: 1861,
    acceptanceRate: 4.5,
    tuitionUSD: 60156,
    aidForInternationals: true,
    strengths: ["Engineering", "Computer Science", "Physics", "Mathematics"],
    description:
      "A research university founded in 1861 and organised around five schools. MIT is need-blind for all applicants, including international students, and awards aid purely on demonstrated need.",
    website: "https://www.mit.edu",
    mapsQuery: "Massachusetts Institute of Technology, 77 Massachusetts Ave, Cambridge, MA",
  },
  {
    id: "stanford",
    name: "Stanford University",
    city: "Stanford, California",
    country: "United States",
    region: "USA",
    founded: 1885,
    acceptanceRate: 3.9,
    tuitionUSD: 62484,
    aidForInternationals: true,
    strengths: ["Computer Science", "Business", "Engineering", "Entrepreneurship"],
    description:
      "Founded in 1885 in the heart of Silicon Valley, Stanford hosts the Knight-Hennessy Scholars programme and offers need-based aid to international undergraduates.",
    website: "https://www.stanford.edu",
    mapsQuery: "Stanford University, 450 Jane Stanford Way, Stanford, CA 94305",
  },
  {
    id: "oxford",
    name: "University of Oxford",
    city: "Oxford",
    country: "United Kingdom",
    region: "UK",
    founded: 1096,
    acceptanceRate: 17.5,
    tuitionUSD: 45000,
    aidForInternationals: true,
    strengths: ["Philosophy", "Politics", "Law", "Medicine"],
    description:
      "Teaching existed at Oxford in some form from 1096, making it the oldest university in the English-speaking world. Its collegiate tutorial system and the Rhodes and Clarendon scholarships serve international students.",
    website: "https://www.ox.ac.uk",
    mapsQuery: "University of Oxford, Wellington Square, Oxford OX1 2JD, UK",
  },
  {
    id: "ucl",
    name: "University College London",
    city: "London",
    country: "United Kingdom",
    region: "UK",
    founded: 1826,
    acceptanceRate: 32,
    tuitionUSD: 38000,
    aidForInternationals: true,
    strengths: ["Architecture", "Neuroscience", "Economics", "Education"],
    description:
      "Founded in 1826 as the first university in London and the first in England to admit students of any religion, UCL is a member of the Russell Group with strong global research output.",
    website: "https://www.ucl.ac.uk",
    mapsQuery: "University College London, Gower Street, London WC1E 6BT, UK",
  },
  {
    id: "toronto",
    name: "University of Toronto",
    city: "Toronto, Ontario",
    country: "Canada",
    region: "Canada",
    founded: 1827,
    acceptanceRate: 43,
    tuitionUSD: 45900,
    aidForInternationals: true,
    strengths: ["Computer Science", "Medicine", "Artificial Intelligence"],
    description:
      "Established in 1827, U of T is Canada's largest research university and the birthplace of insulin and modern deep-learning research. The Lester B. Pearson Scholarship fully funds international undergraduates.",
    website: "https://www.utoronto.ca",
    mapsQuery: "University of Toronto, 27 King's College Circle, Toronto, ON",
  },
  {
    id: "ubc",
    name: "University of British Columbia",
    city: "Vancouver, British Columbia",
    country: "Canada",
    region: "Canada",
    founded: 1908,
    acceptanceRate: 52,
    tuitionUSD: 43000,
    aidForInternationals: true,
    strengths: ["Forestry", "Earth Sciences", "Business", "Engineering"],
    description:
      "Founded in 1908, UBC runs the International Scholars Programs, which include the Karen McKellin International Leader of Tomorrow Award covering full need for international undergraduates.",
    website: "https://www.ubc.ca",
    mapsQuery: "University of British Columbia, 2329 West Mall, Vancouver, BC",
  },
  {
    id: "tum",
    name: "Technical University of Munich",
    city: "Munich",
    country: "Germany",
    region: "Germany",
    founded: 1868,
    acceptanceRate: 60,
    tuitionUSD: 6000,
    aidForInternationals: true,
    strengths: ["Mechanical Engineering", "Informatics", "Physics"],
    description:
      "Founded in 1868, TUM is a German Universities of Excellence institution. Tuition for most programmes is limited to modest semester fees, with additional support available through DAAD.",
    website: "https://www.tum.de",
    mapsQuery: "Technical University of Munich, Arcisstraße 21, 80333 München, Germany",
  },
  {
    id: "heidelberg",
    name: "Heidelberg University",
    city: "Heidelberg",
    country: "Germany",
    region: "Germany",
    founded: 1386,
    acceptanceRate: 70,
    tuitionUSD: 3500,
    aidForInternationals: true,
    strengths: ["Medicine", "Life Sciences", "Philosophy", "Law"],
    description:
      "Germany's oldest university, founded in 1386. Baden-Württemberg charges a modest fee for non-EU students, and DAAD funding is widely used by international scholars here.",
    website: "https://www.uni-heidelberg.de",
    mapsQuery: "Heidelberg University, Grabengasse 1, 69117 Heidelberg, Germany",
  },
  {
    id: "ethz",
    name: "ETH Zurich",
    city: "Zurich",
    country: "Switzerland",
    region: "Europe",
    founded: 1855,
    acceptanceRate: 27,
    tuitionUSD: 1600,
    aidForInternationals: true,
    strengths: ["Engineering", "Computer Science", "Architecture", "Chemistry"],
    description:
      "Founded in 1855 as the Swiss Federal Polytechnic, ETH Zurich counts 20+ Nobel laureates among its affiliates and charges famously low public tuition.",
    website: "https://ethz.ch",
    mapsQuery: "ETH Zurich, Rämistrasse 101, 8092 Zürich, Switzerland",
  },
  {
    id: "bocconi",
    name: "Bocconi University",
    city: "Milan",
    country: "Italy",
    region: "Europe",
    founded: 1902,
    acceptanceRate: 45,
    tuitionUSD: 17000,
    aidForInternationals: true,
    strengths: ["Economics", "Finance", "Management", "Data Science"],
    description:
      "Founded in 1902 as Italy's first university to grant a degree in economics. Bocconi awards merit-based tuition waivers and full scholarships to top international applicants.",
    website: "https://www.unibocconi.eu",
    mapsQuery: "Bocconi University, Via Roberto Sarfatti 25, 20136 Milano, Italy",
  },
  {
    id: "tsinghua",
    name: "Tsinghua University",
    city: "Beijing",
    country: "China",
    region: "China",
    founded: 1911,
    acceptanceRate: 20,
    tuitionUSD: 5000,
    aidForInternationals: true,
    strengths: ["Engineering", "Architecture", "Public Policy", "Computer Science"],
    description:
      "Founded in 1911 on the former Qing dynasty royal gardens. Tsinghua hosts the Schwarzman Scholars programme and is a primary destination for Chinese Government Scholarship (CSC) recipients.",
    website: "https://www.tsinghua.edu.cn/en/",
    mapsQuery: "Tsinghua University, 30 Shuangqing Rd, Haidian District, Beijing, China",
  },
  {
    id: "peking",
    name: "Peking University",
    city: "Beijing",
    country: "China",
    region: "China",
    founded: 1898,
    acceptanceRate: 25,
    tuitionUSD: 4600,
    aidForInternationals: true,
    strengths: ["Chinese Studies", "Economics", "Law", "Physics"],
    description:
      "Established in 1898 as the Imperial University of Peking, it is China's first modern national university and a major CSC and Yenching Academy host institution.",
    website: "https://english.pku.edu.cn",
    mapsQuery: "Peking University, 5 Yiheyuan Rd, Haidian District, Beijing, China",
  },
  {
    id: "tokyo",
    name: "The University of Tokyo",
    city: "Tokyo",
    country: "Japan",
    region: "Asia",
    founded: 1877,
    acceptanceRate: 34,
    tuitionUSD: 4800,
    aidForInternationals: true,
    strengths: ["Physics", "Engineering", "Law", "Medicine"],
    description:
      "Founded in 1877, the University of Tokyo is Japan's leading research university and the main destination for MEXT scholarship students in the PEAK and global programmes.",
    website: "https://www.u-tokyo.ac.jp/en/",
    mapsQuery: "University of Tokyo, 7-3-1 Hongo, Bunkyo City, Tokyo, Japan",
  },
  {
    id: "nus",
    name: "National University of Singapore",
    city: "Singapore",
    country: "Singapore",
    region: "Asia",
    founded: 1905,
    acceptanceRate: 30,
    tuitionUSD: 29000,
    aidForInternationals: true,
    strengths: ["Computer Science", "Business", "Engineering", "Public Health"],
    description:
      "Founded in 1905 as a medical school, NUS is Singapore's flagship university and offers the ASEAN Undergraduate Scholarship and Science & Technology Undergraduate Scholarship to internationals.",
    website: "https://www.nus.edu.sg",
    mapsQuery: "National University of Singapore, 21 Lower Kent Ridge Rd, Singapore",
  },
  {
    id: "seoul",
    name: "Seoul National University",
    city: "Seoul",
    country: "South Korea",
    region: "Asia",
    founded: 1946,
    acceptanceRate: 55,
    tuitionUSD: 6000,
    aidForInternationals: true,
    strengths: ["Engineering", "Business", "Korean Studies", "Materials Science"],
    description:
      "Established in 1946 as Korea's first national university. SNU participates in the Global Korea Scholarship (GKS), which covers tuition, airfare and living stipends.",
    website: "https://en.snu.ac.kr",
    mapsQuery: "Seoul National University, 1 Gwanak-ro, Gwanak-gu, Seoul, South Korea",
  },
  {
    id: "melbourne",
    name: "University of Melbourne",
    city: "Melbourne, Victoria",
    country: "Australia",
    region: "Oceania",
    founded: 1853,
    acceptanceRate: 70,
    tuitionUSD: 33000,
    aidForInternationals: true,
    strengths: ["Medicine", "Law", "Arts", "Environmental Science"],
    description:
      "Founded in 1853, Melbourne is Australia's second-oldest university and offers the Melbourne International Undergraduate Scholarship as well as Australia Awards placements.",
    website: "https://www.unimelb.edu.au",
    mapsQuery: "University of Melbourne, Parkville VIC 3010, Australia",
  },
  {
    id: "auckland",
    name: "University of Auckland",
    city: "Auckland",
    country: "New Zealand",
    region: "Oceania",
    founded: 1883,
    acceptanceRate: 78,
    tuitionUSD: 27000,
    aidForInternationals: true,
    strengths: ["Marine Science", "Engineering", "Business", "Education"],
    description:
      "Founded in 1883, Auckland is New Zealand's largest university and administers the University of Auckland International Student Excellence Scholarship.",
    website: "https://www.auckland.ac.nz",
    mapsQuery: "University of Auckland, 22 Princes Street, Auckland, New Zealand",
  },
  {
    id: "asu",
    name: "Arizona State University",
    city: "Tempe, Arizona",
    country: "United States",
    region: "USA",
    founded: 1885,
    acceptanceRate: 88,
    tuitionUSD: 33000,
    aidForInternationals: true,
    strengths: ["Sustainability", "Business", "Journalism", "Engineering"],
    description:
      "Founded in 1885, ASU is one of the largest public universities in the United States and awards automatic merit scholarships to qualifying international freshmen.",
    website: "https://www.asu.edu",
    mapsQuery: "Arizona State University, 1151 S Forest Ave, Tempe, AZ 85281",
  },
  {
    id: "warsaw",
    name: "University of Warsaw",
    city: "Warsaw",
    country: "Poland",
    region: "Europe",
    founded: 1816,
    acceptanceRate: 65,
    tuitionUSD: 4500,
    aidForInternationals: true,
    strengths: ["Mathematics", "Computer Science", "Political Science"],
    description:
      "Founded in 1816, the University of Warsaw is Poland's largest university, known for its world-champion competitive programming teams and low-cost English-taught programmes.",
    website: "https://en.uw.edu.pl",
    mapsQuery: "University of Warsaw, Krakowskie Przedmieście 26/28, Warsaw, Poland",
  },
];

export type Scholarship = {
  id: string;
  name: string;
  sponsor: string;
  region: Region;
  coverage: string;
  deadline: string;
  description: string;
  website: string;
  needBased: boolean;
};

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: "daad",
    name: "DAAD Study Scholarships",
    sponsor: "German Academic Exchange Service",
    region: "Germany",
    coverage: "Monthly stipend (€934+), travel, health insurance, study allowance",
    deadline: "Varies by programme (typically Oct–Dec)",
    description:
      "The DAAD is the world's largest funding organisation for international academic exchange, financed largely by the German Federal Foreign Office. Its study scholarships fund postgraduate degrees at German universities.",
    website: "https://www.daad.de/en/",
    needBased: false,
  },
  {
    id: "mext",
    name: "MEXT Japanese Government Scholarship",
    sponsor: "Ministry of Education, Culture, Sports, Science and Technology (Japan)",
    region: "Asia",
    coverage: "Full tuition, monthly stipend, round-trip airfare",
    deadline: "Embassy track: April–May annually",
    description:
      "Offered by the Japanese government since 1954 through embassies and universities, MEXT funds undergraduate, research and specialised training students with full tuition and a living allowance.",
    website: "https://www.studyinjapan.go.jp/en/",
    needBased: false,
  },
  {
    id: "csc",
    name: "Chinese Government Scholarship (CSC)",
    sponsor: "China Scholarship Council",
    region: "China",
    coverage: "Tuition, campus accommodation, monthly stipend, medical insurance",
    deadline: "January–April annually",
    description:
      "Administered by the China Scholarship Council, the CSC supports international students at designated Chinese universities across bachelor, master and doctoral levels.",
    website: "https://www.campuschina.org",
    needBased: false,
  },
  {
    id: "fulbright",
    name: "Fulbright Foreign Student Program",
    sponsor: "U.S. Department of State",
    region: "USA",
    coverage: "Tuition, living stipend, airfare, accident & sickness benefit",
    deadline: "Country-specific, typically Feb–Oct",
    description:
      "Established in 1946 under legislation introduced by Senator J. William Fulbright, this flagship exchange programme funds graduate study and research in the United States for students from over 155 countries.",
    website: "https://foreign.fulbrightonline.org",
    needBased: false,
  },
  {
    id: "knight-hennessy",
    name: "Knight-Hennessy Scholars",
    sponsor: "Stanford University",
    region: "USA",
    coverage: "Full tuition, living and academic stipend, travel allowance",
    deadline: "October annually",
    description:
      "Launched in 2018 with a founding gift from Phil Knight and led initially by John Hennessy, this programme funds up to 100 graduate students per year across every Stanford school.",
    website: "https://knight-hennessy.stanford.edu",
    needBased: false,
  },
  {
    id: "chevening",
    name: "Chevening Scholarships",
    sponsor: "UK Foreign, Commonwealth & Development Office",
    region: "UK",
    coverage: "Full tuition for a one-year master's, living stipend, flights",
    deadline: "Early November annually",
    description:
      "The UK government's international awards programme, running since 1983, funds one-year master's degrees for emerging leaders at any UK university.",
    website: "https://www.chevening.org",
    needBased: false,
  },
  {
    id: "erasmus",
    name: "Erasmus Mundus Joint Masters",
    sponsor: "European Commission",
    region: "Europe",
    coverage: "Tuition, monthly allowance, travel and installation costs",
    deadline: "Programme-specific, typically Dec–Jan",
    description:
      "EU-funded integrated master's programmes delivered by consortia of European universities, with mobility across at least two countries and full scholarship packages.",
    website: "https://erasmus-plus.ec.europa.eu",
    needBased: false,
  },
  {
    id: "gks",
    name: "Global Korea Scholarship (GKS)",
    sponsor: "National Institute for International Education, Korea",
    region: "Asia",
    coverage: "Tuition, Korean language training, monthly allowance, airfare",
    deadline: "February–March annually",
    description:
      "Formerly the Korean Government Scholarship Program, GKS funds undergraduate and graduate study in Korea including a preparatory year of language training.",
    website: "https://www.studyinkorea.go.kr",
    needBased: false,
  },
  {
    id: "pearson",
    name: "Lester B. Pearson International Scholarship",
    sponsor: "University of Toronto",
    region: "Canada",
    coverage: "Full tuition, books, incidental fees and residence for four years",
    deadline: "November (school nomination) / January",
    description:
      "Toronto's flagship award for exceptional international students, covering the entire cost of four years of undergraduate study.",
    website: "https://future.utoronto.ca/pearson/",
    needBased: false,
  },
  {
    id: "australia-awards",
    name: "Australia Awards Scholarships",
    sponsor: "Australian Government (DFAT)",
    region: "Oceania",
    coverage: "Full tuition, return air travel, establishment allowance, living stipend",
    deadline: "February–April annually",
    description:
      "Long-term development awards funded by Australia's foreign affairs department for students from partner countries across Asia, the Pacific and Africa.",
    website: "https://www.dfat.gov.au/people-to-people/australia-awards",
    needBased: true,
  },
];

export const MAJORS: string[] = [
  "Accounting",
  "Aerospace Engineering",
  "Agricultural Science",
  "Anthropology",
  "Applied Mathematics",
  "Architecture",
  "Artificial Intelligence",
  "Biochemistry",
  "Biomedical Engineering",
  "Biotechnology",
  "Business Administration",
  "Chemical Engineering",
  "Chemistry",
  "Civil Engineering",
  "Computer Science",
  "Cybersecurity",
  "Data Science",
  "Dentistry",
  "Economics",
  "Education",
  "Electrical Engineering",
  "Environmental Science",
  "Finance",
  "Genetics",
  "Geology",
  "Graphic Design",
  "History",
  "Hospitality Management",
  "Industrial Design",
  "International Relations",
  "Journalism",
  "Law",
  "Linguistics",
  "Marine Biology",
  "Marketing",
  "Materials Science",
  "Mathematics",
  "Mechanical Engineering",
  "Medicine",
  "Music",
  "Neuroscience",
  "Nursing",
  "Pharmacy",
  "Philosophy",
  "Physics",
  "Political Science",
  "Psychology",
  "Public Health",
  "Robotics",
  "Sociology",
  "Software Engineering",
  "Statistics",
  "Supply Chain Management",
  "Urban Planning",
  "Veterinary Medicine",
];

export const COUNTRIES: string[] = [
  "Uzbekistan",
  "Kazakhstan",
  "Kyrgyzstan",
  "Tajikistan",
  "Turkmenistan",
  "Russia",
  "Turkey",
  "Azerbaijan",
  "Georgia",
  "India",
  "Pakistan",
  "Bangladesh",
  "China",
  "Japan",
  "South Korea",
  "Indonesia",
  "Vietnam",
  "Philippines",
  "Egypt",
  "Morocco",
  "Nigeria",
  "Kenya",
  "South Africa",
  "Brazil",
  "Mexico",
  "Argentina",
  "Colombia",
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Poland",
  "Netherlands",
  "Sweden",
  "Australia",
  "New Zealand",
  "Saudi Arabia",
  "United Arab Emirates",
];

export const GPA_SCALES: { id: string; label: string; max: number }[] = [
  { id: "4.0", label: "4.0 scale (USA / Canada)", max: 4 },
  { id: "5.0", label: "5.0 scale (Uzbekistan / CIS)", max: 5 },
  { id: "10.0", label: "10.0 scale (India / Spain)", max: 10 },
  { id: "100", label: "100-point scale (China / Turkey)", max: 100 },
  { id: "1.0-de", label: "1.0–6.0 German scale", max: 6 },
  { id: "uk-hons", label: "UK Honours classification", max: 100 },
];

export const TESTS = ["IELTS", "TOEFL", "Duolingo", "SAT"] as const;
export type TestName = (typeof TESTS)[number];

export const TEST_RANGES: Record<TestName, string> = {
  IELTS: "Band 0.0 – 9.0",
  TOEFL: "0 – 120",
  Duolingo: "10 – 160",
  SAT: "400 – 1600",
};

export const INCOME_BRACKETS = [
  { id: "0-10k", label: "$0 – $10,000" },
  { id: "10-25k", label: "$10,000 – $25,000" },
  { id: "25k+", label: "$25,000+" },
];

export const AID_TRACKS = [
  {
    id: "full-ride",
    title: "International Full-Ride",
    detail:
      "Awards covering tuition, housing and living costs in full: Lester B. Pearson (Toronto), MEXT (Japan), CSC (China), GKS (Korea).",
  },
  {
    id: "merit",
    title: "Merit-Based Awards",
    detail:
      "Partial to full tuition waivers granted on academic record, testing and leadership: Bocconi merit awards, ASU New American University awards, Melbourne International Undergraduate Scholarship.",
  },
  {
    id: "sovereign",
    title: "Sovereign & Government Grants",
    detail:
      "State-funded diplomatic scholarship tracks: Fulbright (USA), Chevening (UK), DAAD (Germany), Erasmus Mundus (EU), Australia Awards (Australia).",
  },
];

export function tierFromRate(rate: number): DifficultyTier {
  if (rate <= 25) return "1-25";
  if (rate <= 50) return "26-50";
  if (rate <= 75) return "51-75";
  return "76-100";
}