import create from "@kodingdotninja/use-tailwind-breakpoint";
import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "../../tailwind.config";

const config = resolveConfig(tailwindConfig);

// eslint-disable-next-line @typescript-eslint/unbound-method
const { useBreakpoint } = create(config.theme.screens);

export { useBreakpoint };
