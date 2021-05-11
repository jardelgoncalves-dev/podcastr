import '../styles/global.scss'

import { Header } from '../components/Header';

import style from '../styles/app.module.scss';

function MyApp({ Component, pageProps }) {
  return (
    <div className={style.appContainer}>
      <main>
        <Header />
        <Component {...pageProps} />;
      </main>

    </div>
  )
}

export default MyApp;
