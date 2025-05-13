
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  withoutPadding?: boolean;
}

const PageLayout = ({ children, className = "", withoutPadding = false }: PageLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-1 ${!withoutPadding ? 'pt-16 md:pt-20' : ''} ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
