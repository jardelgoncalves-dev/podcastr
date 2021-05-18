import Image from 'next/image';
import Link from 'next/link';

import { Episode } from "../../models/Episode";

import styles from './styles.module.scss';

interface EpisodesDataGridProps {
  episodes: Episode[]
}

export function EpisodesDataGrid({ episodes }: EpisodesDataGridProps) {
  return (
    <table className={styles.datagrid}>
      <thead>
        <tr>
          <th />
          <th>Podcast</th>
          <th>Integrantes</th>
          <th>Data</th>
          <th>Duração</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {episodes.map(episode => (
          <tr key={episode.id}>
            <td style={{ width: 72 }}>
              <Image
                src={episode.thumbnail}
                alt={episode.title}
                width={192}
                height={192}
                objectFit="cover"
              />
            </td>
            <td>
              <Link href={`/episodes/${episode.id}`}>
                <a>
                  {episode.title}
                </a>
              </Link>
            </td>
            <td>{episode.members}</td>
            <td style={{ width: 100 }}>{episode.publisedAt}</td>
            <td>{episode.durationAsString}</td>
            <td>
              <button type="button">
                <img src="/play-green.svg" alt="Tocar episódio" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}