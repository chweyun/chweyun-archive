import {Metadata} from "next";
import Layout from "@/components/layout/Layout";
import { baseDomain, blogDesc, blogName, blogThumbnailURL } from '@/config/const';
import "tailwindcss/tailwind.css";

export const metadata: Metadata = {
    metadataBase: new URL(baseDomain),
    title: blogName,
    description: blogDesc,
    icons: {
      icon: "/favicon.png",
    },
    openGraph: {
        title: blogName,
        description: blogDesc,
        siteName: blogName,
        images: [blogThumbnailURL],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: blogName,
        description: blogDesc,
        images: [blogThumbnailURL],
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-my-20 scroll-smooth">
      <body className="bg-stone-100 flex min-h-screen flex-col">
      <Layout>
          {children}
      </Layout>
      </body>
    </html>
  );
}
