import { scopes } from "./../../../config/spotifyAuth";
import nextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export default nextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID || "",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope: scopes,
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
