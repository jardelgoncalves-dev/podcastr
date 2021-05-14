import { GetStaticProps } from 'next'
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import api from '../services/api';

interface Episode {
  id: string
  title: string
  description: string;
  members: string;
  thumbnail: string;
  publisedAt: string;
  duration: number;
  url: string;
}

interface HomeProps {
  episodes: Episode[]
}

export default function Home(props: HomeProps) {
  console.log(props.episodes)
  return <h1>Index</h1>;
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
    url: episode.file.url
  }))

  return {
    props: {
      episodes
    },
    revalidate: 60 * 60 * 8
  }
}