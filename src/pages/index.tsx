import { GetStaticProps } from 'next'
import { Header } from "../components/Header";
import api from '../services/api';

interface Episode {
  id: string
  title: string
  members: string;
}

interface HomeProps {
  episodes: Episode[]
}

export default function Home(props: HomeProps) {
  console.log(props.episodes)
  return <h1>Index</h1>;
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: episodes } = await api.get('/episodes?_limit=2&_sort=published_at&_order=desc')
  return {
    props: {
      episodes
    },
    revalidate: 60 * 60 * 8
  }
}