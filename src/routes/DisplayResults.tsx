import { Link } from 'react-router-dom';

export default function DisplayResults(props: { searchResults: SearchResult }) {
  return (
    <div className='grid-container'>
      {props.searchResults.playlists.items.map((playlist) => (
        <div className='grid-item' key={playlist.id}>
          <img src={playlist.images[0].url} height='200' width='200' />
          <div>
            <Link to={`http://localhost:3000/play/${playlist.id}`}>
              {playlist.name}
            </Link>
            <p>{playlist.tracks.total} tracks</p>
          </div>
        </div>
      ))}
    </div>
  );
}
