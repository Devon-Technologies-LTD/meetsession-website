import { Footer } from "@/features/base/components/footer";
import { Navbar } from "@/features/base/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-fit h-dvh w-full relative">
      <Navbar />

      {children}

      <Footer />
    </main>
  );
}
