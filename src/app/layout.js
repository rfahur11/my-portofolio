import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Fahrur Rozi — Software Engineer",
  description:
    "Fullstack Developer & ML Enthusiast. Building meaningful digital products that balance user needs and business goals.",
  keywords: [
    "software engineer",
    "fullstack developer",
    "machine learning",
    "web developer",
    "portfolio",
    "fahrur rozi",
  ],
  authors: [{ name: "Fahrur Rozi" }],
  openGraph: {
    title: "Fahrur Rozi — Software Engineer",
    description:
      "Fullstack Developer & ML Enthusiast. Building meaningful digital products.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{<Providers>{children}</Providers>}</body>
    </html>
  );
}
