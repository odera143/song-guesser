import React from 'react';
import ReactDOM from 'react-dom/client';
import { redirectToAuthCodeFlow } from './services/SpotifyInit.tsx';
// import App from './App.tsx';
import FindCategory from './routes/FindCategory.tsx';
import ErrorPage from './error-page.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import SongPlayer from './routes/SongPlayer.tsx';

const clientId = '4aeefc6643fd4f508b7081dfdd69b633';
const params = new URLSearchParams(window.location.search);
const code = params.get('code');
let accessToken: string = '';

if (!code) {
  redirectToAuthCodeFlow(clientId);
} else {
  accessToken = await getAccessToken(clientId, code);
}

async function getAccessToken(clientId: string, code: string): Promise<string> {
  const verifier = localStorage.getItem('verifier');

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', 'http://localhost:3000/search');
  params.append('code_verifier', verifier!);

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  const { access_token } = await result.json();
  return access_token;
}

const router = createBrowserRouter([
  {
    path: '/search',
    element: <FindCategory accessToken={accessToken} />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/play/:playlistId',
    element: <SongPlayer accessToken={accessToken} />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
