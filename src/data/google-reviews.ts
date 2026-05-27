// Real Google reviews for Michelle David Realty Group.
//
// IMPORTANT: This file is intentionally empty until verified reviews are
// pasted in from the firm's Google Business Profile. Do not add invented or
// AI-written testimonials here. To populate, paste reviews exactly as they
// appear on Google, including reviewer name and date.
//
// Each entry should match the GoogleReview shape below.

export type GoogleReview = {
  /** Full quote text exactly as left on Google. */
  quote: string;
  /** Reviewer display name as shown on Google. */
  name: string;
  /** Star rating, 1-5. */
  rating: 1 | 2 | 3 | 4 | 5;
  /** Relative or absolute date string ("3 months ago", "Jan 2025"). */
  date: string;
};

export const googleReviews: GoogleReview[] = [];

/** URL to the firm's Google Business Profile reviews page. Update when published. */
export const googleReviewsUrl =
  "https://www.google.com/search?q=Michelle+David+Realty+Group+Union+County+NJ+reviews";
