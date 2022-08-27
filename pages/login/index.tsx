import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { getProviders } from "next-auth/react";

interface LoginProps {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

const Login: NextPage<LoginProps> = ({ providers }: LoginProps) => {
  const { name } = providers?.spotify;

  return <div>Login</div>;
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
