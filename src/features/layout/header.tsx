import Image from "next/image";
import Link from "next/link";

import { APP_NAME } from "~/constants";

const Header = ({ children }: React.PropsWithChildren) => {
  return (
    <header className="flex items-center gap-4 px-6 py-4 [container-type:inline-size] [container-name:header]">
      <Link href="/" className="mr-2 block md:hidden">
        <Image
          src="/logo.svg"
          alt={APP_NAME}
          width={14}
          height={18}
          className="drop-shadow-neon"
          priority
        />
      </Link>
      {children}
    </header>
  );
};

export { Header };
