const Header = ({ children }: React.PropsWithChildren) => {
  return (
    <header className="flex items-center gap-4 px-6 py-4">{children}</header>
  );
};

export { Header };
