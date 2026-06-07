import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/hooks/useTheme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rudra Solanki | Software Engineer",
  description:
    "Professional software engineer developer portfolio of Rudra Solanki, specializing in TypeScript, React, Next.js, and Node.js.",
  metadataBase: new URL("https://rudrasolanki.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rudra Solanki | Software Engineer Portfolio",
    description:
      "Professional software engineer developer portfolio of Rudra Solanki, specializing in TypeScript, React, Next.js, and Node.js.",
    url: "https://rudrasolanki.com",
    siteName: "Rudra Solanki Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rudra Solanki | Full Stack Developer Portfolio",
    description:
      "Professional software engineer developer portfolio of Rudra Solanki, specializing in TypeScript, React, Next.js, and Node.js.",
    creator: "@rudra_solanki",
  },
};

// Inline script to set the theme before rendering to avoid FOUC
const themeInitializerScript = `
  (function() {
    try {
      var savedTheme = localStorage.getItem('theme');
      var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.error('Theme detection error:', e);
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializerScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
