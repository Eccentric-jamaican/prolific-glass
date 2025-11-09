import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prolific Glass Limited",
  description: "Mobile-first experience for Prolific Glass windshield services.",
  metadataBase: new URL("https://prolific-glass.com"),
  openGraph: {
    title: "Prolific Glass Limited",
    description: "Mobile-first experience for Prolific Glass windshield services.",
    url: "https://prolific-glass.com",
    siteName: "Prolific Glass Limited",
    locale: "en_JM",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prolific Glass Limited",
    description: "Mobile-first experience for Prolific Glass windshield services.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SmoothScrollProvider>
          <div id="smooth-scroll-root" className="relative flex min-h-screen flex-col bg-background text-foreground">
            {children}
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
