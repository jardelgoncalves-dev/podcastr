import Image from 'next/image';
import { Episode } from "../../models/Episode";

import styles from './styles.module.scss';

interface ListEpisodeCardProps {
  episodes: Episode[]
}

export function ListEpisodeCard({ episodes }: ListEpisodeCardProps) {
  return (
    <ul className={styles.list}>
      {episodes.map(episode => (
        <li className={styles.card}>
          <Image
            width={192}
            height={192}
            src={episode.thumbnail}
            alt={episode.title}
          />

          <div className={styles.details}>
            <a href="">{episode.title}</a>
            <p>{episode.members}</p>
            <span>{episode.publisedAt}</span>
            <span>{episode.durationAsString}</span>
          </div>
          <button className={styles.playBtn}>
            <img src="/play-green.svg" alt="Tocar episódio" />
          </button>
        </li>
      ))}
    </ul>
  )
}