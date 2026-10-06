import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
export const metadata: Metadata = {
  title: "Pi Market-NS",
  description: "Pi Ecosystem Marketplace",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>
        {children}
        <Script
          src="https://sdk.minepi.com/pi-sdk.js"
          strategy="beforeInteractive"
        />
        <Script id="pi-sdk-init" strategy="afterInteractive">
          {`
            if (window.Pi) {
              window.Pi.init({
                version: "2.0",
                sandbox: false
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
