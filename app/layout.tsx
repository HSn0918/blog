import type {Metadata} from "next";
import {Suspense} from "react";
import "./globals.css";
import Header from "@/components/header";
import {blogConfig} from "@/blog.config";
import ProviderTheme from "@/provider/provider-theme";
import Title from "@/components/title";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import Analytics from "@/plugins/analytics";

export const metadata: Metadata = {
    title: blogConfig.title,
    description: blogConfig.description,
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN">
            <body className={'relative min-h-screen flex flex-col justify-between'}>
            <ProviderTheme>
            <div className={'flex-1'}>
                <Header/>
                <main className={'md:mb-12 mb-8 min-w-full prose md:prose-lg dark:prose-invert'}>
                    <Suspense fallback={null}>
                        <Title/>
                    </Suspense>
                    {children}
                </main>
            </div>
            <Footer/>
            <BackToTop/>
            <Analytics/>
            </ProviderTheme>
            </body>
        </html>
    );
}
