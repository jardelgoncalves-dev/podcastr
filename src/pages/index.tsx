import { GetStaticProps } from 'next'
import { Header } from "../components/Header";

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
  const response = await fetch('http://localhost:3333/episodes');
  const episodes = await response.json()
  return {
    props: {
      episodes
    },
    revalidate: 60 * 60 * 8
  }
}