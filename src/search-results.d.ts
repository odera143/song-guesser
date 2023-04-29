interface SearchResult {
  playlists: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: Playlist[];
  };
}
interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: { url: string; height: number; width: number }[] | [];
  name: string;
  tracks: { href: string; total: number };
  uri: string;
}

interface DetailedPlaylist {
  tracks: { limit: number; total: number; items: PlayListTrack[] };
}

interface PlayListTrack {
  track: {
    id: string;
    name: string;
    artists: { name: string }[];
    album: {
      images: { url: string; height: number; width: number }[] | [];
    };
    preview_url: string;
    external_urls: { spotify: string };
  };
}
