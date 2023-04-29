# Guess The Song

Guess The Song is a song guessing game that leverages the Spotify API. Users can search for a category (such as 90s Rock) and select a playlist from the results. They can then listen to a 10-second snippet from each song from the playlist and have to type in either the artist's name or the song title for points.

Please note that this project is for educational purposes only and I have no intention of hosting it anywhere other than GitHub. Potential users must provide their own client_id upon cloning the application before running it.

## Technologies Used
- React
- TypeScript
- Vite

## Getting Started
To get started with Guess The Song, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies using npm install.
3. Start the development server using `npm run dev`.

Please note that you must have a Spotify Premium account to use this application. You also need to navigate to the Spotify API dashboard, log in, and create an app in the dashboard. In the app settings, you need to set the URL to `localhost:3000` and the redirect URI to `localhost:3000/search`. You then need to copy the client_id for your app and paste it where it's required in the code before you can run the application and successfully sign in.
Please visit https://developer.spotify.com/documentation/web-api/concepts/apps for more details

## Screenshots
![search](https://user-images.githubusercontent.com/29103724/235322747-c5159975-8424-4cf7-b325-c11888dc1c1d.PNG)
![results](https://user-images.githubusercontent.com/29103724/235322764-9864667d-2212-4e93-9c60-dfbe2d1fdcbd.PNG)
![unrevealed-spotify](https://user-images.githubusercontent.com/29103724/235322772-078d65a7-c41f-4621-9081-da12cde9687d.PNG)
![revealed-spotify](https://user-images.githubusercontent.com/29103724/235322781-dcc39728-896d-4d0d-b0cb-638c906cf060.PNG)

## Known Issues
There are currently no known issues or bugs with Guess The Song, but the project is still in progress.
