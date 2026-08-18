/**
 * Convert an ISO 3166-1 alpha-2 country code (e.g. "TR", "us") to its flag emoji
 * via regional indicator symbols. Returns `""` when the code is not a real
 * country code (e.g. a language code like "en"), so callers can fall back.
 *
 *   iso2ToFlagEmoji("tr") // 🇹🇷
 *   iso2ToFlagEmoji("en") // ""  (not a country)
 *   iso2ToFlagEmoji("")   // ""
 */
const ISO3166 = new Set(
  `AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ
  CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR
  GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO
  JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR
  MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO
  RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV
  TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW`.split(/\s+/),
);

export function iso2ToFlagEmoji(code: string): string {
  const upper = code.toUpperCase();
  if (ISO3166.has(upper)) {
    return String.fromCodePoint(0x1f1e6 + upper.charCodeAt(0) - 65, 0x1f1e6 + upper.charCodeAt(1) - 65);
  }
  return "";
}