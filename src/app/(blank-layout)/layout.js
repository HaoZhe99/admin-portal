import { SessionProvider } from "next-auth/react";

const Layout = async ({ children }) => {
  return (
    <SessionProvider>
      <div>{children}</div>
    </SessionProvider>
  );
};

export default Layout;
