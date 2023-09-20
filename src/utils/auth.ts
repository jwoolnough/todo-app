import { type GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

const getServerSidePropsWithAuth = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: `/login?redirect=${encodeURIComponent(
          context.resolvedUrl,
        )}`,
      },
    };
  }

  return {
    props: {},
  };
};

export { getServerSidePropsWithAuth };
