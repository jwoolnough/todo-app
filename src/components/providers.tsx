"use client";

import type { JSXElementConstructor, ReactNode } from "react";

type InferProps<T> = T extends JSXElementConstructor<infer P> ? P : never;

type ProviderWithProps<T extends JSXElementConstructor<unknown>> = [
  Provider: T,
  props?: Omit<InferProps<T>, "children">,
];

type InferProviderArray<
  T extends ReadonlyArray<JSXElementConstructor<unknown>>,
> = {
  [K in keyof T]: ProviderWithProps<T[K]>;
};

type ProvidersProps<T extends JSXElementConstructor<unknown>[]> = {
  children: ReactNode;
  providers: InferProviderArray<T>;
};

/**
 * Component that recursively composes provider components
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProviderStack = <T extends JSXElementConstructor<any>[]>({
  providers,
  children,
}: ProvidersProps<T>) => {
  return providers.reduceRight(
    (node, [Provider, props = {}]) => <Provider {...props}>{node}</Provider>,
    <>{children}</>,
  );
};

/**
 * Provider wrapper component that composes multiple context providers
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Providers = <T extends JSXElementConstructor<any>[]>({
  children,
  providers,
}: ProvidersProps<T>) => {
  return <ProviderStack providers={providers}>{children}</ProviderStack>;
};

export { Providers };
