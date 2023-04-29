import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import hiddenAlbum from '../assets/questionMark.png';
import spotifyLogo from '../assets/Spotify_Logo_RGB_Green.png';

const market = 'US';

export default function SongPlayer(props: { accessToken: string }) {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState<DetailedPlaylist>({
    tracks: { limit: 0, total: 0, items: [] },
  });
  const [position, setPosition] = useState(0);
  const [playTime, setPlayTime] = useState(10);
  const [revealTime, setRevealTime] = useState(5);
  const [countdown, setCountdown] = useState(revealTime);
  const [hideArt, setHideArt] = useState(true);
  const [hideTrack, setHideTrack] = useState(true);
  const [hideArtist, setHideArtist] = useState(true);
  const audioPlayer = useRef<HTMLAudioElement>(null);
  const playButton = useRef<HTMLButtonElement>(null);
  const nextButton = useRef<HTMLButtonElement>(null);
  const timeInput = useRef<HTMLInputElement>(null);
  const revealTimeInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchPlaylist(props.accessToken);
  }, []);

  async function fetchPlaylist(token: string) {
    const result = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}?market=${market}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setPlaylist(await result.json());
  }

  function startSong() {
    audioPlayer.current!.play();
    disableInputs(true);
    setTimeout(() => {
      audioPlayer.current!.pause();
    }, playTime * 1000);
  }

  function nextTrack() {
    setPosition(position + 1);
    disableInputs(false);
    hideTrackInfo(true);
    nextButton.current!.disabled = true;
  }

  function countdownToReveal() {
    let x = revealTime;
    const timer = setInterval(() => {
      x--;
      if (x < 0) {
        clearInterval(timer);
        hideTrackInfo(false);
        nextButton.current!.disabled = false;
      } else {
        setCountdown(x);
      }
    }, 1000);
  }

  function disableInputs(value: boolean) {
    playButton.current!.disabled = value;
    timeInput.current!.disabled = value;
    revealTimeInput.current!.disabled = value;
  }

  function hideTrackInfo(value: boolean) {
    setHideArt(value);
    setHideTrack(value);
    setHideArtist(value);
  }

  return (
    <div className='generic-column-container'>
      <h2>{countdown > 0 ? countdown : '-'} seconds until reveal</h2>
      <div className='song-player'>
        <div className='options-hints-card'>
          <h2>Options</h2>
          <label>
            Play tracks for{' '}
            <input
              type='number'
              value={playTime}
              max={30}
              onChange={(event) =>
                Number(event.target.value) <= 30
                  ? setPlayTime(Number(event.target.value))
                  : setPlayTime(30)
              }
              ref={timeInput}
            />{' '}
            seconds
          </label>
          <label>
            Reveal after{' '}
            <input
              type='number'
              value={revealTime}
              max={30}
              onChange={(event) =>
                Number(event.target.value) <= 30
                  ? setRevealTime(Number(event.target.value))
                  : setRevealTime(30)
              }
              ref={revealTimeInput}
            />{' '}
            seconds
          </label>
        </div>
        <div className='song-card'>
          <img
            src={
              hideArt
                ? hiddenAlbum
                : playlist.tracks.items[position]?.track.album.images[0].url
            }
            height={350}
          />
        </div>
        <div className='options-hints-card'>
          <h2>Hints</h2>
          <button onClick={() => setHideArt(false)}>Reveal Cover Art</button>
          <button onClick={() => setHideTrack(false)}>Reveal Track Name</button>
          <button onClick={() => setHideArtist(false)}>Reveal Artist(s)</button>
        </div>
      </div>
      <audio
        src={playlist.tracks.items[position]?.track.preview_url}
        controls={false}
        controlsList='nodownload'
        onPause={countdownToReveal}
        ref={audioPlayer}
      ></audio>
      <div style={{ display: 'flex' }}>
        <h3>
          {hideTrack
            ? '? ? ? ? ? ? ? ? ?'
            : playlist.tracks.items[position]?.track.name}
          {' - '}
          {hideArtist
            ? '? ? ? ? ? ? ? ? ?'
            : playlist.tracks.items[position]?.track.artists.map((artist) =>
                artist.name.concat(' ')
              )}
        </h3>
      </div>
      <div className='button-separator-gap'>
        <button ref={playButton} onClick={startSong}>
          Play
        </button>
        <button ref={nextButton} onClick={nextTrack}>
          Next
        </button>
      </div>
      <div>
        <a
          href={playlist.tracks.items[position]?.track.external_urls.spotify}
          target='_blank'
        >
          <div className='spotify-card'>
            <img src={spotifyLogo} height={50}></img>
          </div>
        </a>
        LISTEN ON SPOTIFY
      </div>
    </div>
  );
}
