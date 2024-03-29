import '../styles/global.scss'

import { Header } from '../components/Header';
import { Player } from '../components/Player';

import style from '../styles/app.module.scss';
import { useState } from 'react';
import { PlayerContext } from '../contexts/PlayerContext';

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function commandPlay(isPlaying: boolean) {
    setIsPlaying(isPlaying)
  }
  
  return (
    <PlayerContext.Provider value={{
      episodeList,
      currentEpisodeIndex,
      isPlaying,
      commandPlay, 
      togglePlay,
      play
    }}>
      
    <div className={style.appContainer}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
    </PlayerContext.Provider>

  )
}

export default MyApp;
