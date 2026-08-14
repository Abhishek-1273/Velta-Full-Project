import React from 'react'
import styles from './TestimonialMarquee.module.css'

const reviews = [
  {
    name: "Ken Masters",
    username: "@kmasters",
    body: "Our productivity has nearly doubled since onboarding. Automation features removed repetitive tasks, allowing our team to focus on building instead of managing operations.",
    profile: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Kira Athrun",
    username: "@kathrun",
    body: "What surprised us most was how quickly our team adapted. Minimal learning curve, excellent documentation, and powerful features make it a must-have for modern SaaS companies.",
    profile: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Lirael Nassun",
    username: "@lnassun",
    body: "This is easily one of the most reliable SaaS tools we’ve adopted. The UI is intuitive, integrations are seamless, and it saves us countless hours every week.",
    profile: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Jessica",
    username: "@jessica",
    body: "Switching to this platform streamlined our entire workflow. Setup was effortless, performance improved instantly, and our team now ships features faster without worrying about infrastructure.",
    profile: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "We evaluated multiple solutions, but this stood out immediately. It’s fast, scalable, and thoughtfully designed for growing teams that need stability without added complexity.",
    profile: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Kira Athrun",
    username: "@kathrun",
    body: "What surprised us most was how quickly our team adapted. Minimal learning curve, excellent documentation, and powerful features make it a must-have for modern SaaS companies.",
    profile: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Ken Masters",
    username: "@kmasters",
    body: "Our productivity has nearly doubled since onboarding. Automation features removed repetitive tasks, allowing our team to focus on building instead of managing operations.",
    profile: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
  },
];
const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

// Extend rows to ensure track width is larger than screen size
const extendedFirstRow = [...firstRow, ...firstRow, ...firstRow];
const extendedSecondRow = [...secondRow, ...secondRow, ...secondRow];

const ReviewCard = ({ profile, name, username, body }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img
          className={styles.avatar}
          alt={name}
          src={profile}
        />
        <div className={styles.meta}>
          <span className={styles.name}>{name}</span>
          <span className={styles.username}>{username}</span>
        </div>
      </div>
      <p className={styles.body}>{body}</p>
    </div>
  );
};

export function TestimonialMarquee() {
  return (
    <div className={styles.container}>
      {/* LEFT & RIGHT FADE MASKS */}
      <div className={styles.maskLeft} />
      <div className={styles.maskRight} />

      {/* FIRST ROW - NORMAL */}
      <div className={styles.marquee}>
        <div className={styles.track}>
          {extendedFirstRow.map((review, i) => (
            <ReviewCard key={`row1-${review.username}-${i}`} {...review} />
          ))}
        </div>
        <div className={styles.track} aria-hidden="true">
          {extendedFirstRow.map((review, i) => (
            <ReviewCard key={`row1-clone-${review.username}-${i}`} {...review} />
          ))}
        </div>
      </div>

      {/* SECOND ROW - REVERSED */}
      <div className={styles.marquee}>
        <div className={`${styles.track} ${styles.reverse}`}>
          {extendedSecondRow.map((review, i) => (
            <ReviewCard key={`row2-${review.username}-${i}`} {...review} />
          ))}
        </div>
        <div className={`${styles.track} ${styles.reverse}`} aria-hidden="true">
          {extendedSecondRow.map((review, i) => (
            <ReviewCard key={`row2-clone-${review.username}-${i}`} {...review} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default TestimonialMarquee;
