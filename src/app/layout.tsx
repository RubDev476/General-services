import type {Metadata} from "next";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Warning from "@/components/layout/Warning";

import { Providers } from "@/store/Provider";

export const metadata: Metadata = {
    title: "G-Services",
    description: "Website to search or offer services",
    icons: [
        {rel: 'icon', url: '/icons/favicon-16x16.png', type: 'image/svg+xml'},
        {rel: 'icon', url: '/icons/favicon-32x32.png', type: 'image/svg+xml'},
        {rel: 'icon', url: '/icons/apple-touch-icon.png', type: 'image/svg+xml'},
    ]
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body>
                <Providers>
                   <Header />
                
                    {children}

                    <Warning />
            
                    <Footer /> 
                </Providers>
            </body>
        </html>
    );
}
