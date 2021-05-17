import { GetStaticProps } from 'next'
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '../services/api';
import { convertDurationToTimeString } from '../utils/convert-duration-to-time-string';
import { Episode } from '../models/Episode';

import styles from './homepage.module.scss';
import { ListEpisodeCard } from '../components/ListEpisodeCard';
import { EpisodesDataGrid } from '../components/EpisodesDataGrid';



interface HomeProps {
  latestEpisodes: Episode[]
  allEpisodes: Episode[]
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>
        <ListEpisodeCard episodes={latestEpisodes} />
      </section>
      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>
        <EpisodesDataGrid episodes={allEpisodes} />
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('/episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map(episode => ({
    id: episode.id,
    title: episode.title,
    description: episode.description,
    thumbnail: episode.thumbnail,
    members: episode.members,
    publisedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
    duration: Number(episode.file.duration),
    durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
    url: episode.file.url
  }))

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8
  }
}