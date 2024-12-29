"use client";

import "./globals.css";
import SideNavigation from "@/components/SideNavigation";
import { usePathname, useRouter } from "next/navigation";
import { includes } from "lodash";

export default function RootLayout({ children }) {
  const routerName = usePathname();
  const routeLists = ["/login", "/register"];
  const isShowNav = includes(routeLists, routerName) ? false : true;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="./globals.css" rel="stylesheet" />
      </head>
      <body className={`min-h-screen w-screen bg-white`}>
        <div
          className={`grid ${isShowNav ? "grid-cols-12" : "grid-cols-10"} min-h-screen`}
        >
          {isShowNav ? (
            <div className="col-span-2">
              <SideNavigation />
            </div>
          ) : (
            false
          )}

          <div className="col-span-10 min-h-screen p-4">{children}</div>
        </div>
      </body>
    </html>
  );
}
