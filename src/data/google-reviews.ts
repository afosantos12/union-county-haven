export type GoogleReview = {
  quote: string;
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
};

export const googleReviews: GoogleReview[] = [
  {
    name: "Adem Kajosaj",
    rating: 5,
    date: "5 months ago",
    quote:
      "I used Michelle David Realty Group when I recently sold my condo and I have to say I was thoroughly impressed with the amount of attention I received throughout the entire process. Always responsive whenever I called or emailed and Michelle was willing to go the extra step in providing answers or info I needed. My wife and I were embraced at the initial office meeting and the conversation was comfortable never forced or rushed. The condo sold quicker than expected and we were more than satisfied with the price we walked away with. I am currently using them for my house purchase and recommend anyone whether selling or buying to look into their services.",
  },
  {
    name: "Tony G",
    rating: 5,
    date: "a year ago",
    quote:
      "I had an excellent experience working with Michelle! She was incredibly helpful, always available to answer my questions, and went above and beyond to ensure the entire process went smoothly. Her expertise and dedication truly stood out. She also made my condo listing look amazing, which brought in a lot of interest quickly. I couldn't have asked for a better broker and highly recommend her to anyone looking to sell their home!",
  },
  {
    name: "Susana Dossantos",
    rating: 5,
    date: "a year ago",
    quote:
      "I had the pleasure of working with Michelle on the sale of my house, she came highly recommended and did not disappoint. She is a true gem, Michelle is very honest and straightforward, her knowledge of the area specifically Kenilworth made the process very easy. Michelle goes above and beyond for her clients; this was my first time selling a house so I had a lot of questions, and she will not sell you false expectations. I highly recommend Michelle to anyone looking to buy or sell their home.",
  },
  {
    name: "Alfredo Salazar Jr",
    rating: 5,
    date: "6 months ago",
    quote:
      "If you're looking for the best realtor you could ever ask for, look no further than Ivelisse Gonzalez. From the very beginning, she went above and beyond to help me find the perfect home even with the difficult tasks, tight deadlines, and unique challenges I brought to the table. Ivelisse's dedication, patience, and genuine care are unmatched. She never gave up, no matter how complicated things got. Instead, she worked tirelessly, guided me through every step, and made sure I always felt supported and informed. Her professionalism, expertise, and determination turned what could have been a stressful process into a smooth and successful experience. Thanks to her hard work, I am now a Home owner!!!. Ivelisse isn't just a great realtor she is the kind of real estate professional everyone hopes to find but rarely does. I'm beyond grateful for everything she did, and I wholeheartedly recommend her to anyone searching for their next home. Thank you Ivelisse I really couldn't have gotten blessed with a better Realtor.",
  },
];

// Update this URL with the firm's exact Google Business Profile review link
export const googleReviewsUrl =
  "https://www.google.com/search?q=Michelle+David+Realty+Group+Kenilworth+NJ";

// Direct link for clients to leave a new review
export const googleLeaveReviewUrl =
  "https://www.google.com/search?q=Michelle+David+Realty+Group+Reviews";
