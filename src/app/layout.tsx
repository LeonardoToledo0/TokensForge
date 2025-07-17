import type { Metadata } from "next";
import "./globals.css";




export const metadata: Metadata = {
  title: "Token Forge",
  description: "Crie seu pŕoprio token em segundos",
  icons: {
    icon: "/assets/oberidium2.png",
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
