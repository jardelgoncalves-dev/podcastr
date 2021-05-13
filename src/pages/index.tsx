import { GetStaticProps } from 'next'
import { Header } from "../components/Header";

export default function Home(props) {
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