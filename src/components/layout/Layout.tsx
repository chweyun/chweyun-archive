import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header/>
            <main className="flex flex-1 flex-col min-h-[90vh]">{children}</main>
            <Footer/>
        </div>
    );
}