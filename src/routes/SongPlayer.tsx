import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function SongPlayer(props: { accessToken: string }) {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState<DetailedPlaylist>({
    tracks: { limit: 0, total: 0, items: [] },
  });
  const [position, setPosition] = useState(0);
  useEffect(() => {
    fetchPlaylist(props.accessToken);
  }, []);

  async function fetchPlaylist(token: string) {
    const result = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setPlaylist(await result.json());
  }
  return (
    <div>
      {/* {playlist.tracks.items.map((item) => (
        <div key={item.track.id}>
          <span>{item.track.name} - </span>
          {item.track.artists.map((artist) => (
            <span key={artist.name}>{artist.name} </span>
          ))}
        </div>
      ))} */}
      <div className='generic-column-container'>
        <img
          src={playlist.tracks.items[position]?.track.album.images[0].url}
          height={400}
        />
        <audio
          src={playlist.tracks.items[position]?.track.preview_url}
          controls
          controlsList='nodownload'
        ></audio>
        <div>
          <span>{playlist.tracks.items[position]?.track.name} - </span>
          {playlist.tracks.items[position]?.track.artists.map((artist) => (
            <span key={artist.name}>{artist.name} </span>
          ))}
        </div>
        <button onClick={() => setPosition(position + 1)}>next</button>
      </div>
    </div>
  );
}
