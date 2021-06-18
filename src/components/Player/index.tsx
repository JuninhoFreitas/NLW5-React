import Image from 'next/image';
import { useContext } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';
import styles from './styles.module.scss';
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

export default function Player() {
  const { episodeList, currentEpisodeIndex } = useContext(PlayerContext)
  const episode = episodeList[currentEpisodeIndex];
  return (
    <>
      <div className={styles.playerContainer}>
        <header>
          <img src="/playing.svg" alt="Tocando agora" />
          <strong>Tocando agora {episode?.title}</strong>
        </header>

        {episode ?

          //true
          (
            <div className={styles.currentEpisode}>
              <Image width={592} height={592} src={episode.thumbnail} objectFit={'cover'} />
              <strong>{episode.title}</strong>
              <span>{episode.members}</span>
            </div>
          )
          :
          //false
          (
            <div className={styles.emptyPlayer}>
              <strong>Selecione um podcast para ouvir</strong>
            </div>)

        }

        <footer className={!episode ? styles.empty : ''}>
          <div className={styles.progress}>
            <span>00:00</span>
            <div className={styles.slider}>
              {episode ?
                (
                  <Slider
                    trackStyle={{ backgroundColor: '#84d361' }}
                    railStyle={{ backgroundColor: '#97f5ff' }}
                    handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                  />
                )
                :
                (
                  <div className={styles.emptySlider} />
                )}

            </div>
            <span>00:00</span>
          </div>
          <div className={styles.buttons}>
            <button type='button' disabled={!episode}>
              <img src='/shuffle.svg' alt='Embaralhar' />
            </button>
            <button type='button' disabled={!episode}>
              <img src='/play-previous.svg' alt='Tocar anterior' />
            </button>
            <button type='button' className={styles.playButton} disabled={!episode}>
              <img src='/play.svg' alt='Tocar' />
            </button>
            <button type='button' disabled={!episode}>
              <img src='/play-next.svg' alt='Tocar Próxima' />
            </button>
            <button type='button' disabled={!episode}>
              <img src='/repeat.svg' alt='Repetir' />
            </button>
          </div>
        </footer>


      </div>
    </>
  )
}