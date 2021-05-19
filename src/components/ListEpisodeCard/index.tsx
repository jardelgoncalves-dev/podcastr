import Image from 'next/image';
import Link from 'next/link';
import { Episode } from "../../models/Episode";

import styles from './styles.module.scss';

interface ListEpisodeCardProps {
  episodes: Episode[]
  play: (episode: Episode) => void
}

export function ListEpisodeCard({ episodes, play }: ListEpisodeCardProps) {
  return (
    <ul className={styles.list}>
      {episodes.map(episode => (
        <li className={styles.card} key={episode.id}>
          <Image
            width={192}
            height={192}
            src={episode.thumbnail}
            alt={episode.title}
          />

          <div className={styles.details}>
              <Link href={`/episodes/${episode.id}`}>
                <a>
                  {episode.title}
                </a>
              </Link>
            <p>{episode.members}</p>
            <span>{episode.publisedAt}</span>
            <span>{episode.durationAsString}</span>
          </div>
          <button className={styles.playBtn} onClick={() => play(episode)}>
            <img src="/play-green.svg" alt="Tocar episódio" />
          </button>
        </li>
      ))}
    </ul>
  )
}