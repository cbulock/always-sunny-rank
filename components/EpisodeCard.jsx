import styles from "../styles/EpisodeCard.module.scss";

import { Overpass } from "@next/font/google";
const overpass = Overpass({ subsets: ["latin"] });

import Image from "next/image";

const characterRanks = ["charlie", "mac", "dennis", "dee", "frank"];

const EpisodeCard = ({
  episode: { episode_number: episode, name, season_number: season },
  rank,
}) => (
  <div className={styles.card}>
    <div>
      {rank <= 5 && (
        <div className={styles.characterRank}>
          <Image
            src={`/images/${characterRanks[rank - 1]}.png`}
            alt={rank}
            width={71}
            height={100}
            className={styles.image}
          />
          <p className={`${styles.number} ${overpass.className}`}>{rank}</p>
        </div>
      )}
      {rank > 5 && <p>{rank}</p>}
    </div>
    <h1>{name}</h1>
    <div
      className={`${styles.episode} ${overpass.className}`}
    >{`S${season}E${episode}`}</div>
  </div>
);

export default EpisodeCard;
