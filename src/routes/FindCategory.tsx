import { Form } from 'react-router-dom';
import { useState } from 'react';
import DisplayResults from './DisplayResults';

export default function FindCategory(props: { accessToken: string }) {
  const [category, setCategory] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult>({
    playlists: {
      href: '',
      limit: 0,
      next: '',
      offset: 0,
      previous: '',
      total: 0,
      items: [],
    },
  });

  async function search(token: string) {
    const params = new URLSearchParams();
    params.append('q', category);
    params.append('type', 'playlist');

    const result = await fetch(
      `https://api.spotify.com/v1/search?${params.toString()}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setSearchResults(await result.json());
  }

  async function fetchNextOrPreviousPage(url: string) {
    const result = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${props.accessToken}` },
    });
    setSearchResults(await result.json());
  }

  return (
    <div className='generic-column-container'>
      <Form onSubmit={() => search(props.accessToken)}>
        <label>
          Search for a category or genre:{' '}
          <input
            name='category'
            type='text'
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </label>
      </Form>
      <DisplayResults searchResults={searchResults} />
      <div className='button-separator'>
        {searchResults.playlists.previous && (
          <button
            onClick={() =>
              fetchNextOrPreviousPage(searchResults.playlists.previous)
            }
          >
            back
          </button>
        )}
        {searchResults.playlists.next && (
          <button
            onClick={() =>
              fetchNextOrPreviousPage(searchResults.playlists.next)
            }
          >
            next
          </button>
        )}
      </div>
    </div>
  );
}
