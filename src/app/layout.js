import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import { DM_Sans } from "next/font/google";
import SideBarWrapper from "@/components/SideBarWrapper";

const dm_sans = DM_Sans({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dm_sans.className}>
      <body>
        <QueryProvider>
          <SideBarWrapper>{children}</SideBarWrapper>
        </QueryProvider>
      </body>
    </html>
  );
}
