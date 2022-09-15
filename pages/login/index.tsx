import { GetServerSideProps, NextPage } from "next";
import React, { useEffect } from "react";
import { ClientSafeProvider, getProviders } from "next-auth/react";
import Image from "next/image";
import SpotifyLogo from "../../assets/images/spotify-logo.png";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface LoginProps {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

const Login: NextPage<LoginProps> = ({ providers }: LoginProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { name: provivedName, id: providerId } =
    providers?.spotify as ClientSafeProvider;

  const handleLoginWithSpotify = () => signIn(providerId, { callbackUrl: "/" });

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center bg-black h-screen">
      <div className="mb-6">
        <Image
          src={SpotifyLogo}
          alt="Spotify Logo"
          height={200}
          width={200}
          objectFit="contain"
        />
      </div>
      <button
        onClick={handleLoginWithSpotify}
        className="bg-[#18D860] text-white p-5 rounded-full"
      >
        Login with {provivedName}
      </button>
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
