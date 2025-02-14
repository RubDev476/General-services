import type {Metadata} from "next";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: "G-Services",
    description: "Website to search or offer services",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body>
                <Header />
                
                {children}
            
                <Footer />
            </body>
        </html>
    );
}
