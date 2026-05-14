/**
 * Public “experience” copy for the About page. Add entries whenever you are ready;
 * leave arrays empty until then—the section still explains what will appear here.
 */

/** Regions, cities, states, countries, or anonymized districts (e.g. “Large urban district, Midwest”). */
export const workLocations: string[] = [];

/** Schools, networks, PD providers, or other collaborators. Optional detail line; optional logo under /public. */
export type PartnerEntry = {
  name: string;
  /** Short context, e.g. role of engagement */
  detail?: string;
  /** Path under public/, e.g. "/logos/partner.svg" */
  logoSrc?: string;
};

export const partners: PartnerEntry[] = [];
