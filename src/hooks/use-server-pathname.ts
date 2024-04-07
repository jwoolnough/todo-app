import { headers } from "next/headers";

const useServerPathname = () => {
  const url = headers().get("x-url") ?? "";
  const hostname = headers().get("host") ?? "";

  return url.substring(url.indexOf(hostname) + hostname.length);
};

export { useServerPathname };
