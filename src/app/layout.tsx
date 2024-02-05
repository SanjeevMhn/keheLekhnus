import type { Metadata } from "next";
import { Inter, Lobster } from "next/font/google";
import "./globals.css";
import Header from "./(components)/Header";
import ReduxProvider from "./(components)/redux-provider";

const inter = Inter({ subsets: ["latin"] });
export const lobster = Lobster({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lobster",
});

export const metadata: Metadata = {
  title: "Sanu's Nursery",
  description: "Buy vegetable sapling along with your every gardening need.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Saira:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <body>
        <main>
          <ReduxProvider>
            <div className="root-wrapper">{children}</div>
          </ReduxProvider>
        </main>
      </body>
    </html>
  );
}
