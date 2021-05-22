import Image from 'next/image';
import { useContext } from 'react';
import Slider from 'rc-slider';

import { PlayerContext } from '../../contexts/PlayerContext';

import 'rc-slider/assets/index.css';
import styles from './styles.module.scss';

export function Player() {
  const { episodeList, currentEpisodeIndex } = useContext(PlayerContext)
  const episode = episodeList[currentEpisodeIndex]
  return (
    <section className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando agora"/>
        <strong>Tocando agora</strong>
      </header>

      {
        episode
          ? (
            <div className={styles.playing}>
              <Image
                width={592}
                height={592}
                src={episode.thumbnail}
                alt={episode.title}
                objectFit="cover"
              />
              <strong>{episode.title}</strong>
              <p>{episode.members}</p>
            </div>
          ): (
            <div className={styles.emptyPlayer}>
              <strong>Selecione um podcast para ouvir</strong>
            </div>
          )
      }

      <footer className={!episode ? styles.empty: ''}>
        <div className={styles.progress}>
          <span>00:00</span>
          {
            episode
              ? (
                <Slider
                  trackStyle={{ backgroundColor: '#04D361' }}
                  railStyle={{ backgroundColor: '#9f65ff' }}
                  handleStyle={{ borderColor: '#04D361', borderWidth: 4 }}
                />
              ): (
                <div className={styles.slider}>
                  <div className={styles.emptySlider}></div>
                </div>
              )
          }
          <span>00:00</span>
        </div>
        <div className={styles.controls}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button type="button" className={styles.playButton} disabled={!episode}>
            <img src="/play.svg" alt="Tocar" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-next.svg" alt="Tocar proxima" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </section>
  )
}