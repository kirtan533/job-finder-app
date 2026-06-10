import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import { DM_Sans } from "next/font/google";
import SideBarWrapper from "@/components/SideBarWrapper";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";

const dm_sans = DM_Sans({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dm_sans.className} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <QueryProvider>
              <SideBarWrapper>{children}</SideBarWrapper>
            </QueryProvider>
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  background: "#333",
                  color: "#fff",
                },
              }}
            />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
