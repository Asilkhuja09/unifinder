const ISO: Record<string, string> = {
  Argentina: "ar",
  Australia: "au",
  Austria: "at",
  Azerbaijan: "az",
  Bangladesh: "bd",
  Belgium: "be",
  Brazil: "br",
  Canada: "ca",
  China: "cn",
  Colombia: "co",
  Denmark: "dk",
  Egypt: "eg",
  Estonia: "ee",
  Finland: "fi",
  France: "fr",
  Georgia: "ge",
  Germany: "de",
  "Hong Kong": "hk",
  India: "in",
  Indonesia: "id",
  Ireland: "ie",
  Italy: "it",
  Japan: "jp",
  Kazakhstan: "kz",
  Kenya: "ke",
  Kyrgyzstan: "kg",
  Malaysia: "my",
  Mexico: "mx",
  Morocco: "ma",
  Netherlands: "nl",
  "New Zealand": "nz",
  Nigeria: "ng",
  Norway: "no",
  Pakistan: "pk",
  Philippines: "ph",
  Poland: "pl",
  Russia: "ru",
  "Saudi Arabia": "sa",
  Singapore: "sg",
  "South Africa": "za",
  "South Korea": "kr",
  Spain: "es",
  Sweden: "se",
  Switzerland: "ch",
  Tajikistan: "tj",
  Thailand: "th",
  Turkey: "tr",
  Türkiye: "tr",
  Turkmenistan: "tm",
  "United Arab Emirates": "ae",
  "United Kingdom": "gb",
  "United States": "us",
  Uzbekistan: "uz",
  Vietnam: "vn",
};

/** ISO-3166 alpha-2 code for a country name, or null when unknown. */
export function countryCode(country: string): string | null {
  return ISO[country] ?? null;
}

/** Unicode regional-indicator flag emoji (used inside native <option> rows). */
export function countryFlagEmoji(country: string): string {
  const code = countryCode(country);
  if (!code) return "🏳️";
  return String.fromCodePoint(
    ...code.toUpperCase().split("").map((c) => 0x1f1a5 + c.charCodeAt(0)),
  );
}

/** High-quality raster flag from flagcdn (crisp, official artwork). */
export function countryFlagUrl(country: string, width: 40 | 80 | 160 | 320 = 80): string | null {
  const code = countryCode(country);
  return code ? `https://flagcdn.com/w${width}/${code}.png` : null;
}
