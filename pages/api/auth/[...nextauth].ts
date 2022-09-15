import { scopes, spotifyApi } from "./../../../config/spotifyAuth";
import nextAuth, { CallbacksOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { ExtendedToken, TokenError } from "../../../types";

const refeshAccessToken = async (
  token: ExtendedToken
): Promise<ExtendedToken> => {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refeshToken);

    const { body: refreshedTokens } = await spotifyApi.refreshAccessToken();

    console.log("BODY : refreshedTokens", refreshedTokens);
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      refeshToken: refreshedTokens.refresh_token || token.refeshToken,
      accessTokenExpiresAt: refreshedTokens.expires_in * 1000 + Date.now(),
    };
  } catch (error) {
    console.error("Error to refesh token" + error);
    return {
      ...token,
      error: TokenError.RefreshAccessTokenError,
    };
  }
};

const jwtCallback: CallbacksOptions["jwt"] = async ({
  token,
  account,
  user,
}) => {
  let extendedToken: ExtendedToken;

  if (account && user) {
    extendedToken = {
      ...token,
      user,
      accessToken: account.access_token as string,
      refeshToken: account.refresh_token as string,
      accessTokenExpiresAt: (account.expires_at as number) * 1000,
    };

    console.log("FIRST TIME LOGIN", token);
    return extendedToken;
  }

  if (Date.now() + 5000 < (token as ExtendedToken).accessTokenExpiresAt) {
    console.log("Token access not date", token);
    return token;
  }

  /// handle refesh token
  console.log("ACCESS TOKEN EXPIRED, REFRESHING...");
  return await refeshAccessToken(token as ExtendedToken);
};

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
  callbacks: {
    jwt: jwtCallback,
  },
});
