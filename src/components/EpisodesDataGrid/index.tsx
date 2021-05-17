import Image from 'next/image';

import { Episode } from "../../models/Episode";

import styles from './styles.module.scss';

interface EpisodesDataGridProps {
  episodes: Episode[]
}

export function EpisodesDataGrid({ episodes }: EpisodesDataGridProps) {
  return (
    <table className={styles.datagrid}>
      <thead>
        <th />
        <th>Podcast</th>
        <th>Integrantes</th>
        <th>Data</th>
        <th>Duração</th>
        <th />
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
              <a href="">
                {episode.title}
              </a>
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