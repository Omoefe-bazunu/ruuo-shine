import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { Poppins, Bricolage_Grotesque } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const bricolage = Bricolage_Grotesque({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-bricolage",
});

export const metadata = {
  title: "RUUO Shine Cleaning Experts Ltd",
  description:
    "Professional cleaning services in the UK. Book expert residential and commercial cleaning with RUUO Shine for a spotless finish.",
  openGraph: {
    title: "RUUO Shine Cleaning Experts Ltd",
    description: "Expert cleaning services for homes and businesses in the UK.",
    url: "https://ruuoshine.co.uk",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${bricolage.variable}`}>
      <body className="antialiased font-sans min-h-screen flex flex-col">
        <AuthProvider>
          <Header />
          <main className="grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
