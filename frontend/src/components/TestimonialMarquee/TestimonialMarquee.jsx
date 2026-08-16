import React from 'react'
import styles from './TestimonialMarquee.module.css'

const reviews = [
  {
    name: "Aditya Sharma",
    username: "@aditya_prop",
    body: "VeltaZ built our WhatsApp lead automation system. We save hours every day now. Brilliant execution!",
    profile: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Priya Patel",
    username: "@priya_design",
    body: "Their customized dashboard integration is lightning-fast. Clean UI work and absolutely zero bugs.",
    profile: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Rohit Mehta",
    username: "@rohit_m",
    body: "Automated our operations sync perfectly. Very tech-savvy team. Perfect communication and delivery.",
    profile: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Sneha Rao",
    username: "@sneha_rao",
    body: "Replaced our manual excel sheets with their automated panel. Operations productivity has increased 2x!",
    profile: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Kunal Gupta",
    username: "@kunal_g",
    body: "Stunning web app UI design and solid backend security. Extremely happy with the custom build.",
    profile: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Divya Shah",
    username: "@divya_shah",
    body: "The team is incredibly fast in execution. They turned our complex user flow into a dead-simple, automated system.",
    profile: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
  }
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
