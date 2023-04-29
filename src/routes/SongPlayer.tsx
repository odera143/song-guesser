import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import hiddenAlbum from '../assets/questionMark.png';

const market = 'US';

export default function SongPlayer(props: { accessToken: string }) {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState<DetailedPlaylist>({
    tracks: { limit: 0, total: 0, items: [] },
  });
  const [position, setPosition] = useState(0);
  const [timer, setTimer] = useState(10);
  const [revealTimer, setRevealTimer] = useState(5);
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
    }, timer * 1000);
  }

  function nextTrack() {
    setPosition(position + 1);
    disableInputs(false);
    hideTrackInfo(true);
    nextButton.current!.disabled = true;
  }

  function countdownToReveal() {
    setTimeout(() => {
      hideTrackInfo(false);
      nextButton.current!.disabled = false;
    }, revealTimer * 1000);
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
    <div className='song-player'>
      {/* {playlist.tracks.items.map((item) => (
        <div key={item.track.id}>
          <span>{item.track.name} - </span>
          {item.track.artists.map((artist) => (
            <span key={artist.name}>{artist.name} </span>
          ))}
        </div>
      ))} */}
      <div className='generic-column-container'>
        <label>
          Play tracks for{' '}
          <input
            type='number'
            value={timer}
            max={30}
            onChange={(event) =>
              Number(event.target.value) <= 30
                ? setTimer(Number(event.target.value))
                : setTimer(30)
            }
            ref={timeInput}
          />{' '}
          seconds
        </label>
        <label>
          Reveal after{' '}
          <input
            type='number'
            value={revealTimer}
            max={30}
            onChange={(event) =>
              Number(event.target.value) <= 30
                ? setRevealTimer(Number(event.target.value))
                : setRevealTimer(30)
            }
            ref={revealTimeInput}
          />{' '}
          seconds
        </label>
      </div>
      <div className='generic-column-container'>
        <img
          src={
            hideArt
              ? hiddenAlbum
              : playlist.tracks.items[position]?.track.album.images[0].url
          }
          height={400}
        />
        <audio
          src={playlist.tracks.items[position]?.track.preview_url}
          controls={false}
          controlsList='nodownload'
          onPause={countdownToReveal}
          ref={audioPlayer}
        ></audio>
        <div>
          <span>
            {hideTrack
              ? '? ? ? ? ? ? ? ? ?'
              : playlist.tracks.items[position]?.track.name}
            {' - '}
          </span>
          {hideArtist
            ? '? ? ? ? ? ? ? ? ?'
            : playlist.tracks.items[position]?.track.artists.map((artist) => (
                <span key={artist.name}>{artist.name} </span>
              ))}
        </div>

        <button ref={playButton} onClick={startSong}>
          Play
        </button>
        <button ref={nextButton} onClick={nextTrack}>
          Next
        </button>
      </div>
      <div className='button-separator-gap'>
        <button onClick={() => setHideArt(false)}>Reveal Cover Art</button>
        <button onClick={() => setHideTrack(false)}>Reveal Track Name</button>
        <button onClick={() => setHideArtist(false)}>Reveal Artist(s)</button>
      </div>
    </div>
  );
}
