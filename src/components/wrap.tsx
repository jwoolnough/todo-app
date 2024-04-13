type WrapProps = {
  if: boolean;
  wrapper: (children: React.ReactNode) => React.ReactNode;
  children: React.ReactNode;
};

/** Conditionally wrap a component */
const Wrap = ({ if: condition, wrapper, children }: WrapProps) =>
  condition ? wrapper(children) : children;

export { Wrap };
