import { SessionProvider } from "next-auth/react";
import SideNavigation from "@/components/SideNavigation";
import AuthWrapper from "@/components/AuthWrapper";

const Layout = async ({ children }) => {
  return (
    <SessionProvider>
      <AuthWrapper>
        <div className={`grid grid-cols-12 min-h-screen`}>
          <div className="col-span-2">
            <SideNavigation />
          </div>

          <div className="col-span-10 min-h-screen p-4">{children}</div>
        </div>
      </AuthWrapper>
    </SessionProvider>
  );
};

export default Layout;
