import { Episode } from "types";

const data: Array<Episode> = [
  {
    //audioUrl: `https://docs.google.com/uc?export=download&id=1-YGtf9crGBypUoB-tFkQHLjlorCukp2v`,
    //audioUrl: `https://docs.google.com/uc?export=download&id=0B10YzQnkmnnJajBRYVNaaGhrSHM`,
    audioUrl: `${process.env.PUBLIC_URL}/Ep_p.mp3`,
    description:
      "Your boys Dj Toonz, R1 and Goggles take on the world with first ever episode of the Yhardiknow Podcast. Get to know the homies and hopefully there's going to be many more to come. ",
    episodeName: "Pilot Episode",
    date: "Sunday, January 5th 2020",
    imageUrl: "ep_p.png",
  },
  {
    //audioUrl: `https://docs.google.com/uc?export=download&id=18UqauY7Q5hiZM-3NDRNHnY-vm7bRa8eb`,
    //audioUrl: `https://docs.google.com/uc?export=download&id=0B10YzQnkmnnJRWw4elNXaUJWek0`,
    audioUrl: `${process.env.PUBLIC_URL}/Ep_1.mp3`,
    description:
      "And we're back! Episode 1 kicks off with new segments including PORC (Pop Off On Recent Content) and the Ep. to Ep. challenges. Listen in as we reminisce on our youths when we were yutes.",
    episodeName: "Throwback Thursdays",
    date: "Thursday, January 23 2020",
    imageUrl: "ep_1.png",
  },
  {
    //audioUrl: `https://docs.google.com/uc?export=download&id=1EcWo9ChLNGYLdutharHBhXpBQ7gaHk2q`, //real
    //audioUrl:"https://docs.google.com/uc?export=download&id=0B10YzQnkmnnJOUJoaS1HMnlhSmc",
    audioUrl: `${process.env.PUBLIC_URL}/Ep_2.mp3`,
    description:
      ' *Disclaimer: the PORC segment on COVID-19 was included and discussed much before any of the quarantining measures were enacted. Apologies for discussion points that may sound outdated or irrelevant. We were told not to make an episode on style. We did it anyways. This episode features some tasty PORC, discussions on how much style we did not have and the much awaited "H" ',
    episodeName: "Style for Days",
    date: "Monday, March 9 2020",
    imageUrl: "ep_2.png",
  },
];

export default data;
