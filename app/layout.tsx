import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getLoggedUser } from "@/services/auth";
import Navbar from "@/components/Navbar/Navbar";
import Container from "@/components/Container/Container";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Motomano.es",
  description: "Tu portal de compra y venta de motos.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getLoggedUser();

  return (
    <html lang="en" data-theme="motomanotheme">
      <body className={inter.className}>
        <Navbar user={user} />
        <Container>{children}</Container>
      </body>
      <Toaster position="top-center" richColors />
    </html>
  );
}
