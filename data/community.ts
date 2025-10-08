// ====================================================================
// --- DATA AND TYPES (Simulates data/community.ts)
// ====================================================================

/** Defines the structure for a single community space. */
export interface CommunitySpace {
  slug: string;
  name: string;
  iconSvg: string; // SVG icon for display
  description: string;
  content: string[]; // Joining instructions + active spaces
}

/** Global Type for managing application state/routing for the community app. */
export type CommunityPage = 'community_home' | CommunitySpace['slug'];

/** Community Data */
export const COMMUNITY_SPACES: CommunitySpace[] = [
  { 
    slug: 'forum', 
    name: 'Forum / Discussion Board', 
    iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>', 
    description: 'Q&A, guides, and project showcases.', 
    content: ['Joining Instructions: Registration Link: p2p.forum/register (Email verification required)', 'Active Spaces: General Q&A, Development Guides, Show Your Project (Community-run)'] 
  },
  { 
    slug: 'discord', 
    name: 'Discord / Slack Group', 
    iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3L10 18M14 3L14 18M19 12a7 7 0 0 1-14 0c0-3.8 2.5-7 5-7h4c2.5 0 5 3.2 5 7z"></path><path d="M12 21.5V18M12 3V0.5M4.5 15.5L2 18M19.5 15.5L22 18"></path></svg>', 
    description: 'Live discussions and real-time announcements.', 
    content: ['Joining Instructions: Permanent Invite Link: discord.gg/p2pclouds (Requires accepting server rules)', 'Active Spaces: #announcements, #live-support (Mon-Fri 9-5 UTC), #off-topic'] 
  },
  { 
    slug: 'hackathons', 
    name: 'Hackathons & Challenges', 
    iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 11.25V9m0 3.75V15m0 3.75V21M3 9.75H21M3 14.25H21M12 3.75L21 9V15L12 21L3 15V9L12 3.75Z" stroke-linecap="round" stroke-linejoin="round" /></svg>', 
    description: 'Competitions, leaderboards, and badges.', 
    content: ['Joining Instructions: Sign up required on p2p.cloud/challenges (Check eligibility rules)', 'Active Spaces: Latest Challenge: Storage Optimization Challenge Q3, Leaderboard Link: p2p.cloud/leaderboard'] 
  },
];