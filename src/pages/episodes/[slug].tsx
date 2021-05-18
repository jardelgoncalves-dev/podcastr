import Image from "next/image"
import Link from "next/link"
import { GetStaticPaths, GetStaticProps } from "next"

import api from "../../services/api"
import { Episode } from "../../models/Episode"
import { DataTransformation } from "../../utils/data-transformation"

import styles from './styles.module.scss';

interface EpisodesProps {
  episode: Episode
}

export default function Episodes({ episode }: EpisodesProps) {
  return (
    <div className={styles.episodePage}>
      <section className={styles.episode}>
        <div className={styles.thumbContainer}>
          <Link href="/">
            <button type="button">
              <img src="/arrow-left.svg" alt="Voltar" />
            </button>
          </Link>
          <Image
            width={700}
            height={160}
            src={episode.thumbnail}
            alt={episode.title}
            objectFit="cover"
          />
          <button type="button">
            <img src="/play.svg" alt="Tocar episódio" />
          </button>
        </div>

        <header>
          <h1>{episode.title}</h1>
          <span>{episode.members}</span>
          <span>{episode.publisedAt}</span>
          <span>{episode.durationAsString}</span>
        </header>

        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: episode.description }}
        />
      </section>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await api.get(`/episodes/${ctx.params.slug}`)
  const episode = DataTransformation.transform<Episode>({
    data: data,
    fnName: 'episodes'
  })

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24 // hours
  }
}